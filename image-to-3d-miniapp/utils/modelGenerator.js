/**
 * modelGenerator.js - 3D模型生成器
 * 功能：根据深度贴图生成高精度3D网格立体模型
 *
 * 生成原理：
 * 1. 创建平面网格（PlaneGeometry），分割数 = 深度图分辨率
 * 2. 将深度图每个像素值映射为网格顶点的 Z 轴位移
 * 3. 图片作为纹理贴图映射到网格表面
 * 4. 重新计算法线，确保光照正确
 * 5. 输出 Three.js Mesh 对象，可直接渲染
 *
 * 注意：此模块依赖 Three.js 库，需在 libs/ 目录下放置 three.min.js
 */

/**
 * 根据深度图数据生成3D模型
 *
 * @param {Object} depthResult - 深度图结果 { data: Float32Array, width:number, height:number }
 * @param {string} texturePath - 压缩后图片路径（用作纹理）
 * @param {Object} options - 生成选项
 * @param {number} options.bumpStrength - 凹凸强度 0.5~2.0（默认1.0）
 * @param {number} options.segments - 网格细分级别（默认=深度图宽度，上限128）
 * @returns {Object} { geometry, material, textureData }
 */
function generate3DModel(depthResult, texturePath, options = {}) {
  const THREE = require('../libs/three.min.js');
  const { data: depthData, width: dw, height: dh } = depthResult;
  const bumpStrength = options.bumpStrength || 1.0;

  // 网格分辨率：受限于深度图分辨率，同时限制最大顶点数防止性能问题
  const segmentsX = Math.min(dw - 1, 128);
  const segmentsY = Math.min(dh - 1, 128);

  console.log(`[ModelGenerator] 生成3D网格: ${segmentsX}x${segmentsY}, 凹凸强度: ${bumpStrength}`);

  // ========== 第1步：创建平面几何体 ==========
  // PlaneGeometry(width, height, widthSegments, heightSegments)
  // 平面尺寸保持宽高比
  const aspect = dw / dh;
  const planeWidth = 2 * aspect;
  const planeHeight = 2;

  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, segmentsX, segmentsY);

  // ========== 第2步：应用深度位移 ==========
  // 获取顶点位置数组
  const positions = geometry.attributes.position;
  const vertexCount = positions.count;

  // 遍历每个顶点，根据深度图设置 Z 轴位移
  for (let i = 0; i < vertexCount; i++) {
    // PlaneGeometry 顶点在 XY 平面，Z 为法线方向
    const x = positions.getX(i);
    const y = positions.getY(i);

    // 将顶点平面坐标映射到深度图像素坐标
    // 平面坐标范围：[-planeWidth/2, planeWidth/2] x [-planeHeight/2, planeHeight/2]
    const px = Math.round(((x / (planeWidth / 2)) + 1) * 0.5 * (dw - 1));
    const py = Math.round(((y / (planeHeight / 2)) + 1) * 0.5 * (dh - 1));

    // 边界检查
    const clampedX = Math.max(0, Math.min(dw - 1, px));
    const clampedY = Math.max(0, Math.min(dh - 1, py));

    // 从深度图读取深度值（注意：图片Y轴与3D Y轴方向相反）
    const depthIdx = (dh - 1 - clampedY) * dw + clampedX;
    const depthVal = depthData[depthIdx] || 0;

    // 设置 Z 轴位移（深度值 * 凹凸强度）
    // 最大位移量 = 1.0，可根据需要调整
    const maxDisplacement = 0.8;
    positions.setZ(i, depthVal * maxDisplacement * bumpStrength);
  }

  // ========== 第3步：重新计算法线 ==========
  // 顶点位移后需要重新计算法线，确保光照渲染正确
  geometry.computeVertexNormals();

  // ========== 第4步：创建材质 ==========
  // 使用 Phong 材质（支持光照，性能适中）
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,        // 基础色白色（让纹理完全决定颜色）
    specular: 0x222222,     // 镜面反射
    shininess: 20,          // 光泽度
    flatShading: false,     // 平滑着色
    side: THREE.DoubleSide, // 双面渲染（旋转时背面也可见）
    transparent: false
  });

  // ========== 第5步：创建纹理 ==========
  // 使用 Canvas 加载纹理
  const texture = createTextureFromPath(texturePath, THREE);
  material.map = texture;

  console.log('[ModelGenerator] 3D模型生成完成');
  return { geometry, material };
}

/**
 * 从图片路径创建 Three.js 纹理
 * 使用 Canvas 2D 绘制后再转为 Three.js CanvasTexture
 *
 * @param {string} imagePath - 图片路径
 * @param {Object} THREE - Three.js 库引用
 * @returns {THREE.Texture}
 */
function createTextureFromPath(imagePath, THREE) {
  // 创建离屏 Canvas 用于加载图片
  const canvas = wx.createOffscreenCanvas({ type: '2d', width: 512, height: 512 });
  const ctx = canvas.getContext('2d');
  const img = canvas.createImage();

  // 同步加载图片（Three.js 纹理需要立即可用）
  // 注意：小程序中图片加载是异步的，这里使用同步方式的变通
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // 异步加载实际纹理数据
  img.onload = () => {
    const scale = Math.min(512 / img.width, 512 / img.height);
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const dx = (512 - w) / 2;
    const dy = (512 - h) / 2;

    ctx.clearRect(0, 0, 512, 512);
    ctx.drawImage(img, dx, dy, w, h);
    texture.needsUpdate = true; // 标记纹理需要更新
  };
  img.src = imagePath;

  return texture;
}

/**
 * 创建线框材质（用于线框/实体渲染模式切换）
 * @param {Object} THREE
 * @returns {THREE.Material}
 */
function createWireframeMaterial(THREE) {
  return new THREE.MeshBasicMaterial({
    color: 0x4da6ff,
    wireframe: true,
    transparent: true,
    opacity: 0.6
  });
}

/**
 * 创建纯色实体材质（无纹理）
 * @param {Object} THREE
 * @returns {THREE.Material}
 */
function createSolidMaterial(THREE) {
  return new THREE.MeshPhongMaterial({
    color: 0xcccccc,
    specular: 0x333333,
    shininess: 30,
    flatShading: false,
    side: THREE.DoubleSide
  });
}

module.exports = {
  generate3DModel,
  createTextureFromPath,
  createWireframeMaterial,
  createSolidMaterial
};