/**
 * depthGenerator.js - AI图像深度识别算法
 * 功能：读取图片像素色彩、轮廓、明暗光影，自动生成深度贴图
 *
 * 算法原理（纯前端像素级处理，无需网络）：
 * 1. 灰度转换：提取亮度通道 L = 0.299R + 0.587G + 0.114B
 * 2. 边缘检测：使用 Sobel 算子检测物体轮廓边缘
 * 3. 深度合成：亮度 + 边缘信息 → 深度值映射
 *    - 亮部视为近景（深度值大）
 *    - 暗部视为远景（深度值小）
 *    - 边缘区域做深度过渡增强
 * 4. 高斯模糊：平滑深度图，减少锯齿噪声
 * 5. 归一化：映射到 0~1 范围，用于3D网格顶点位移
 */

const DepthGenerator = {
  /** 分析分辨率（平衡精度与性能） */
  ANALYSIS_SIZE: 256,

  /**
   * 主入口：从图片路径生成深度图
   *
   * @param {string} imagePath - 压缩后的图片路径
   * @param {number} imgWidth - 图片宽度
   * @param {number} imgHeight - 图片高度
   * @returns {Promise<Float32Array>} 深度数据数组（长度 = width * height，值范围 0~1）
   */
  async generate(imagePath, imgWidth, imgHeight) {
    console.log('[DepthGenerator] 开始生成深度图...');

    // 计算分析尺寸（保持宽高比，限制最大分辨率）
    const ratio = Math.min(1, this.ANALYSIS_SIZE / Math.max(imgWidth, imgHeight));
    const w = Math.max(4, Math.round(imgWidth * ratio));
    const h = Math.max(4, Math.round(imgHeight * ratio));

    console.log(`[DepthGenerator] 分析分辨率: ${w}x${h}`);

    // 第1步：读取像素数据
    const imageData = await this._readPixels(imagePath, w, h);

    // 第2步：提取灰度图
    const grayData = this._toGrayscale(imageData, w, h);

    // 第3步：Sobel 边缘检测
    const edgeData = this._sobelEdgeDetection(grayData, w, h);

    // 第4步：合成深度图
    const depthData = this._composeDepth(grayData, edgeData, w, h);

    // 第5步：高斯模糊平滑
    const smoothedData = this._gaussianBlur(depthData, w, h, 2);

    // 第6步：归一化到 0~1
    const normalizedData = this._normalize(smoothedData);

    console.log('[DepthGenerator] 深度图生成完成');
    return {
      data: normalizedData,
      width: w,
      height: h
    };
  },

  /**
   * 读取图片像素数据（RGBA格式）
   * @returns {Promise<Uint8ClampedArray>}
   */
  _readPixels(imagePath, w, h) {
    return new Promise((resolve, reject) => {
      const canvas = wx.createOffscreenCanvas({ type: '2d', width: w, height: h });
      const ctx = canvas.getContext('2d');
      const img = canvas.createImage();

      img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        resolve(imageData.data);
      };
      img.onerror = reject;
      img.src = imagePath;
    });
  },

  /**
   * RGB → 灰度转换
   * 公式：Gray = 0.299*R + 0.587*G + 0.114*B
   *
   * @param {Uint8ClampedArray} pixels - RGBA 像素数据
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @returns {Float32Array} 灰度值数组（0~255）
   */
  _toGrayscale(pixels, w, h) {
    const len = w * h;
    const gray = new Float32Array(len);

    for (let i = 0; i < len; i++) {
      const offset = i * 4; // RGBA 四个通道
      const r = pixels[offset];
      const g = pixels[offset + 1];
      const b = pixels[offset + 2];
      // 加权亮度公式（人眼感知权重）
      gray[i] = 0.299 * r + 0.587 * g + 0.114 * b;
    }

    return gray;
  },

  /**
   * Sobel 边缘检测算子
   * 检测水平和垂直方向的梯度变化，识别物体轮廓
   *
   * 卷积核：
   *   Gx = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]
   *   Gy = [[-1,-2,-1], [ 0, 0, 0], [ 1, 2, 1]]
   *
   * @param {Float32Array} gray - 灰度数据
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @returns {Float32Array} 边缘强度数据
   */
  _sobelEdgeDetection(gray, w, h) {
    const edge = new Float32Array(w * h);

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;

        // 获取 3x3 邻域像素
        const tl = gray[(y - 1) * w + (x - 1)];
        const t  = gray[(y - 1) * w + x];
        const tr = gray[(y - 1) * w + (x + 1)];
        const l  = gray[y * w + (x - 1)];
        const r  = gray[y * w + (x + 1)];
        const bl = gray[(y + 1) * w + (x - 1)];
        const b  = gray[(y + 1) * w + x];
        const br = gray[(y + 1) * w + (x + 1)];

        // Sobel X 方向梯度（检测垂直边缘）
        const gx = -tl + tr - 2 * l + 2 * r - bl + br;
        // Sobel Y 方向梯度（检测水平边缘）
        const gy = -tl - 2 * t - tr + bl + 2 * b + br;

        // 梯度幅值 = sqrt(gx² + gy²)
        edge[idx] = Math.sqrt(gx * gx + gy * gy);
      }
    }

    return edge;
  },

  /**
   * 合成深度图
   * 将灰度亮度信息与边缘检测信息融合
   *
   * 策略：
   *  - 亮度高的区域 → 更近（深度值更大）
   *  - 边缘区域 → 添加深度过渡，增强立体感
   *  - 底部区域 → 略微降低深度（模拟地面透视）
   *
   * @param {Float32Array} gray - 灰度数据
   * @param {Float32Array} edge - 边缘强度数据
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @returns {Float32Array} 合成深度数据
   */
  _composeDepth(gray, edge, w, h) {
    const depth = new Float32Array(w * h);

    // 先归一化边缘数据
    let edgeMax = 0;
    for (let i = 0; i < edge.length; i++) {
      if (edge[i] > edgeMax) edgeMax = edge[i];
    }

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = y * w + x;

        // 亮度分量：亮部=近景，值越大越近
        const luminance = gray[idx] / 255.0;

        // 边缘分量：边缘处增加深度变化
        const edgeVal = edgeMax > 0 ? edge[idx] / edgeMax : 0;

        // 底部权重：图片底部略微降低深度，模拟地面透视
        const bottomWeight = 1.0 - 0.15 * (y / h);

        // 合成公式：70%亮度 + 25%边缘 + 底部修正
        depth[idx] = luminance * 0.7 + edgeVal * 0.25;
        depth[idx] *= bottomWeight;

        // 边缘区域额外增强深度变化
        if (edgeVal > 0.3) {
          // 边缘像素：根据亮度决定是凸起还是凹陷
          depth[idx] += (luminance > 0.5 ? 0.08 : -0.05) * edgeVal;
        }
      }
    }

    return depth;
  },

  /**
   * 高斯模糊（简化版，可分离卷积）
   * 用于平滑深度图，减少像素级噪声
   *
   * 使用 3x3 高斯核（sigma ≈ 0.8）：
   *   [1, 2, 1]
   *   [2, 4, 2] / 16
   *   [1, 2, 1]
   *
   * @param {Float32Array} data - 输入数据
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {number} passes - 模糊次数（1~3）
   * @returns {Float32Array} 平滑后的数据
   */
  _gaussianBlur(data, w, h, passes = 2) {
    let src = new Float32Array(data);
    let dst = new Float32Array(w * h);

    for (let pass = 0; pass < passes; pass++) {
      // 水平方向模糊
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = y * w + x;
          if (x === 0 || x === w - 1) {
            dst[idx] = src[idx];
          } else {
            dst[idx] = (src[idx - 1] + 2 * src[idx] + src[idx + 1]) / 4;
          }
        }
      }

      // 交换缓冲区
      [src, dst] = [dst, src];

      // 垂直方向模糊
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = y * w + x;
          if (y === 0 || y === h - 1) {
            dst[idx] = src[idx];
          } else {
            dst[idx] = (src[(y - 1) * w + x] + 2 * src[idx] + src[(y + 1) * w + x]) / 4;
          }
        }
      }
      [src, dst] = [dst, src];
    }

    return src;
  },

  /**
   * 归一化：将数据映射到 0~1 范围
   *
   * @param {Float32Array} data
   * @returns {Float32Array}
   */
  _normalize(data) {
    let min = Infinity;
    let max = -Infinity;

    // 找出最小值和最大值
    for (let i = 0; i < data.length; i++) {
      if (data[i] < min) min = data[i];
      if (data[i] > max) max = data[i];
    }

    const range = max - min || 1;
    const result = new Float32Array(data.length);

    // 映射到 0~1
    for (let i = 0; i < data.length; i++) {
      result[i] = (data[i] - min) / range;
    }

    return result;
  }
};

module.exports = DepthGenerator;