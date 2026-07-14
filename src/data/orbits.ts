import { Orbit } from '@/types';
import { planets } from './planets';

export const orbits: Orbit[] = [
  {
    id: 'orbit-1',
    radius: 120,
    speed: 0.0008,
    planets: [planets[0]],
    label: '内环航道',
    distance: '1.2 AU',
  },
  {
    id: 'orbit-2',
    radius: 200,
    speed: 0.0005,
    planets: [planets[1]],
    label: '中环航道',
    distance: '2.8 AU',
  },
  {
    id: 'orbit-3',
    radius: 280,
    speed: 0.0003,
    planets: [planets[2]],
    label: '外环航道',
    distance: '4.5 AU',
  },
  {
    id: 'orbit-4',
    radius: 160,
    speed: 0.0006,
    planets: [planets[3]],
    label: '近卫航道',
    distance: '1.8 AU',
  },
  {
    id: 'orbit-5',
    radius: 340,
    speed: 0.0002,
    planets: [planets[4]],
    label: '远航航道',
    distance: '6.2 AU',
  },
  {
    id: 'orbit-6',
    radius: 240,
    speed: 0.0004,
    planets: [planets[5]],
    label: '极光航道',
    distance: '3.6 AU',
  },
];
