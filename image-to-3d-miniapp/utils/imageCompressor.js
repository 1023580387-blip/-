/**
 * imageCompressor.js - 图片压缩工具
 * 功能：图片分辨率自适应压缩、格式转换、Canvas 像素读取
 *
 * 压缩策略：
 *  - 最大分辨率限制：2048px（平衡3D精度与内存）
 *  - 低性能设备：1024px（防止内存溢出导致闪退）
 *  - 高质量JPEG压缩：quality 0.85
 *  - 保留原始图片用于纹理映射
 */

const IMAGE_COMPRESSOR = {
  /** 最大分辨率限制（高端设备） */
  MAX_SIZE_HIGH: 2048,
  /** 最大分辨率限制（低端设备） */
  MAX_SIZE_LOW: 1024,
  /** 压缩质量 0~1 */
  QUALITY: 0.85,

  /**
   * 判断是否为低性能设备
   * 通过屏幕像素比和系统平台粗略判断
   * @returns {boolean}
   */
  _isLowPerformance() {
    const sysInfo = getApp().globalData.systemInfo || {};
    // 低像素比设备 或 低版本安卓
    if (sysInfo.pixelRatio && sysInfo.pixelRatio < 2) return true;
    if (sysInfo.platform === 'android' && sysInfo.system) {
      const version = parseFloat(sysInfo.system.split(' ')[0]);
      if (version < 8) return true;
    }
    return false;
  },

  /**
   * 获取当前设备的最大允许分辨率
   * @returns {number}
   */
  getMaxSize() {
    return this._isLowPerformance() ? this.MAX_SIZE_LOW : this.MAX_SIZE_HIGH;
  },

  /**
   * 主入口：压缩图片
   * 流程：选择图片 → 获取图片信息 → Canvas压缩 → 输出压缩后路径
   *
   * @param {string} srcPath - 原始图片路径
   * @returns {Promise<{path: string, width: number, height: number}>}
   */
  async compress(srcPath) {
    console.log('[ImageCompressor] 开始压缩:', srcPath);

    // 第1步：获取图片原始信息
    const imageInfo = await this._getImageInfo(srcPath);
    const { width: origW, height: origH } = imageInfo;

    // 第2步：计算目标尺寸（等比缩放，不超过最大分辨率）
    const maxSize = this.getMaxSize();
    let targetW = origW;
    let targetH = origH;

    if (origW > maxSize || origH > maxSize) {
      const ratio = Math.min(maxSize / origW, maxSize / origH);
      targetW = Math.round(origW * ratio);
      targetH = Math.round(origH * ratio);
      console.log(`[ImageCompressor] 缩放: ${origW}x${origH} → ${targetW}x${targetH}`);
    } else {
      console.log(`[ImageCompressor] 无需缩放: ${origW}x${origH}`);
    }

    // 第3步：使用 Canvas 进行压缩绘制
    const compressedPath = await this._canvasCompress(srcPath, targetW, targetH);

    return {
      path: compressedPath,
      width: targetW,
      height: targetH
    };
  },

  /**
   * 获取图片信息（宽高、路径）
   * @param {string} src
   * @returns {Promise<{width: number, height: number, path: string}>}
   */
  _getImageInfo(src) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src,
        success: (res) => {
          resolve({
            width: res.width,
            height: res.height,
            path: res.path
          });
        },
        fail: reject
      });
    });
  },

  /**
   * 使用 OffscreenCanvas 进行图片压缩
   * 利用微信小程序的 Canvas 2D API 实现高质量缩放
   *
   * @param {string} srcPath - 原图路径
   * @param {number} targetW - 目标宽度
   * @param {number} targetH - 目标高度
   * @returns {Promise<string>} 压缩后的临时文件路径
   */
  _canvasCompress(srcPath, targetW, targetH) {
    return new Promise((resolve, reject) => {
      // 创建离屏 Canvas（不占用视图层渲染）
      const query = wx.createSelectorQuery();
      // 使用 OffscreenCanvas 或 创建隐藏的 Canvas 节点
      // 这里用动态创建 Canvas 的方式
      const canvas = wx.createOffscreenCanvas({
        type: '2d',
        width: targetW,
        height: targetH
      });
      const ctx = canvas.getContext('2d');

      // 创建 Image 对象加载图片
      const img = canvas.createImage();
      img.onload = () => {
        // 清空画布
        ctx.clearRect(0, 0, targetW, targetH);
        // 绘制缩放后的图片
        ctx.drawImage(img, 0, 0, targetW, targetH);

        // 将 Canvas 内容导出为临时图片文件
        wx.canvasToTempFilePath({
          canvas,
          x: 0,
          y: 0,
          width: targetW,
          height: targetH,
          destWidth: targetW,
          destHeight: targetH,
          fileType: 'jpg',
          quality: this.QUALITY,
          success: (res) => {
            console.log('[ImageCompressor] 压缩完成:', res.tempFilePath);
            resolve(res.tempFilePath);
          },
          fail: (err) => {
            console.error('[ImageCompressor] 导出失败:', err);
            reject(err);
          }
        });
      };
      img.onerror = (err) => {
        console.error('[ImageCompressor] 图片加载失败:', err);
        reject(err);
      };
      img.src = srcPath;
    });
  },

  /**
   * 读取图片像素数据（用于深度图计算）
   * 通过 Canvas 2D 获取 ImageData
   *
   * @param {string} srcPath - 图片路径
   * @param {number} width - 目标宽度
   * @param {number} height - 目标高度
   * @returns {Promise<ImageData>} 像素数据 {data, width, height}
   */
  async readPixelData(srcPath, width, height) {
    // 控制分析分辨率，避免像素计算开销过大
    const analysisW = Math.min(width, 512);
    const analysisH = Math.min(height, 512);

    return new Promise((resolve, reject) => {
      const canvas = wx.createOffscreenCanvas({
        type: '2d',
        width: analysisW,
        height: analysisH
      });
      const ctx = canvas.getContext('2d');

      const img = canvas.createImage();
      img.onload = () => {
        ctx.clearRect(0, 0, analysisW, analysisH);
        ctx.drawImage(img, 0, 0, analysisW, analysisH);

        // 获取 ImageData 像素数据
        const imageData = ctx.getImageData(0, 0, analysisW, analysisH);
        resolve(imageData);
      };
      img.onerror = reject;
      img.src = srcPath;
    });
  }
};

module.exports = IMAGE_COMPRESSOR;