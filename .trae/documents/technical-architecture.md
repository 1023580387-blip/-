# 技术架构 - NEON//PULSE

## 1. 架构设计

纯前端单页应用，无后端依赖。表单提交模拟本地状态反馈。

```mermaid
flowchart TD
    subgraph "前端层 Frontend"
        "React 18 SPA"
        "Tailwind CSS 主题"
        "Framer Motion 动效"
        "Zustand 状态管理"
    end
    subgraph "资源层 Assets"
        "Google Fonts"
        "lucide-react 图标"
    end
    "前端层 Frontend" --> "资源层 Assets"
```

## 2. 技术栈说明

- **前端框架**：React@18 + TypeScript + Vite
- **样式方案**：Tailwind CSS@3（自定义霓虹主题 token）
- **动效库**：Framer Motion（滚动揭示 / 入场动画），CSS 动画（故障 / 扫描线 / 网格）
- **状态管理**：Zustand（表单状态 + 确认态）
- **图标库**：lucide-react
- **字体**：Google Fonts - Audiowide（显示）、Space Mono（正文）、JetBrains Mono（数据）
- **初始化工具**：vite-init react-ts 模板
- **后端**：无（表单提交模拟本地反馈）
- **数据库**：无

## 3. 路由定义

| 路由 | 用途 |
|------|------|
| `/` | 单页着陆页，包含全部内容区块（锚点滚动） |

锚点：`#hero` `#protocol` `#pulse` `#manifesto` `#access`

## 4. 目录结构

```
src/
  components/
    Hero.tsx              # Hero 区（故障标题 + 网格 + CTA）
    ProtocolFeatures.tsx  # 协议特性卡片网格
    DataPulse.tsx         # 数据脉冲终端日志流
    Manifesto.tsx         # 宣言区逐行揭示
    AccessCTA.tsx         # 加入 CTA 表单
    SiteFooter.tsx        # 底部
    Background.tsx        # 全局背景层（网格 + 扫描线 + 噪点）
    GlitchText.tsx        # 可复用故障文字组件
    NeonButton.tsx        # 可复用霓虹按钮组件
    ScrollReveal.tsx      # 可复用滚动揭示包装器
  hooks/
    useTerminalStream.ts  # 终端日志流模拟
  store/
    useAccessStore.ts     # 表单 / 确认态
  data/
    content.ts            # 文案 / 特性 / 日志内容
  App.tsx
  main.tsx
  index.css
```

## 5. 关键实现要点

### 5.1 霓虹主题 token（tailwind.config.js）
- `colors.neon.pink / cyan / lime / magenta`
- `boxShadow.neon-*` 辉光阴影
- `fontFamily.display / mono / data`

### 5.2 故障文字效果
- CSS `::before` / `::after` 伪元素 + `clip-path` 动画
- RGB 通道偏移（粉 / 青）实现赛博故障感
- 尊重 `prefers-reduced-motion` 时降级为静态

### 5.3 透视网格背景
- CSS `perspective` + 重复线性渐变构建地面网格
- 缓动 `transform: translateZ` 营造无限延伸感

### 5.4 终端日志流
- `useTerminalStream` hook 按间隔推送日志行
- 自动滚动到底部，光标闪烁

### 5.5 性能
- 动效优先使用 `transform` / `opacity`
- 移动端通过 `prefers-reduced-motion` 与媒体查询关闭重型动效
- 图标按需引入 lucide-react

## 6. 测试策略
- 组件单元测试（Vitest）：故障文字降级、表单状态流转
- 浏览器 `console.debug` 检查日志流与滚动触发
- `npm run check` 确保类型正确
- 手动验证响应式断点与 hover 交互
