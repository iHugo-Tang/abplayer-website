import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABPlayer Lite | A-B Loop 本地 MP3 练习工具",
  description:
    "ABPlayer Lite 聚焦本地 MP3 的 A-B Loop 练习：导入、标记、循环、保存片段，并记录练习时长。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
