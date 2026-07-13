// ========================================
// 赛博朋克官网 - 全局常量定义
// 视频素材、主题配色、产品/案例等数据
// ========================================

// 三套霓虹主题配色
export const THEMES = [
  {
    name: '电光青',
    className: 'theme-cyan',
    primary: '#00F0FF',
    secondary: '#0066FF',
    accent: '#00FFAA',
    glow: '0 0 10px #00F0FF, 0 0 30px #00F0FF',
  },
  {
    name: '洋红',
    className: 'theme-magenta',
    primary: '#FF00FF',
    secondary: '#FF0066',
    accent: '#FF6600',
    glow: '0 0 10px #FF00FF, 0 0 30px #FF00FF',
  },
  {
    name: '紫罗兰',
    className: 'theme-violet',
    primary: '#8B00FF',
    secondary: '#6600FF',
    accent: '#FF00FF',
    glow: '0 0 10px #8B00FF, 0 0 30px #8B00FF',
  },
];

// 全息视频素材 - 使用国内可加载无版权 CDN 视频
export const HOLOGRAM_VIDEOS = {
  // 首页视频
  hero: [
    {
      id: 'cyber-city',
      title: '赛博都市夜景',
      url: 'https://cdn.pixabay.com/video/2023/11/12/188474-883770762_large.mp4',
      poster: '',
    },
    {
      id: 'quantum-server',
      title: '量子机房',
      url: 'https://cdn.pixabay.com/video/2024/02/25/201931-915365644_large.mp4',
      poster: '',
    },
    {
      id: 'ai-chip',
      title: 'AI 机械芯片',
      url: 'https://cdn.pixabay.com/video/2023/10/22/186101-876636755_large.mp4',
      poster: '',
    },
    {
      id: 'metaverse',
      title: '元宇宙虚拟空间',
      url: 'https://cdn.pixabay.com/video/2023/09/24/182110-867664058_large.mp4',
      poster: '',
    },
  ],
  // 产品/硬件视频
  product: [
    'https://cdn.pixabay.com/video/2023/11/12/188474-883770762_large.mp4',
    'https://cdn.pixabay.com/video/2024/02/25/201931-915365644_large.mp4',
    'https://cdn.pixabay.com/video/2023/10/22/186101-876636755_large.mp4',
    'https://cdn.pixabay.com/video/2023/09/24/182110-867664058_large.mp4',
  ],
  // 数据流抽象视频
  abstract: [
    'https://cdn.pixabay.com/video/2024/03/10/203456-925678901_large.mp4',
    'https://cdn.pixabay.com/video/2023/12/05/191234-890123456_large.mp4',
  ],
};

// 产品卡片数据
export const PRODUCTS = [
  {
    id: 'p1',
    name: 'NEON CORE X9',
    description: '量子计算核心 · 每秒千万亿次浮点运算',
    videoUrl: 'https://cdn.pixabay.com/video/2023/11/12/188474-883770762_large.mp4',
  },
  {
    id: 'p2',
    name: 'CYBER MATRIX',
    description: '神经矩阵处理器 · 自适应 AI 加速引擎',
    videoUrl: 'https://cdn.pixabay.com/video/2024/02/25/201931-915365644_large.mp4',
  },
  {
    id: 'p3',
    name: 'HOLO DRIVE',
    description: '全息数据存储 · 无限容量量子晶体',
    videoUrl: 'https://cdn.pixabay.com/video/2023/10/22/186101-876636755_large.mp4',
  },
  {
    id: 'p4',
    name: 'VOID LINK',
    description: '暗物质通讯模块 · 跨维度零延迟传输',
    videoUrl: 'https://cdn.pixabay.com/video/2023/09/24/182110-867664058_large.mp4',
  },
  {
    id: 'p5',
    name: 'PULSE ENGINE',
    description: '脉冲动力引擎 · 反物质能源核心',
    videoUrl: 'https://cdn.pixabay.com/video/2023/11/12/188474-883770762_large.mp4',
  },
  {
    id: 'p6',
    name: 'NEURAL WEB',
    description: '全球神经网络 · 亿级节点并行计算',
    videoUrl: 'https://cdn.pixabay.com/video/2024/02/25/201931-915365644_large.mp4',
  },
];

