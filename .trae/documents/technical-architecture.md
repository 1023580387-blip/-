# 哈夫克集团官方网站 - 技术架构文档

## 1. 架构设计

```mermaid
flowchart TB
    subgraph Frontend["前端层 (React 18 + TypeScript)"]
        A[React Router v6<br/>路由管理] --> B[Pages<br/>页面组件]
        B --> C[Components<br/>UI组件]
        C --> D[Hooks<br/>自定义Hook]
        D --> E[Zustand Store<br/>状态管理]
    end
    
    subgraph Styling["样式层"]
        F[Tailwind CSS 3<br/>原子化CSS] --> G[CSS Modules<br/>复杂动画]
        G --> H[Framer Motion<br/>页面过渡]
    end
    
    subgraph 3D["3D渲染层"]
        I[Three.js] --> J[@react-three/fiber<br/>React渲染器]
        J --> K[@react-three/drei<br/>辅助组件]
        K --> L[后处理效果<br/>Bloom/景深]
    end
    
    subgraph Data["数据层"]
        M[静态JSON数据<br/>产品信息] --> N[本地状态<br/>Zustand]
        N --> O[URL参数<br/>暗网触发]
    end
    
    Frontend --> Styling
    Frontend --> 3D
    Frontend --> Data
```

## 2. 技术描述

- **前端框架**：React 18.3 + TypeScript 5.0
- **构建工具**：Vite 5.0
- **样式方案**：Tailwind CSS 3.4 + CSS Modules
- **3D引擎**：Three.js 0.160 + @react-three/fiber 8.15 + @react-three/drei 9.92
- **动画库**：Framer Motion 10.16（页面过渡）+ CSS Animations（微交互）
- **路由管理**：React Router v6.20
- **状态管理**：Zustand 4.4（暗网登录状态、CG播放器状态）
- **音效处理**：Web Audio API（CG短片背景音乐）
- **初始化模板**：vite-init react-ts
- **后端**：无（纯前端静态站点）
- **数据库**：无（所有数据硬编码在组件中）

## 3. 路由定义

| 路由 | 页面组件 | 功能描述 |
|------|----------|----------|
| `/` | HomePage | 首页，包含Hero区域、CG短片、Slogan、隐藏触发器 |
| `/about` | AboutPage | 关于我们，展示集团历史、愿景、阿萨拉计划 |
| `/products` | ProductsPage | 产品矩阵列表页，展示4个核心产品卡片 |
| `/products/mandel-brick` | MandelBrickPage | 曼德尔超算单元详情页 |
| `/products/neural-link` | NeuralLinkPage | 神经链接与脑机接口详情页 |
| `/products/titan-exoskeleton` | TitanExoskeletonPage | 重型工程与战术外骨骼详情页 |
| `/products/zero-dam` | ZeroDamPage | 阿萨拉生态改造与能源矩阵详情页 |
| `/careers` | CareersPage | 人才网，招聘海报与入职考试题 |
| `/admin` | AdminLoginPage | 暗网登录界面（终端风格） |
| `/admin/dashboard` | AdminDashboardPage | 暗网绝密档案库（需登录） |

## 4. 组件架构

### 4.1 页面组件
```
src/pages/
├── HomePage.tsx              # 首页
├── AboutPage.tsx             # 关于我们
├── ProductsPage.tsx          # 产品列表
├── MandelBrickPage.tsx       # 曼德尔砖详情
├── NeuralLinkPage.tsx        # 脑机接口详情
├── TitanExoskeletonPage.tsx  # 外骨骼详情
├── ZeroDamPage.tsx           # 零号大坝详情
├── CareersPage.tsx           # 人才网
├── AdminLoginPage.tsx        # 暗网登录
└── AdminDashboardPage.tsx    # 暗网档案库
```

