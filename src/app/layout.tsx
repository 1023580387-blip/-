import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEEP SPACE · 深空宇宙探索",
  description: "深空宇宙主题全屏动态官网 - 探索浩瀚无际的星际空间",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="antialiased bg-space-black">
        {children}
      </body>
    </html>
  );
}