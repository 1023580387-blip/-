// ========================================
// 根布局 Layout - 字体、全局样式、公共组件
// 加载动画 + 导航 + 页面切换动画包裹
// ========================================
import type { Metadata } from 'next';
import './globals.css';
import LayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'MAISON ÉCLAT | 赛博朋克量子科技',
  description: '量子计算与人工智能的未来 · 赛博朋克多界面动态官网',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="font-body bg-black text-white antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}