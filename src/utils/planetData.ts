export interface PlanetData {
  id: string;
  name: string;
  type: 'terrestrial' | 'gas-giant' | 'ice' | 'dwarf';
  orbitRadius: number;
  size: number;
  orbitSpeed: number;
  rotationSpeed: number;
  color: string;
  glowColor: string;
  angle: number;
  info: {
    diameter: string;
    temperature: string;
    gravity: string;
    description: string;
  };
}

export interface GalaxyState {
  rotation: { x: number; y: number };
  zoom: number;
  hoveredPlanet: string | null;
  isDragging: boolean;
  dragStart: { x: number; y: number };
}

export interface TimeData {
  starDate: string;
  cosmicCoordinate: string;
  timezone: string;
  localTime: string;
}

export const planets: PlanetData[] = [
  {
    id: 'kepler-1',
    name: 'KEPLER-186F',
    type: 'terrestrial',
    orbitRadius: 120,
    size: 28,
    orbitSpeed: 0.15,
    rotationSpeed: 0.8,
    color: '#4FC3F7',
    glowColor: 'rgba(79, 195, 247, 0.4)',
    angle: 0,
    info: {
      diameter: '14,238 km',
      temperature: '-48°C',
      gravity: '1.12 g',
      description: '位于宜居带的地球姊妹星，表面覆盖液态海洋与冰层交错的大陆。',
    },
  },
  {
    id: 'kepler-2',
    name: 'NOVA-PRIME',
    type: 'gas-giant',
    orbitRadius: 200,
    size: 45,
    orbitSpeed: 0.08,
    rotationSpeed: 0.5,
    color: '#7C4DFF',
    glowColor: 'rgba(124, 77, 255, 0.4)',
    angle: 1.2,
    info: {
      diameter: '142,984 km',
      temperature: '-145°C',
      gravity: '2.53 g',
      description: '巨型气态行星，拥有超过67颗卫星，大气层富含氦与甲烷。',
    },
  },
  {
    id: 'kepler-3',
    name: 'AURORA-7B',
    type: 'ice',
    orbitRadius: 290,
    size: 22,
    orbitSpeed: 0.05,
    rotationSpeed: 0.6,
    color: '#B0BEC5',
    glowColor: 'rgba(176, 190, 197, 0.35)',
    angle: 2.5,
    info: {
      diameter: '8,452 km',
      temperature: '-210°C',
      gravity: '0.38 g',
      description: '冰封世界，表面覆盖数公里厚的冰层，地下存在液态海洋。',
    },
  },
  {
    id: 'kepler-4',
    name: 'EMBER-V',
    type: 'terrestrial',
    orbitRadius: 160,
    size: 32,
    orbitSpeed: 0.12,
    rotationSpeed: 0.7,
    color: '#FF6B6B',
    glowColor: 'rgba(255, 107, 107, 0.35)',
    angle: 4.0,
    info: {
      diameter: '18,920 km',
      temperature: '462°C',
      gravity: '0.91 g',
      description: '活跃火山行星，表面遍布熔岩河流，大气层主要由二氧化碳构成。',
    },
  },
  {
    id: 'kepler-5',
    name: 'NEBULA-X9',
    type: 'dwarf',
    orbitRadius: 350,
    size: 14,
    orbitSpeed: 0.04,
    rotationSpeed: 1.2,
    color: '#FFD93D',
    glowColor: 'rgba(255, 217, 61, 0.3)',
    angle: 5.5,
    info: {
      diameter: '2,376 km',
      temperature: '-230°C',
      gravity: '0.06 g',
      description: '矮行星，轨道高度椭圆，周期穿越星云区域，表面富含有机分子。',
    },
  },
  {
    id: 'kepler-6',
    name: 'CRYSTALIS',
    type: 'ice',
    orbitRadius: 240,
    size: 18,
    orbitSpeed: 0.06,
    rotationSpeed: 0.9,
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.35)',
    angle: 3.0,
    info: {
      diameter: '6,180 km',
      temperature: '-185°C',
      gravity: '0.55 g',
      description: '结晶行星，表面由巨大水晶结构覆盖，折射出绚丽光谱。',
    },
  },
];

export const orbitalRings = [
  { radius: 120, speed: 0.15, opacity: 0.15 },
  { radius: 160, speed: 0.12, opacity: 0.12 },
  { radius: 200, speed: 0.08, opacity: 0.1 },
  { radius: 240, speed: 0.06, opacity: 0.08 },
  { radius: 290, speed: 0.05, opacity: 0.06 },
  { radius: 350, speed: 0.04, opacity: 0.05 },
];