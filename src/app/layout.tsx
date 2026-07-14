import type { Metadata } from 'next';
import './globals.css';
import StarField from '@/components/ui/StarField';
import Nebula from '@/components/ui/Nebula';
import HoloTimeBar from '@/components/ui/HoloTimeBar';
import Nav from '@/components/ui/Nav';
import MobileNav from '@/components/ui/MobileNav';

export const metadata: Metadata = {
  title: '深空宇宙 - Deep Space Universe',
  description: '探索无限深空，追踪星际轨迹，见证宇宙演化',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="relative min-h-screen bg-black text-deep-space-silver overflow-x-hidden">
        {/* 背景层 */}
        <Nebula />
        <StarField />

        {/* 全局UI层 */}
        <HoloTimeBar />
        <Nav />
        <MobileNav />

        {/* 页面内容 */}
        <main className="relative" style={{ zIndex: 10 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
