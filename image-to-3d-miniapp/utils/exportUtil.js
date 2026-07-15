/**
 * exportUtil.js - 导出功能工具
 * 功能：导出GLB格式3D模型文件、保存模型预览截图到手机相册
 *
 * GLB导出原理：
 * 1. 使用 Three.js GLTFExporter 将场景序列化为 GLB 二进制数据
 * 2. 保存为临时文件
 * 3. 通过 wx.shareFileMessage 分享或保存到本地
 *
 * 截图保存原理：
 * 1. 使用 renderer.domElement.toDataURL 获取 base64
 * 2. 写入临时文件
 * 3. 通过 wx.saveImageToPhotosAlbum 保存到相册
 */

const ExportUtil = {
  /**
   * 导出3D模型为 GLB 文件
   *
   * @param {Object} scene - Three.js Scene 对象
   * @param {Object} THREE - Three.js 库引用
   * @returns {Promise<{filePath: string, fileName: string}>}
   */
  exportGLB(scene, THREE) {
    return new Promise((resolve, reject) => {
      console.log('[ExportUtil] 开始导出 GLB...');

      try {
        // 使用 Three.js GLTFExporter
        const exporter = new THREE.GLTFExporter();

        exporter.parse(
          scene,
          // 解析成功回调
          (gltfData) => {
            // gltfData 是 ArrayBuffer（binary 模式）
            if (gltfData instanceof ArrayBuffer) {
              this._saveGLBFile(gltfData, resolve, reject);
            } else {
              // 如果是 JSON 格式，需要额外处理
              console.warn('[ExportUtil] GLTFExporter 返回 JSON 格式，尝试转换...');
              // 将 JSON 转为 ArrayBuffer
              const jsonStr = JSON.stringify(gltfData);
              const buffer = this._stringToArrayBuffer(jsonStr);
              this._saveGLBFile(buffer, resolve, reject);
            }
          },
          // 解析失败回调
          (error) => {
            console.error('[ExportUtil] GLB 导出失败:', error);
            reject(error);
          },
          // 导出选项
          {
            binary: true,           // 二进制 GLB 格式
            embedImages: true,      // 嵌入纹理图片
            animations: [],         // 不导出动画
            onlyVisible: true,      // 仅导出可见对象
            truncateDrawRange: true,
            maxTextureSize: 1024    // 限制纹理大小
          }
        );
      } catch (err) {
        console.error('[ExportUtil] GLB 导出异常:', err);
        reject(err);
      }
    });
  },

  /**
   * 保存 GLB 二进制数据到临时文件
   */
  _saveGLBFile(arrayBuffer, resolve, reject) {
    const fs = wx.getFileSystemManager();
    const timestamp = Date.now();
    const fileName = `3d_model_${timestamp}.glb`;
    const filePath = `${wx.env.USER_DATA_PATH}/${fileName}`;

    try {
      // 写入二进制文件
      fs.writeFile({
        filePath,
        data: arrayBuffer,
        encoding: 'binary',
        success: () => {
          console.log('[ExportUtil] GLB 文件保存成功:', filePath);
          resolve({ filePath, fileName });
        },
        fail: (err) => {
          console.error('[ExportUtil] GLB 文件写入失败:', err);
          reject(err);
        }
      });
    } catch (err) {
      reject(err);
    }
  },

  /**
   * 保存3D模型预览截图到手机相册
   *
   * @param {Object} renderer - Three.js WebGLRenderer
   * @returns {Promise<{tempFilePath: string}>}
   */
  saveScreenshot(renderer) {
    return new Promise((resolve, reject) => {
      console.log('[ExportUtil] 开始保存截图...');

      try {
        // 步骤1：从 WebGL Canvas 获取像素数据
        const canvas = renderer.domElement;

        // 使用 wx.canvasToTempFilePath 导出 Canvas 内容
        wx.canvasToTempFilePath({
          canvas,
          x: 0,
          y: 0,
          width: canvas.width,
          height: canvas.height,
          destWidth: canvas.width,
          destHeight: canvas.height,
          fileType: 'png',
          quality: 1.0,
          success: (res) => {
            // 步骤2：保存到系统相册
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                console.log('[ExportUtil] 截图保存到相册成功');
                wx.showToast({
                  title: '已保存到相册',
                  icon: 'success',
                  duration: 2000
                });
                resolve({ tempFilePath: res.tempFilePath });
              },
              fail: (err) => {
                // 权限问题处理
                if (err.errMsg.includes('auth deny')) {
                  wx.showModal({
                    title: '需要相册权限',
                    content: '保存截图需要访问您的相册，请在设置中授权',
                    confirmText: '去授权',
                    success: (modalRes) => {
                      if (modalRes.confirm) {
                        wx.openSetting();
                      }
                    }
                  });
                }
                reject(err);
              }
            });
          },
          fail: (err) => {
            console.error('[ExportUtil] Canvas 导出失败:', err);
            reject(err);
          }
        });
      } catch (err) {
        console.error('[ExportUtil] 截图保存异常:', err);
        reject(err);
      }
    });
  },

  /**
   * 分享 GLB 文件到微信聊天
   *
   * @param {string} filePath - GLB 文件路径
   */
  shareGLBFile(filePath) {
    wx.shareFileMessage({
      filePath,
      fileName: '3D模型.glb',
      success: () => {
        wx.showToast({ title: '分享成功', icon: 'success' });
      },
      fail: (err) => {
        console.error('[ExportUtil] 分享失败:', err);
        wx.showToast({ title: '分享失败', icon: 'error' });
      }
    });
  },

  /**
   * 字符串转 ArrayBuffer（工具方法）
   */
  _stringToArrayBuffer(str) {
    const buf = new ArrayBuffer(str.length * 2);
    const bufView = new Uint16Array(buf);
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
};

module.exports = ExportUtil;