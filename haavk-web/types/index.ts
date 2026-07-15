export interface TechItem {
  id: string;
  name: string;
  category: 'supercomputing' | 'satellite' | 'brain_computer' | 'aerospace' | 'energy' | 'defense';
  classification: 'public' | 'restricted' | 'classified';
  region: string;
  params: { label: string; value: string }[];
  description: string;
  cgPrompt: string;
  projects: string[];
}

export interface Equipment {
  id: string;
  name: string;
  type: 'mech' | 'weapon' | 'drone' | 'vehicle';
  cgPrompt: string;
  specs: { label: string; value: string }[];
  backstory: string;
  base: string;
  energyConsumption: string;
  securityLevel: number;
}

export interface Base {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  continent: string;
  securityLevel: 1 | 2 | 3 | 4 | 5;
  type: 'spaceport' | 'dam' | 'prison' | 'spire' | 'lab';
  production: string;
  projects: string[];
  timezone: string;
  description: string;
}

export interface ArchiveEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  classification: 'public' | 'restricted' | 'classified';
  cgPrompt: string;
  characters: string[];
}

export interface Character {
  id: string;
  name: string;
  role: string;
  title: string;
  description: string;
  backstory: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}