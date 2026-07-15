import type { Metadata } from "next";
import "./globals.css";
import HoloGlobalNav from "@/components/layout/HoloGlobalNav";
import HoloTimeBar from "@/components/layout/HoloTimeBar";
import StarParticles from "@/components/layout/StarParticles";
import Footer from "@/components/layout/Footer";
import HaavkAIChat from "@/components/ai/HaavkAIChat";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "HAAVK Global Defense Group | 哈夫克全球防务集团",
  description: "哈夫克集团（HAAVK）是全球最大的综合科技防务财团，核心业务涵盖曼德尔砖超算AI、天网卫星系统、航天工程、新能源设施、脑机科技及全球安保服务。哈夫克与你同频，信息予你无限。",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-haavk-carbon text-haavk-silver font-rajdhani antialiased min-h-screen data-track">
        <StarParticles />
        <HoloTimeBar />
        <HoloGlobalNav />
        <PageTransition>
          <main className="relative z-10 pt-24">
            {children}
          </main>
        </PageTransition>
        <Footer />
        <HaavkAIChat />
      </body>
    </html>
  );
}