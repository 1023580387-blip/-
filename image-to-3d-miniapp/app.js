/**
 * app.js - 小程序入口文件
 * 功能：全局生命周期管理、全局数据存储、Three.js 适配器初始化
 */

App({
  // ==================== 全局数据 ====================
  globalData: {
    // 当前加载的图片信息
    imageInfo: {
      path: '',          // 图片本地路径
      width: 0,          // 图片宽度
      height: 0,         // 图片高度
      compressedPath: '' // 压缩后图片路径
    },
    // 深度图数据（像素级深度值数组）
    depthData: null,
    // 生成的3D模型数据（GLB ArrayBuffer）
    modelData: null,
    // 系统信息（屏幕尺寸、像素比、平台）
    systemInfo: null,
    // Three.js 全局实例（跨页面共享）
    threeInstance: null,
    // 用户设置
    settings: {
      bumpStrength: 1.0,    // 凹凸强度 0.5~2.0
      renderMode: 'solid',  // 渲染模式: 'solid' | 'wireframe'
      bgColor: '#1a1a2e'    // 背景色
    },
    // 新手引导标记
    isFirstLaunch: true
  },

  // ==================== 生命周期 ====================
  onLaunch() {
    // 获取系统信息，用于全局适配
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res;
        console.log('[App] 系统信息:', {
          platform: res.platform,
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight,
          pixelRatio: res.pixelRatio,
          model: res.model
        });
      },
      fail: (err) => {
        console.error('[App] 获取系统信息失败:', err);
      }
    });

    // 检查是否首次启动
    const hasLaunched = wx.getStorageSync('hasLaunched');
    this.globalData.isFirstLaunch = !hasLaunched;
    if (!hasLaunched) {
      wx.setStorageSync('hasLaunched', true);
    }

    // 清理旧缓存
    this._cleanCache();
  },

  onShow() {
    console.log('[App] 小程序切到前台');
  },

  onHide() {
    console.log('[App] 小程序切到后台');
    // 释放3D渲染资源，节省内存
    this._releaseThreeResources();
  },

  onError(err) {
    console.error('[App] 全局错误:', err);
  },

  // ==================== 缓存管理 ====================
  /** 清理临时图片缓存，防止存储空间膨胀 */
  _cleanCache() {
    const fs = wx.getFileSystemManager();
    try {
      const cacheDir = `${wx.env.USER_DATA_PATH}/temp`;
      // 尝试读取并清理临时目录
      fs.rmdirSync(cacheDir, true);
    } catch (e) {
      // 缓存目录可能不存在，忽略错误
    }
  },

  // ==================== 资源释放 ====================
  /** 释放Three.js渲染资源，防止内存泄漏 */
  _releaseThreeResources() {
    if (this.globalData.threeInstance) {
      try {
        const { renderer, scene } = this.globalData.threeInstance;
        if (renderer) {
          renderer.dispose && renderer.dispose();
        }
        if (scene) {
          scene.traverse((child) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(m => m.dispose());
              } else {
                child.material.dispose();
              }
            }
            if (child.texture) child.texture.dispose();
          });
        }
      } catch (e) {
        console.error('[App] 释放Three.js资源失败:', e);
      }
      this.globalData.threeInstance = null;
    }
  }
});