"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MarkdownRenderer = dynamic(() => import("./markdown"), { ssr: false });

// Renders one exported opencode session (the JSON produced by
// `opencode export <sessionID>`): the prompt cards, assistant prose,
// collapsible thinking blocks and tool calls that make up a research run.

interface TextPart {
  type: "text";
  text?: string;
}

interface ReasoningPart {
  type: "reasoning";
  text?: string;
  time?: { start?: number; end?: number };
}

interface ToolPart {
  type: "tool";
  tool?: string;
  callID?: string;
  state?: {
    status?: string;
    title?: string;
    input?: unknown;
    output?: string;
  };
}

interface PatchPart {
  type: "patch";
  hash?: string;
  files?: unknown[];
}

// Anything else opencode may emit (step markers etc.) — rendered as nothing.
interface OtherPart {
  type: string;
}

type SessionPart = TextPart | ReasoningPart | ToolPart | PatchPart | OtherPart;

interface SessionMessage {
  info?: { role?: string };
  parts?: SessionPart[];
}

interface ExportedSession {
  info?: { id?: string; title?: string };
  messages?: SessionMessage[];
}

const OUTPUT_LIMIT = 6000;

function truncate(text: string): string {
  if (text.length <= OUTPUT_LIMIT) return text;
  const omitted = text.length - OUTPUT_LIMIT;
  return `${text.slice(0, OUTPUT_LIMIT)}\n\n… ${omitted.toLocaleString()} more characters (full output in the transcript JSON)`;
}

function durationLabel(part: ReasoningPart): string {
  const { start, end } = part.time ?? {};
  if (typeof start === "number" && typeof end === "number") {
    return `${Math.max(1, Math.round((end - start) / 1000))}s`;
  }
  return "";
}

function toolTitle(part: ToolPart): string {
  const state = part.state ?? {};
  if (state.title) return state.title;
  const input = state.input as Record<string, unknown> | undefined;
  const candidate =
    input?.command ?? input?.filePath ?? input?.url ?? input?.pattern ?? input?.query;
  return typeof candidate === "string" ? candidate : "";
}

function ToolBlock({ part }: { part: ToolPart }) {
  const name = (part.tool ?? "tool").toUpperCase();
  const status = part.state?.status ?? "unknown";
  const failed = status !== "completed";
  const preview = toolTitle(part);
  const input = part.state?.input ? truncate(JSON.stringify(part.state.input, null, 2)) : null;
  const output = part.state?.output ? truncate(part.state.output) : null;

  return (
    <details className="pow-tool">
      <summary>
        <span className={`pow-tool-dot ${failed ? "failed" : ""}`} aria-hidden="true" />
        <span className="pow-tool-name">{name}</span>
        {preview ? <span className="pow-tool-preview">{preview}</span> : null}
        {!output && !input ? <span className="pow-tool-empty">no payload</span> : null}
      </summary>
      {input ? (
        <div className="pow-io">
          <span className="pow-io-label">INPUT</span>
          <pre>{input}</pre>
        </div>
      ) : null}
      {output ? (
        <div className="pow-io">
          <span className="pow-io-label">OUTPUT</span>
          <pre>{output}</pre>
        </div>
      ) : null}
    </details>
  );
}

function AssistantParts({ parts }: { parts: SessionPart[] }) {
  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "text") {
          const { text } = part as TextPart;
          const trimmed = text?.trim();
          if (!trimmed) return null;
          return (
            <div className="pow-md pow-text" key={i}>
              <MarkdownRenderer text={trimmed} />
            </div>
          );
        }
        if (part.type === "reasoning") {
          const reasoning = part as ReasoningPart;
          const trimmed = reasoning.text?.trim();
          if (!trimmed) return null;
          const dur = durationLabel(reasoning);
          return (
            <details className="pow-thinking" key={i}>
              <summary>
                <span className="pow-thinking-label">THINKING</span>
                {dur ? <span className="pow-thinking-time">{dur}</span> : null}
              </summary>
              <pre className="pow-thinking-body">{trimmed}</pre>
            </details>
          );
        }
        if (part.type === "tool") {
          return <ToolBlock part={part as ToolPart} key={i} />;
        }
        if (part.type === "patch") {
          const patch = part as PatchPart;
          return (
            <div className="pow-patch" key={i}>
              PATCH · {Array.isArray(patch.files) ? `${patch.files.length} file(s)` : "applied"}
            </div>
          );
        }
        return null;
      })}
    </>
  );
}

function StatsBar({ session }: { session: ExportedSession }) {
  let tools = 0;
  let thinking = 0;
  for (const m of session.messages ?? []) {
    for (const p of m.parts ?? []) {
      if (p.type === "tool") tools += 1;
      if (p.type === "reasoning") thinking += 1;
    }
  }
  const messages = (session.messages ?? []).filter((m) => m.info?.role).length;
  return (
    <div className="pow-stats">
      <span>{messages} MESSAGES</span>
      <span>{tools} TOOL CALLS</span>
      <span>{thinking} THINKING BLOCKS</span>
    </div>
  );
}

type ViewerState =
  | { status: "loading" }
  | { status: "ready"; session: ExportedSession }
  | { status: "missing" }
  | { status: "error" };

export function SessionViewer({ date, stage }: { date: string; stage: string }) {
  // Keyed by date+stage so switching stages renders "loading" immediately
  // (derived) without a synchronous setState inside the effect.
  const [state, setState] = useState<ViewerState & { key: string }>({
    key: "",
    status: "loading",
  });
  const viewKey = `${date}/${stage}`;

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/research/${date}/${stage}`)
      .then(async (res) => {
        if (res.status === 404) return { status: "missing" } as ViewerState;
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return { status: "ready", session: await res.json() } as ViewerState;
      })
      .then((next) => {
        if (!cancelled) setState({ key: viewKey, ...next });
      })
      .catch(() => {
        if (!cancelled) setState({ key: viewKey, status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [date, stage, viewKey]);

  const view: ViewerState = state.key === viewKey ? state : { status: "loading" };

  if (view.status === "loading") {
    return (
      <div className="pow-viewer">
        <p className="pow-status">LOADING TRANSCRIPT…</p>
      </div>
    );
  }
  if (view.status === "missing") {
    return (
      <div className="pow-viewer">
        <p className="pow-status">No transcript recorded for stage {stage}.</p>
      </div>
    );
  }
  if (view.status === "error") {
    return (
      <div className="pow-viewer">
        <p className="pow-status">Transcript failed to load. Try again later.</p>
      </div>
    );
  }

  const { session } = view;
  return (
    <div className="pow-viewer">
      <StatsBar session={session} />
      {(session.messages ?? []).map((message, i) =>
        message.info?.role === "user" ? (
          <div className="pow-prompt" key={i}>
            <span className="eyebrow">PROMPT</span>
            <pre>
              {(message.parts ?? [])
                .map((p) => (p.type === "text" ? (p as TextPart).text : ""))
                .join("")
                .trim()}
            </pre>
          </div>
        ) : (
          <div className="pow-turn" key={i}>
            <AssistantParts parts={message.parts ?? []} />
          </div>
        ),
      )}
      <p className="pow-end">· END OF TRANSCRIPT ·</p>
    </div>
  );
}
