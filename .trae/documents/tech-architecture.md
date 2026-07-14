# 潮流服饰品牌电商网站 技术架构

## 1. 技术选型
- **前端技术**: 纯 HTML5 + CSS3 + Vanilla JavaScript (ES6+)
- **无需构建工具和后端**: 纯静态页面，可直接在浏览器中打开
- **字体**: Google Fonts (Oswald + Inter)
- **图标**: 自定义SVG图标

## 2. 项目结构

```
/workspace/
├── index.html              # 首页
├── products.html           # 商品列表页
├── product-detail.html     # 商品详情页
├── about.html              # 关于品牌页
├── cart.html               # 购物车页面
├── css/
│   └── style.css           # 全局样式
├── js/
│   ├── app.js              # 核心应用逻辑、数据、路由
│   ├── carousel.js         # 轮播模块
│   ├── cart.js             # 购物车模块
│   ├── gallery.js          # 图片画廊模块
│   └── animations.js       # 动画效果模块
└── assets/
    └── (图片资源使用占位图或SVG生成)
```

## 3. 架构设计

### 3.1 页面架构
采用 SPA-like 架构，但实际上所有页面共享同一个 HTML 结构，通过 CSS 类切换或利用多 HTML 文件共享 JS 模块。

实际采用：**多HTML文件 + 共享JS模块** 方案，每个页面独立HTML文件，共享head、footer组件和CSS/JS。

### 3.2 模块划分
- **app.js**: 全局状态管理、数据初始化、通用工具函数
- **carousel.js**: 首页轮播Banner自动播放、手动切换
- **cart.js**: 购物车CRUD、侧边抽屉、角标更新、抛物线动画
- **gallery.js**: 商品详情页图片画廊缩略图切换
- **animations.js**: 下拉菜单、商品卡片悬停效果

### 3.3 数据流
```
LocalStorage (购物车持久化)
    ↕
app.js (全局状态 Store)
    ↕
各页面组件 (UI 渲染)
```

### 3.4 路由方案
- 每个页面独立HTML文件，通过 `<a>` 标签跳转
- 购物车状态通过 localStorage 跨页面共享

## 4. 组件树

```
App
├── Header (导航栏)
│   ├── Logo
│   ├── NavMenu (主页/商品/关于)
│   │   └── Dropdown (商品分类, 缓动展开)
│   ├── CartIcon (购物车角标)
│   └── SearchIcon
├── Main Content (各页面不同)
│   ├── [HomePage] (首页)
│   │   ├── HeroBanner (轮播)
│   │   ├── FeaturedProducts
│   │   └── BrandStory
│   ├── [ProductsPage] (商品列表)
│   │   ├── CategoryFilter
│   │   └── ProductCard[] (悬停切换图 + 快速购买)
│   ├── [ProductDetailPage] (商品详情)
│   │   ├── ImageGallery (缩略图切换)
│   │   ├── ProductInfo
│   │   └── AddToCart
│   ├── [AboutPage] (关于品牌)
│   │   └── BrandContent
│   └── [CartPage] (购物车)
│       └── CartItems
├── CartDrawer (侧边抽屉, 全局)
├── ParabolicFly (抛物线飞入动画元素, 全局)
└── Footer (页脚)
```

## 5. 关键技术实现

### 5.1 轮播Banner
- 使用 CSS transform + transition 实现滑动效果
- JS 控制自动播放 (3秒间隔) + 触摸/点击手动切换
- 支持淡入淡出或滑动切换

### 5.2 商品卡片悬停
- 使用 CSS opacity transition 实现第二张图淡入
- 快速购买按钮使用 transform translateY 滑入

### 5.3 购物车抽屉
- 使用 CSS transform translateX 从右侧滑入
- 遮罩层覆盖，点击遮罩可关闭

### 5.4 抛物线飞入动画
- 使用 JavaScript 动态计算贝塞尔曲线路径
- 创建临时动画元素，从点击位置飞向购物车图标
- 使用 CSS transition 或 requestAnimationFrame 实现

### 5.5 下拉菜单
- 使用 CSS max-height + overflow 实现缓动展开
- transition 控制动画时间

## 6. 图片处理
- 使用 https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image 生成商品图片
- 使用 SVG 生成占位图标和装饰元素
- 商品图片使用 landscape_4_3 比例