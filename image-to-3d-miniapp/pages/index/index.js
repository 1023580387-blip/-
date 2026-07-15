/**
 * index.js - 首页上传页面逻辑
 * 功能：拍照/相册选择图片 → 图片压缩 → 深度图生成 → 3D模型生成 → 跳转预览页
 */
const ImageCompressor = require('../../utils/imageCompressor');
const DepthGenerator = require('../../utils/depthGenerator');

Page({
  data: {
    // 加载状态
    isLoading: false,
    loadingText: '正在处理图片...',
    // 新手引导弹窗
    showGuide: false
  },

  // ==================== 生命周期 ====================
  onLoad() {
    // 检查是否首次启动，显示新手引导
    const app = getApp();
    if (app.globalData.isFirstLaunch) {
      this.setData({ showGuide: true });
      app.globalData.isFirstLaunch = false;
    }
  },

  onShow() {
    // 每次回到首页重置状态
    this.setData({ isLoading: false });
  },

  // ==================== 拍照上传 ====================
  /**
   * 调用系统相机拍摄
   * 流程：拍照 → 压缩 → 深度图 → 3D模型 → 跳转
   */
  onTakePhoto() {
    // 先检查相机权限
    wx.authorize({
      scope: 'scope.camera',
      success: () => this._doTakePhoto(),
      fail: () => {
        // 权限未授权，引导用户开启
        wx.showModal({
          title: '需要相机权限',
          content: '请在设置中允许使用相机来拍摄照片',
          confirmText: '去授权',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting();
            }
          }
        });
      }
    });
  },

  /** 执行拍照 */
  _doTakePhoto() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'],
      sizeType: ['original'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this._processImage(tempFilePath);
      },
      fail: (err) => {
        if (err.errMsg.indexOf('cancel') === -1) {
          console.error('[Index] 拍照失败:', err);
          wx.showToast({ title: '拍照失败', icon: 'error' });
        }
      }
    });
  },

  // ==================== 相册上传 ====================
  /**
   * 从相册选择图片
   * 流程：选图 → 压缩 → 深度图 → 3D模型 → 跳转
   */
  onChooseAlbum() {
    // 先检查相册权限（写入权限在保存截图时再检查）
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      success: () => this._doChooseAlbum(),
      fail: () => {
        // 相册权限未授权也允许选择（读取不需要scope.writePhotosAlbum）
        this._doChooseAlbum();
      }
    });
  },

  /** 执行相册选择 */
  _doChooseAlbum() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      sizeType: ['original'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this._processImage(tempFilePath);
      },
      fail: (err) => {
        if (err.errMsg.indexOf('cancel') === -1) {
          console.error('[Index] 选图失败:', err);
          wx.showToast({ title: '选择图片失败', icon: 'error' });
        }
      }
    });
  },

  // ==================== 图片处理流程 ====================
  /**
   * 核心处理流程：压缩 → 深度图 → 跳转预览页
   * @param {string} imagePath - 原始图片路径
   */
  async _processImage(imagePath) {
    // 显示加载遮罩
    this.setData({
      isLoading: true,
      loadingText: '正在压缩图片...'
    });

    try {
      // 步骤1：图片压缩（自适应分辨率，防止内存溢出）
      const compressed = await ImageCompressor.compress(imagePath);
      console.log('[Index] 压缩完成:', compressed);

      this.setData({ loadingText: '正在分析深度信息...' });

      // 步骤2：生成深度图（AI像素分析算法）
      const depthResult = await DepthGenerator.generate(
        compressed.path,
        compressed.width,
        compressed.height
      );
      console.log('[Index] 深度图生成完成, 数据量:', depthResult.data.length);

      this.setData({ loadingText: '正在生成3D模型...' });

      // 步骤3：存储数据到全局，跳转预览页
      const app = getApp();
      app.globalData.imageInfo = {
        path: compressed.path,
        width: compressed.width,
        height: compressed.height
      };
      app.globalData.depthData = depthResult;

      // 隐藏加载遮罩
      this.setData({ isLoading: false });

      // 跳转到3D预览页
      wx.navigateTo({
        url: '/pages/preview/preview',
        success: () => {
          console.log('[Index] 跳转预览页成功');
        },
        fail: (err) => {
          console.error('[Index] 跳转失败:', err);
          wx.showToast({ title: '页面跳转失败', icon: 'error' });
        }
      });

    } catch (err) {
      console.error('[Index] 图片处理失败:', err);
      this.setData({ isLoading: false });

      // 根据错误类型给出不同提示
      let errorMsg = '处理失败，请重试';
      if (err.errMsg && err.errMsg.indexOf('memory') !== -1) {
        errorMsg = '图片过大，请选择较小的图片';
      } else if (err.errMsg && err.errMsg.indexOf('format') !== -1) {
        errorMsg = '图片格式不支持，请选择 JPG/PNG 格式';
      }

      wx.showModal({
        title: '处理失败',
        content: errorMsg,
        showCancel: false
      });
    }
  },

  // ==================== 新手引导弹窗 ====================
  /** 关闭新手引导弹窗 */
  onCloseGuide() {
    this.setData({ showGuide: false });
  }
});