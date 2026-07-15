/**
 * three-adapter.js - Three.js 小程序适配器
 * 功能：封装 Three.js 在微信小程序中的初始化、渲染循环、交互处理
 *
 * 核心适配点：
 * 1. Canvas 注册：使用小程序 webgl Canvas 替代浏览器 Canvas
 * 2. 渲染循环：使用 wx.requestAnimationFrame / setInterval
 * 3. 触摸事件：小程序 touch 事件 → Three.js 旋转/缩放/平移
 * 4. 资源管理：小程序生命周期同步释放 GPU 资源
 * 5. 性能优化：低端设备降帧率、降分辨率
 */

const THREE_ADAPTER = {
  // ==================== 常量 ====================
  /** 默认渲染帧率 */
  FPS: 60,
  /** 低端设备渲染帧率 */
  FPS_LOW: 30,
  /** 旋转灵敏度 */
  ROTATE_SPEED: 0.005,
  /** 缩放灵敏度 */
  ZOOM_SPEED: 0.01,
  /** 平移灵敏度 */
  PAN_SPEED: 0.5,

  // ==================== 初始化 Three.js 场景 ====================

  /**
   * 初始化 Three.js 渲染环境
   * 在3D预览页面的 onReady 中调用
   *
   * @param {Object} canvas - 小程序 webgl Canvas 对象
   * @param {Object} options - 配置选项
   * @param {number} options.width - 画布宽度
   * @param {number} options.height - 画布高度
   * @param {number} options.pixelRatio - 像素比
   * @param {string} options.bgColor - 背景色
   * @returns {Object} { renderer, scene, camera, THREE }
   */
  init(canvas, options = {}) {
    const THREE = require('../libs/three.min.js');

    const {
      width = 375,
      height = 667,
      pixelRatio = 2,
      bgColor = '#1a1a2e'
    } = options;

    console.log(`[ThreeAdapter] 初始化: ${width}x${height}, DPR:${pixelRatio}`);

    // ---------- 渲染器 ----------
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true // 允许截图保存
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(pixelRatio, 2)); // 限制像素比，防止性能问题
    renderer.setClearColor(new THREE.Color(bgColor), 1);
    renderer.shadowMap.enabled = false; // 关闭阴影提升性能
    renderer.outputEncoding = THREE.sRGBEncoding;

    // ---------- 场景 ----------
    const scene = new THREE.Scene();

    // ---------- 相机 ----------
    // 透视相机：视野60度，宽高比，近裁面0.1，远裁面100
    const camera = new THREE.PerspectiveCamera(
      60,
      width / height,
      0.1,
      100
    );
    camera.position.set(0, 0, 3.5); // 相机在Z轴正方向
    camera.lookAt(0, 0, 0);

    // ---------- 光照 ----------
    // 环境光：提供基础照明
    const ambientLight = new THREE.AmbientLight(0x666688, 0.6);
    scene.add(ambientLight);

    // 主方向光：模拟太阳光，产生立体感
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // 补光：从底部打光，减少暗面过黑
    const fillLight = new THREE.DirectionalLight(0x4488cc, 0.4);
    fillLight.position.set(-3, -2, 3);
    scene.add(fillLight);

    // 背光（轮廓光）：增强立体感
    const backLight = new THREE.DirectionalLight(0x88aacc, 0.3);
    backLight.position.set(0, 0, -5);
    scene.add(backLight);

    // ---------- 辅助网格（调试用，正式版可注释） ----------
    // const gridHelper = new THREE.GridHelper(4, 20, 0x333355, 0x222244);
    // scene.add(gridHelper);

    return { renderer, scene, camera, THREE };
  },

  // ==================== 渲染循环 ====================

  /**
   * 启动渲染循环
   *
   * @param {Object} renderer - Three.js WebGLRenderer
   * @param {Object} scene - Three.js Scene
   * @param {Object} camera - Three.js Camera
   * @param {Object} options - 循环选项
   * @returns {number} 动画帧ID（用于取消）
   */
  startRenderLoop(renderer, scene, camera, options = {}) {
    const isLowPerformance = this._isLowPerformance();
    const fps = isLowPerformance ? this.FPS_LOW : (options.fps || this.FPS);
    const interval = 1000 / fps;

    let lastTime = Date.now();
    let animFrameId = null;

    // 使用 setInterval 模拟 requestAnimationFrame
    // 微信小程序中 requestAnimationFrame 支持有限，使用定时器作为降级方案
    const loop = () => {
      const now = Date.now();
      const delta = now - lastTime;

      if (delta >= interval) {
        lastTime = now - (delta % interval);
        // 执行渲染
        renderer.render(scene, camera);
      }

      // 使用 wx.requestAnimationFrame 如果可用
      if (typeof wx.requestAnimationFrame === 'function') {
        animFrameId = wx.requestAnimationFrame(loop);
      } else {
        animFrameId = setTimeout(loop, interval);
      }
    };

    loop();
    return animFrameId;
  },

  /**
   * 停止渲染循环
   * @param {number} animFrameId - 动画帧ID
   */
  stopRenderLoop(animFrameId) {
    if (animFrameId) {
      if (typeof wx.cancelAnimationFrame === 'function') {
        wx.cancelAnimationFrame(animFrameId);
      } else {
        clearTimeout(animFrameId);
      }
    }
  },

  // ==================== 触摸交互 ====================

  /**
   * 处理触摸旋转（单指滑动）
   *
   * @param {Object} camera - Three.js 相机
   * @param {number} deltaX - X方向位移
   * @param {number} deltaY - Y方向位移
   * @param {Object} target - 旋转目标点（默认原点）
   */
  handleRotate(camera, deltaX, deltaY, target = { x: 0, y: 0, z: 0 }) {
    const angleX = deltaX * this.ROTATE_SPEED;
    const angleY = deltaY * this.ROTATE_SPEED;

    // 计算相机相对于目标的位置
    const dx = camera.position.x - target.x;
    const dy = camera.position.y - target.y;
    const dz = camera.position.z - target.z;

    // 水平旋转（绕世界Y轴）
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const newDx = dx * cosX - dz * sinX;
    const newDz = dx * sinX + dz * cosX;

    // 垂直旋转（绕局部X轴）
    const currentRadius = Math.sqrt(newDx * newDx + dy * dy + newDz * newDz);
    const currentPolar = Math.acos(dy / currentRadius);
    const newPolar = Math.max(0.2, Math.min(Math.PI - 0.2, currentPolar + angleY));

    const newDy = currentRadius * Math.cos(newPolar);
    const horizontalRadius = currentRadius * Math.sin(newPolar);
    const currentAzimuth = Math.atan2(newDz, newDx);
    const newDx2 = horizontalRadius * Math.cos(currentAzimuth);
    const newDz2 = horizontalRadius * Math.sin(currentAzimuth);

    camera.position.set(
      target.x + newDx2,
      target.y + newDy,
      target.z + newDz2
    );
    camera.lookAt(target.x, target.y, target.z);
  },

  /**
   * 处理双指缩放
   *
   * @param {Object} camera - Three.js 相机
   * @param {number} scale - 缩放比例（>1放大，<1缩小）
   */
  handleZoom(camera, scale) {
    // 限制缩放范围
    const newZ = camera.position.z / scale;
    camera.position.z = Math.max(1.5, Math.min(8, newZ));
  },

  /**
   * 处理平移
   *
   * @param {Object} camera - Three.js 相机
   * @param {number} deltaX - X方向位移
   * @param {number} deltaY - Y方向位移
   */
  handlePan(camera, deltaX, deltaY) {
    const factor = camera.position.z * this.PAN_SPEED * 0.001;
    camera.position.x -= deltaX * factor;
    camera.position.y += deltaY * factor;
    // 保持相机看向原点
    camera.lookAt(0, 0, 0);
  },

  // ==================== 辅助方法 ====================

  /**
   * 判断是否为低性能设备
   */
  _isLowPerformance() {
    const sysInfo = getApp().globalData.systemInfo || {};
    if (sysInfo.pixelRatio && sysInfo.pixelRatio < 2) return true;
    if (sysInfo.platform === 'android') {
      const version = parseFloat(sysInfo.system.split(' ')[0]);
      if (version < 8) return true;
    }
    return false;
  },

  /**
   * 更新背景色
   * @param {Object} renderer
   * @param {string} colorHex
   */
  updateBackgroundColor(renderer, colorHex) {
    const THREE = require('../libs/three.min.js');
    renderer.setClearColor(new THREE.Color(colorHex), 1);
  },

  /**
   * 获取设备适配的渲染分辨率
   * @returns {{width: number, height: number, pixelRatio: number}}
   */
  getRenderSize() {
    const sysInfo = getApp().globalData.systemInfo || {};
    const isLow = this._isLowPerformance();

    return {
      width: sysInfo.windowWidth || 375,
      height: sysInfo.windowHeight || 667,
      pixelRatio: isLow ? 1 : Math.min(sysInfo.pixelRatio || 2, 2)
    };
  }
};

module.exports = THREE_ADAPTER;