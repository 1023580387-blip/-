import type { Metadata } from 'next';
import './globals.css';
import { CyberBackground } from '@/components/ui/CyberBackground';
import { Navigation } from '@/components/layout/Navigation';
import { HoloTimeBar } from '@/components/layout/HoloTimeBar';
import { PageTransition } from '@/components/layout/PageTransition';

export const metadata: Metadata = {
  title: '赛博朋克深空星系官网',
  description: '沉浸式星际数据可视化体验',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="relative min-h-screen bg-cyber-black text-white overflow-x-hidden">
        <CyberBackground />
        <HoloTimeBar />
        <Navigation />
        <PageTransition>
          <main className="relative z-10 pt-20">
            {children}
          </main>
        </PageTransition>
      </body>
    </html>
  );
}
