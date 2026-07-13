import type { Metadata } from "next";
import { Cinzel, Urbanist } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MAISON ÉCLAT",
  description: "未来车内算力空间 — 高端科技品牌沉浸式官网",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${urbanist.variable} antialiased bg-ink text-silver`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
