// 星球数据
export interface Planet {
  id: string;
  name: string;
  nameEn: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  color: string;
  glowColor: string;
  description: string;
  data: {
    epoch: string;
    coordinates: string;
    mass: string;
    temperature: string;
    atmosphere: string;
    gravity: string;
  };
}

// 轨道数据
export interface Orbit {
  id: string;
  radius: number;
  speed: number;
  planets: Planet[];
  label?: string;
  distance?: string;
}

// 档案节点
export interface ArchiveNode {
  id: string;
  epoch: string;
  title: string;
  description: string;
  timestamp: string;
  miniGalaxy: {
    planets: number;
    orbits: number;
  };
}

// 画布状态
export interface CanvasState {
  scale: number;
  offsetX: number;
  offsetY: number;
  selectedPlanet: Planet | null;
  hoveredPlanet: Planet | null;
}

// 星系配置
export interface GalaxyConfig {
  orbits: Orbit[];
  centerPlanet?: Planet;
}
