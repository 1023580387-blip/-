export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  images: string[];
  description: string;
  origin: string;
  isLimited: boolean;
  limitNumber?: string;
  regions: string[];
  customService: string[];
  details: string[];
  year: string;
}

export interface Category {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  description: string;
}

export interface Store {
  id: string;
  name: string;
  continent: string;
  city: string;
  country: string;
  address: string;
  hours: string;
  phone: string;
  lat: number;
  lng: number;
  services: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  customPackage: string;
  deliveryRegion: string;
}

export interface Brand {
  id: string;
  name: string;
  founded: string;
  origin: string;
  description: string;
  timelineEvents: TimelineEvent[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  productId?: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

export interface Region {
  code: string;
  name: string;
  nameZh: string;
  currency: string;
}

export interface HeroSlide {
  id: string;
  productId: string;
  image: string;
  title: string;
  subtitle: string;
  brand: string;
}