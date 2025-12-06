import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABPlayer Lite | A-B loop practice tool for local MP3",
  description:
    "ABPlayer Lite focuses on A-B loop practice for local MP3s: import, mark, loop, save segments, and track practice time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
