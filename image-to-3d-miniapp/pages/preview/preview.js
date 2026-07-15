/**
 * preview.js - 3D预览画布页面逻辑
 * 功能：Three.js 3D场景初始化、模型渲染、触摸交互、导出
 *
 * 核心流程：
 * 1. onReady: 获取全局数据 → 初始化Three.js → 生成3D模型 → 开始渲染循环
 * 2. 触摸事件: 拖拽旋转、双指缩放、平移视角
 * 3. 控制栏: 凹凸强度调节、渲染模式切换、背景色切换、导出模型、保存截图
 * 4. onUnload: 释放GPU资源，防止内存泄漏
 */

const THREE_ADAPTER = require('../../utils/three-adapter');
const ModelGenerator = require('../../utils/modelGenerator');
const ExportUtil = require('../../utils/exportUtil');

Page({
  data: {
    // 控制面板状态
    bumpStrength: 1.0,
    renderMode: 'solid',     // 'solid' | 'wireframe'
    bgColor: '#1a1a2e',

    // 弹窗状态
    isGenerating: true,
    showExportModal: false,
    exportMessage: '',
    showBgColorModal: false,

    // 相机距离（用于缩放滑块）
    cameraDistance: 3.5
  },

  // ==================== 私有状态（非响应式） ====================
  _three: null,         // Three.js 库引用
  _renderer: null,      // WebGL渲染器
  _scene: null,         // 3D场景
  _camera: null,        // 透视相机
  _model: null,         // 当前3D模型Mesh
  _animFrameId: null,   // 渲染循环帧ID

  // 触摸交互状态
  _touchState: {
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    isRotating: false,
    isPanning: false,
    lastDistance: 0,    // 双指上次距离
    initialDistance: 0  // 双指初始距离
  },

  // ==================== 生命周期 ====================

  onLoad() {
    // 获取全局设置
    const app = getApp();
    this.setData({
      bumpStrength: app.globalData.settings.bumpStrength,
      renderMode: app.globalData.settings.renderMode,
      bgColor: app.globalData.settings.bgColor
    });
  },

  onReady() {
    // 页面渲染完成后初始化 Three.js
    this._initThreeJS();
  },

  onUnload() {
    // 页面销毁时释放资源
    this._cleanup();
  },

  onHide() {
    // 页面切到后台时暂停渲染
    this._stopRenderLoop();
  },

  onShow() {
    // 页面切回前台时恢复渲染
    if (this._renderer && this._scene && this._camera) {
      this._startRenderLoop();
    }
  },

  // ==================== Three.js 初始化 ====================

  /**
   * 初始化 Three.js 场景
   * 步骤：获取Canvas → 初始化渲染器/场景/相机 → 生成模型 → 开始渲染
   */
  async _initThreeJS() {
    try {
      // 第1步：获取 WebGL Canvas 实例
      const canvasQuery = await this._getCanvas();
      if (!canvasQuery) {
        throw new Error('获取 WebGL Canvas 失败');
      }

      // 第2步：获取全局数据
      const app = getApp();
      const { imageInfo, depthData } = app.globalData;
      if (!imageInfo.path || !depthData) {
        throw new Error('图片数据丢失，请返回重新选择');
      }

      // 第3步：初始化 Three.js 渲染环境
      const renderSize = THREE_ADAPTER.getRenderSize();
      const threeEnv = THREE_ADAPTER.init(canvasQuery, {
        width: renderSize.width,
        height: renderSize.height,
        pixelRatio: renderSize.pixelRatio,
        bgColor: this.data.bgColor
      });

      this._three = threeEnv.THREE;
      this._renderer = threeEnv.renderer;
      this._scene = threeEnv.scene;
      this._camera = threeEnv.camera;

      // 第4步：生成3D模型
      this.setData({ isGenerating: true });
      const { geometry, material } = ModelGenerator.generate3DModel(
        depthData,
        imageInfo.path,
        { bumpStrength: this.data.bumpStrength }
      );

      // 创建 Mesh 并添加到场景
      const mesh = new this._three.Mesh(geometry, material);
      this._scene.add(mesh);
      this._model = mesh;

      console.log('[Preview] 3D模型已添加到场景');

      // 第5步：开启渲染循环
      this._startRenderLoop();
      this.setData({ isGenerating: false });

      console.log('[Preview] Three.js 初始化完成');

    } catch (err) {
      console.error('[Preview] Three.js 初始化失败:', err);
      this.setData({ isGenerating: false });

      wx.showModal({
        title: '3D初始化失败',
        content: err.message || '请返回重新上传图片',
        showCancel: false,
        success: () => {
          wx.navigateBack();
        }
      });
    }
  },

  /**
   * 获取 WebGL Canvas 对象
   * @returns {Promise<Object>}
   */
  _getCanvas() {
    return new Promise((resolve, reject) => {
      const query = wx.createSelectorQuery();
      query.select('#webglCanvas')
        .node()
        .exec((res) => {
          if (res && res[0] && res[0].node) {
            resolve(res[0].node);
          } else {
            // 降级尝试：普通 Canvas 选择器
            query.select('#webglCanvas')
              .fields({ node: true, size: true })
              .exec((res2) => {
                if (res2 && res2[0] && res2[0].node) {
                  resolve(res2[0].node);
                } else {
                  reject(new Error('Canvas 节点未找到'));
                }
              });
          }
        });
    });
  },

  // ==================== 渲染循环 ====================

  /** 启动渲染循环 */
  _startRenderLoop() {
    if (this._animFrameId) return; // 防止重复启动
    this._animFrameId = THREE_ADAPTER.startRenderLoop(
      this._renderer,
      this._scene,
      this._camera,
      { fps: 60 }
    );
  },

  /** 停止渲染循环 */
  _stopRenderLoop() {
    if (this._animFrameId) {
      THREE_ADAPTER.stopRenderLoop(this._animFrameId);
      this._animFrameId = null;
    }
  },

  // ==================== 触摸交互事件 ====================

  /**
   * 触摸开始：记录起始位置，判断手势类型
   */
  onTouchStart(e) {
    const touches = e.touches;

    if (touches.length === 1) {
      // 单指：默认旋转，长按可平移
      this._touchState.startX = touches[0].clientX;
      this._touchState.startY = touches[0].clientY;
      this._touchState.lastX = touches[0].clientX;
      this._touchState.lastY = touches[0].clientY;
      this._touchState.isRotating = true;
      this._touchState.isPanning = false;
    } else if (touches.length === 2) {
      // 双指：缩放
      this._touchState.isRotating = false;
      this._touchState.isPanning = false;
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      this._touchState.lastDistance = Math.sqrt(dx * dx + dy * dy);
      this._touchState.initialDistance = this._touchState.lastDistance;
    }
  },

  /**
   * 触摸移动：处理旋转/缩放/平移
   */
  onTouchMove(e) {
    const touches = e.touches;
    const state = this._touchState;

    if (touches.length === 1 && state.isRotating) {
      // 单指旋转
      const deltaX = touches[0].clientX - state.lastX;
      const deltaY = touches[0].clientY - state.lastY;

      THREE_ADAPTER.handleRotate(this._camera, deltaX, deltaY);

      state.lastX = touches[0].clientX;
      state.lastY = touches[0].clientY;
    } else if (touches.length === 2) {
      // 双指缩放
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);

      if (state.lastDistance > 0) {
        const scale = currentDistance / state.lastDistance;
        THREE_ADAPTER.handleZoom(this._camera, scale);
        // 更新相机距离显示
        this.setData({
          cameraDistance: Math.round(this._camera.position.z * 10) / 10
        });
      }

      state.lastDistance = currentDistance;
    }
  },

  /**
   * 触摸结束：重置手势状态
   */
  onTouchEnd(e) {
    this._touchState.isRotating = false;
    this._touchState.isPanning = false;
    this._touchState.lastDistance = 0;
  },

  // ==================== 控制栏事件 ====================

  /**
   * 凹凸强度调节
   * 重新生成模型几何体（应用新的凹凸强度）
   */
  onBumpChange(e) {
    const newStrength = parseFloat(e.detail.value);
    this.setData({ bumpStrength: newStrength });

    // 防抖：延迟更新模型
    if (this._bumpTimer) clearTimeout(this._bumpTimer);
    this._bumpTimer = setTimeout(() => {
      this._updateModelBumpStrength(newStrength);
    }, 200);
  },

  /**
   * 更新模型凹凸强度
   * 重建几何体以应用新的深度位移
   */
  _updateModelBumpStrength(strength) {
    if (!this._model || !this._three) return;

    const app = getApp();
    const { depthData, imageInfo } = app.globalData;
    if (!depthData || !imageInfo) return;

    // 移除旧模型
    this._scene.remove(this._model);
    if (this._model.geometry) this._model.geometry.dispose();
    if (this._model.material) {
      if (this._model.material.map) this._model.material.map.dispose();
      this._model.material.dispose();
    }

    // 生成新模型
    const { geometry, material } = ModelGenerator.generate3DModel(
      depthData,
      imageInfo.path,
      { bumpStrength: strength }
    );

    const mesh = new this._three.Mesh(geometry, material);
    this._scene.add(mesh);
    this._model = mesh;

    // 保存设置
    app.globalData.settings.bumpStrength = strength;
  },

  /**
   * 切换渲染模式：实体 ↔ 线框
   */
  onToggleRenderMode() {
    if (!this._model || !this._three) return;

    const newMode = this.data.renderMode === 'solid' ? 'wireframe' : 'solid';

    if (newMode === 'wireframe') {
      // 切换到线框模式
      this._model.material.wireframe = true;
      this._model.material.color.set(0x4da6ff);
      this._model.material.opacity = 0.6;
      this._model.material.transparent = true;
    } else {
      // 切换到实体模式
      this._model.material.wireframe = false;
      this._model.material.color.set(0xffffff);
      this._model.material.opacity = 1;
      this._model.material.transparent = false;
    }

    this._model.material.needsUpdate = true;

    this.setData({ renderMode: newMode });
    getApp().globalData.settings.renderMode = newMode;
  },

  /**
   * 打开背景色选择弹窗
   */
  onChangeBgColor() {
    this.setData({ showBgColorModal: true });
  },

  /**
   * 选择背景色
   */
  onSelectBgColor(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({ bgColor: color });
  },

  /**
   * 确认背景色
   */
  onConfirmBgColor() {
    this.setData({ showBgColorModal: false });
    THREE_ADAPTER.updateBackgroundColor(this._renderer, this.data.bgColor);
    getApp().globalData.settings.bgColor = this.data.bgColor;
  },

  /**
   * 取消背景色选择
   */
  onCancelBgColor() {
    this.setData({ showBgColorModal: false });
  },

  // ==================== 导出功能 ====================

  /**
   * 导出GLB格式3D模型
   */
  async onExportGLB() {
    if (!this._scene || !this._three) {
      wx.showToast({ title: '场景未就绪', icon: 'error' });
      return;
    }

    wx.showLoading({ title: '导出中...' });

    try {
      const result = await ExportUtil.exportGLB(this._scene, this._three);
      wx.hideLoading();

      this.setData({
        showExportModal: true,
        exportMessage: `文件已保存: ${result.fileName}`
      });

      // 提供分享选项
      wx.showActionSheet({
        itemList: ['分享给好友', '仅保存'],
        success: (res) => {
          if (res.tapIndex === 0) {
            ExportUtil.shareGLBFile(result.filePath);
          }
        }
      });
    } catch (err) {
      wx.hideLoading();
      console.error('[Preview] GLB导出失败:', err);
      wx.showToast({ title: '导出失败，请重试', icon: 'error' });
    }
  },

  /**
   * 保存模型预览截图到相册
   */
  async onSaveScreenshot() {
    if (!this._renderer) {
      wx.showToast({ title: '渲染器未就绪', icon: 'error' });
      return;
    }

    // 检查相册权限
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.writePhotosAlbum'] === false) {
          wx.showModal({
            title: '需要相册权限',
            content: '保存截图需要访问相册权限',
            confirmText: '去授权',
            success: (modalRes) => {
              if (modalRes.confirm) wx.openSetting();
            }
          });
          return;
        }

        wx.showLoading({ title: '保存中...' });
        ExportUtil.saveScreenshot(this._renderer)
          .then(() => {
            wx.hideLoading();
            this.setData({
              showExportModal: true,
              exportMessage: '截图已保存到手机相册'
            });
          })
          .catch((err) => {
            wx.hideLoading();
            console.error('[Preview] 截图保存失败:', err);
          });
      }
    });
  },

  // ==================== 弹窗事件 ====================

  /** 关闭导出弹窗 */
  onCloseExportModal() {
    this.setData({ showExportModal: false });
  },

  // ==================== 导航 ====================

  /** 返回首页 */
  onBack() {
    wx.navigateBack();
  },

  // ==================== 资源清理 ====================

  /**
   * 释放所有 Three.js 资源
   * 防止 GPU 内存泄漏和页面卡顿
   */
  _cleanup() {
    console.log('[Preview] 开始清理资源...');

    // 停止渲染循环
    this._stopRenderLoop();

    // 清理定时器
    if (this._bumpTimer) {
      clearTimeout(this._bumpTimer);
      this._bumpTimer = null;
    }

    // 释放 Three.js 资源
    if (this._scene && this._model) {
      this._scene.remove(this._model);
      if (this._model.geometry) this._model.geometry.dispose();
      if (this._model.material) {
        if (this._model.material.map) this._model.material.map.dispose();
        this._model.material.dispose();
      }
    }

    if (this._renderer) {
      this._renderer.dispose();
      this._renderer = null;
    }

    this._scene = null;
    this._camera = null;
    this._model = null;
    this._three = null;

    console.log('[Preview] 资源清理完成');
  }
});