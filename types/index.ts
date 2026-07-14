export interface PlanetData {
  id: string;
  name: string;
  orbitIndex: number;
  radius: number;
  color: string;
  angle: number;
  speed: number;
  data?: {
    computingPower: number;
    dataFlow: number;
    coordinates: string;
  };
}

export interface ComputingData {
  id: string;
  planetName: string;
  computingPower: number;
  dataFlow: number;
  timestamp: number;
}

export interface OrbitData {
  id: string;
  orbitName: string;
  distance: number;
  speed: number;
  status: 'active' | 'inactive' | 'maintenance';
}

export interface ArchiveData {
  id: string;
  timestamp: number;
  title: string;
  description: string;
  category: string;
}
