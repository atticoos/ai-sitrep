"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Loaded browser-only via next/dynamic({ ssr: false }): transcripts render
// exclusively after the client-side fetch, and keeping react-markdown out of
// the server bundle keeps the Worker under Cloudflare's size limit.
export default function MarkdownRenderer({ text }: { text: string }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
  );
}
