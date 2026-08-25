import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "2026 U.S.–Iran Campaign Timeline",
  description:
    "A concise operational timeline of the July–August 2026 U.S.–Iran campaign, grouped into semantic phases.",
  openGraph: {
    title: "U.S.–Iran Campaign · Operational Timeline",
    description:
      "Six phases. Thirty-five reported days. A concise operational record of the July–August 2026 campaign.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "U.S.–Iran Campaign · Operational Timeline",
    description:
      "Six phases. Thirty-five reported days. A concise operational record of the July–August 2026 campaign.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
