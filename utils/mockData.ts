import { PlanetData, ComputingData, OrbitData, ArchiveData } from '@/types';

export function generatePlanets(): PlanetData[] {
  const planetNames = [
    'Nexus-7', 'Cyberion', 'Neon Prime', 'Quantum X', 'Void Walker',
    'Data Sphere', 'Pulse Node', 'Grid Master', 'Echo Chamber', 'Flux Core'
  ];
  
  const colors = ['#00e5ff', '#ff2b86', '#a855f7', '#00ff88', '#ffaa00'];
  
  return planetNames.map((name, index) => ({
    id: `planet-${index}`,
    name,
    orbitIndex: Math.floor(index / 3),
    radius: 15 + Math.random() * 20,
    color: colors[index % colors.length],
    angle: (index * 36) * (Math.PI / 180),
    speed: 0.0005 + Math.random() * 0.001,
    data: {
      computingPower: Math.floor(Math.random() * 10000),
      dataFlow: Math.floor(Math.random() * 5000),
      coordinates: `${(Math.random() * 100).toFixed(2)}, ${(Math.random() * 100).toFixed(2)}`,
    },
  }));
}

export function generateComputingData(): ComputingData[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `compute-${i}`,
    planetName: `Planet-${i % 10}`,
    computingPower: Math.floor(Math.random() * 10000),
    dataFlow: Math.floor(Math.random() * 5000),
    timestamp: Date.now() - i * 3600000,
  }));
}

export function generateOrbitData(): OrbitData[] {
  const orbitNames = ['Alpha Route', 'Beta Path', 'Gamma Lane', 'Delta Track', 'Epsilon Way'];
  const statuses: Array<'active' | 'inactive' | 'maintenance'> = ['active', 'inactive', 'maintenance'];
  
  return orbitNames.map((name, index) => ({
    id: `orbit-${index}`,
    orbitName: name,
    distance: Math.floor(Math.random() * 10000),
    speed: Math.floor(Math.random() * 1000),
    status: statuses[index % statuses.length],
  }));
}

export function generateArchiveData(): ArchiveData[] {
  const categories = ['Discovery', 'Event', 'Anomaly', 'Mission'];
  
  return Array.from({ length: 15 }, (_, i) => ({
    id: `archive-${i}`,
    timestamp: Date.now() - i * 86400000 * 7,
    title: `Archive Entry ${i + 1}`,
    description: `Detailed description of archive entry ${i + 1}. This contains important historical data.`,
    category: categories[i % categories.length],
  }));
}
