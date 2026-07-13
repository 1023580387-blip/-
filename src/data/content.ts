import {
  Cpu,
  Radio,
  Zap,
  Shield,
  Terminal,
  Orbit,
} from "lucide-react";

export type ProtocolFeature = {
  index: string;
  title: string;
  description: string;
  icon: typeof Cpu;
  accent: "pink" | "cyan" | "lime" | "magenta";
};

export const PROTOCOL_FEATURES: ProtocolFeature[] = [
  {
    index: "01",
    title: "神经接口 / NEURAL I/O",
    description:
      "以低延迟信号直连创意层。每一次脉冲都被解析为可执行的视觉指令，让想法在毫秒间落地为像素。",
    icon: Cpu,
    accent: "cyan",
  },
  {
    index: "02",
    title: "脉冲协议 / PULSE PROTOCOL",
    description:
      "分布式动效共识——每个节点共享同一套节奏法则，故障、辉光与扫描线在城市上空同步呼吸。",
    icon: Radio,
    accent: "pink",
  },
  {
    index: "03",
    title: "超载引擎 / OVERDRIVE",
    description:
      "当创作强度突破阈值，引擎自动切换至超频模式，粒子密度与辉光层级提升至下一个量级。",
    icon: Zap,
    accent: "lime",
  },
];

export type Stat = {
  label: string;
  value: string;
  accent: "pink" | "cyan" | "lime" | "magenta";
};

export const LIVE_STATS: Stat[] = [
  { label: "活跃节点 NODES", value: "2,847", accent: "cyan" },
  { label: "脉冲/秒 PPS", value: "18.4K", accent: "pink" },
  { label: "霓虹覆盖率", value: "94.2%", accent: "lime" },
  { label: "信号稳定度", value: "99.7%", accent: "magenta" },
];

export const TERMINAL_LOGS: string[] = [
  "[BOOT] neon-pulse kernel v3.1.4 初始化中...",
  "[NET]  连接骨干节点 //tokyo-9 //berlin-2 //shenzhen-7",
  "[OK ]  信号握手完成，延迟 12ms",
  "[SYNC] 同步脉冲协议层 PPL-7",
  "[GPU] 超载引擎预热 0x4F2A",
  "[IO ]  神经接口通道已开启",
  "[WARN] 检测到城市霓虹衰减 0.3%",
  "[EXEC] 注入动效指令 #F4A1 → hero.glitch",
  "[EXEC] 注入动效指令 #F4A2 → grid.perspective",
  "[OK ]  渲染管线就绪",
  "[INFO] 2,847 个节点在线，等待接入",
  "[PULSE] ◆ ◆ ◆ ◆ ◆ 心跳正常",
  "[EXEC] 注入动效指令 #F4B0 → card.hover-sweep",
  "[NET]  新节点 +1 //anonymous-7741",
  "[OK ]  接入完成，欢迎进入脉冲",
];

export const MANIFESTO_LINES: { text: string; accent?: "pink" | "cyan" | "lime" | "magenta" }[] = [
  { text: "我们不造网站。" },
  { text: "我们给城市", accent: "cyan" },
  { text: "接上脉冲。" },
  { text: "在霓虹与故障之间，" },
  { text: "寻找未被渲染的", accent: "pink" },
  { text: "那一帧未来。" },
  { text: "—— NEON//PULSE 宣言", accent: "lime" },
];

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "协议", href: "#protocol" },
  { label: "脉冲", href: "#pulse" },
  { label: "宣言", href: "#manifesto" },
  { label: "接入", href: "#access" },
];

export type FooterColumn = { title: string; links: NavLink[] };

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "协议",
    links: [
      { label: "神经接口", href: "#protocol" },
      { label: "脉冲协议", href: "#protocol" },
      { label: "超载引擎", href: "#protocol" },
    ],
  },
  {
    title: "集体",
    links: [
      { label: "宣言", href: "#manifesto" },
      { label: "节点地图", href: "#pulse" },
      { label: "接入申请", href: "#access" },
    ],
  },
  {
    title: "频道",
    links: [
      { label: "Telegram", href: "#" },
      { label: "Discord", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
];

export const SOCIAL_LINKS: { label: string; icon: typeof Orbit; href: string }[] = [
  { label: "GitHub", icon: Orbit, href: "#" },
  { label: "Terminal", icon: Terminal, href: "#" },
  { label: "Shield", icon: Shield, href: "#" },
];

export const HERO_STATS = [
  { value: "v3.1.4", label: "PULSE KERNEL" },
  { value: "2,847", label: "LIVE NODES" },
  { value: "12ms", label: "SIGNAL LATENCY" },
];