// 时间轴节点数据
export const TIMELINE_NODES = [
  {
    year: '2077',
    title: '品牌创立',
    description: '在赛博都市废墟中诞生，以量子技术重塑未来',
    videoUrl: 'https://cdn.pixabay.com/video/2023/11/12/188474-883770762_large.mp4',
  },
  {
    year: '2079',
    title: '首款量子芯片',
    description: 'NEON CORE 原型问世，突破经典计算极限',
    videoUrl: 'https://cdn.pixabay.com/video/2023/10/22/186101-876636755_large.mp4',
  },
  {
    year: '2081',
    title: '神经矩阵发布',
    description: 'CYBER MATRIX 开启 AI 自适应加速新时代',
    videoUrl: 'https://cdn.pixabay.com/video/2024/02/25/201931-915365644_large.mp4',
  },
  {
    year: '2083',
    title: '全息存储突破',
    description: 'HOLO DRIVE 实现无限容量量子晶体存储',
    videoUrl: 'https://cdn.pixabay.com/video/2023/09/24/182110-867664058_large.mp4',
  },
  {
    year: '2085',
    title: '全球网络部署',
    description: 'NEURAL WEB 覆盖全球主要赛博城市',
    videoUrl: 'https://cdn.pixabay.com/video/2023/11/12/188474-883770762_large.mp4',
  },
  {
    year: '2087',
    title: '跨维度通讯',
    description: 'VOID LINK 实现人类首次跨维度传输',
    videoUrl: 'https://cdn.pixabay.com/video/2024/02/25/201931-915365644_large.mp4',
  },
];

// 合作案例数据
export const WORK_CASES = [
  {
    id: 'w1',
    title: '新东京 AI 城市大脑',
    category: '智慧城市',
    videoUrl: 'https://cdn.pixabay.com/video/2023/11/12/188474-883770762_large.mp4',
  },
  {
    id: 'w2',
    title: '轨道电梯量子调度',
    category: '太空工程',
    videoUrl: 'https://cdn.pixabay.com/video/2024/02/25/201931-915365644_large.mp4',
  },
  {
    id: 'w3',
    title: '深海城市能源网络',
    category: '能源系统',
    videoUrl: 'https://cdn.pixabay.com/video/2023/10/22/186101-876636755_large.mp4',
  },
  {
    id: 'w4',
    title: '火星殖民地 AI 中枢',
    category: '太空殖民',
    videoUrl: 'https://cdn.pixabay.com/video/2023/09/24/182110-867664058_large.mp4',
  },
  {
    id: 'w5',
    title: '全球量子通讯网络',
    category: '通讯基建',
    videoUrl: 'https://cdn.pixabay.com/video/2023/11/12/188474-883770762_large.mp4',
  },
  {
    id: 'w6',
    title: '意识上传试点项目',
    category: '前沿研究',
    videoUrl: 'https://cdn.pixabay.com/video/2024/02/25/201931-915365644_large.mp4',
  },
  {
    id: 'w7',
    title: '纳米医疗机器人集群',
    category: '医疗科技',
    videoUrl: 'https://cdn.pixabay.com/video/2023/10/22/186101-876636755_large.mp4',
  },
  {
    id: 'w8',
    title: '反物质能源工厂',
    category: '能源系统',
    videoUrl: 'https://cdn.pixabay.com/video/2023/09/24/182110-867664058_large.mp4',
  },
];

// 导航菜单项
export const NAV_ITEMS = [
  { label: '首页', href: '/', icon: 'Home' },
  { label: '产品', href: '/products', icon: 'Cpu' },
  { label: '算力', href: '/compute', icon: 'Server' },
  { label: '关于', href: '/about', icon: 'Clock' },
  { label: '案例', href: '/works', icon: 'Briefcase' },
  { label: '联系', href: '/contact', icon: 'MessageSquare' },
];