### 4.2 共享组件
```
src/components/
├── layout/
│   ├── Navbar.tsx            # 顶部导航栏
│   └── Footer.tsx            # 底部免责声明
├── home/
│   ├── HeroSection.tsx       # Hero区域（Logo+视差）
│   ├── CGPlayer.tsx          # CG短片播放器
│   └── HiddenTrigger.tsx     # 隐藏触发器
├── about/
│   ├── Timeline.tsx          # 时间线组件
│   └── VisionCard.tsx        # 愿景卡片
├── products/
│   ├── ProductCard.tsx       # 产品卡片
│   ├── ProductViewer3D.tsx   # 3D模型查看器
│   └── HiddenDetail.tsx      # 隐藏细节放大镜
├── careers/
│   ├── JobPoster.tsx         # 招聘海报
│   └── ExamQuestion.tsx      # 考试题组件
├── admin/
│   ├── Terminal.tsx          # 终端界面
│   ├── LoginPrompt.tsx       # 登录提示
│   └── DossierViewer.tsx     # 卷宗查看器
└── common/
    ├── HexagonLogo.tsx       # 六边形Logo
    ├── GlowingButton.tsx     # 发光按钮
    └── ScanLineEffect.tsx    # 扫描线效果
```

### 4.3 自定义Hook
```
src/hooks/
├── useParallax.ts            # 鼠标视差效果
├── useClickCounter.ts        # 点击计数器（隐藏触发器）
├── useTerminal.ts            # 终端输入处理
└── useAudioPlayer.ts         # CG音效播放
```

## 5. 状态管理

### 5.1 Zustand Store定义

```typescript
// src/store/useAppStore.ts
interface AppState {
  // 暗网登录状态
  isAdminLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  // CG播放器状态
  isCGPlaying: boolean;
  setCGPlaying: (playing: boolean) => void;
  
  // 隐藏触发器状态
  hiddenClickCount: number;
  incrementHiddenClick: () => void;
  resetHiddenClick: () => void;
}
```

## 6. 数据结构

### 6.1 产品数据
```typescript
interface Product {
  id: string;
  name: string;
  slogan: string;
  description: string;
  features: string[];
  hiddenDetail?: {
    type: 'code' | 'text' | 'map';
    content: string;
    triggerMethod: string;
  };
  model3D?: string; // 3D模型路径
}
```

### 6.2 卷宗数据
```typescript
interface Dossier {
  id: string;
  title: string;
  accessLevel: 'public' | 'restricted' | 'classified';
  content: string;
  images?: string[];
  requiresKey: boolean;
}
```

### 6.3 时间线事件
```typescript
interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  isPositive: boolean; // 表面正面 vs 暗面真相
}
```

## 7. 性能优化

### 7.1 代码分割
- 使用React.lazy + Suspense对页面级组件进行懒加载
- 3D模型查看器单独打包，按需加载

### 7.2 资源优化
- 图片：使用WebP格式，响应式srcset
- 3D模型：使用GLTF格式 + DRACO压缩
- 字体：子集化，仅加载所需字符
- 音效：使用OGG格式，压缩至128kbps

### 7.3 渲染优化
- 3D场景：使用实例化渲染（InstancedMesh）
- 动画：使用CSS transform而非layout属性
- 滚动：使用Intersection Observer实现懒加载

### 7.4 缓存策略
- 静态资源：Cache-Control: max-age=31536000
- HTML：Cache-Control: no-cache
- API数据：LocalStorage缓存（如适用）

## 8. 浏览器兼容性

- **支持范围**：Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **WebGL要求**：WebGL 2.0（3D功能）
- **降级方案**：不支持WebGL时显示静态产品图片

## 9. 部署架构

```
静态站点部署（Vercel/Netlify/GitHub Pages）
├── 构建产物：dist/
│   ├── index.html
│   ├── assets/
│   │   ├── *.js (代码分割)
│   │   ├── *.css
│   │   ├── *.webp (图片)
│   │   └── *.glb (3D模型)
│   └── favicon.ico
└── 路由：客户端路由，所有路径重定向至index.html
```

## 10. 安全考虑

- **暗网入口**：仅前端验证，无真实安全性（游戏彩蛋性质）
- **XSS防护**：React默认转义，避免dangerouslySetInnerHTML
- **CSP策略**：限制脚本源为self，禁止eval
- **敏感信息**：所有"敏感"数据硬编码，无真实API调用
