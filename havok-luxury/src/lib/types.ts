export interface LuxuryProduct {
  id: string;
  name: string;
  brand: string;
  category: LuxuryCategory;
  price: number;
  currency: string;
  description: string;
  images: string[];
  limitedEdition: boolean;
  limitedNumber?: number;
  stockRegions: StockRegion[];
  features: string[];
  heritage: string;
  yearIntroduced: number;
  customizationAvailable: boolean;
}

export type LuxuryCategory =
  | "watches"
  | "couture"
  | "jewelry"
  | "auto-accessories"
  | "tech"
  | "collectibles";

export interface StockRegion {
  region: string;
  code: string;
  inStock: boolean;
  quantity: number;
  storeAddress: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  region: string;
  continent: string;
  country: string;
  city: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  hours: string;
  services: string[];
  brands: string[];
}

export interface ArchiveEntry {
  year: number;
  brand: string;
  title: string;
  description: string;
  image: string;
  significance: string;
}

export interface CartItem {
  product: LuxuryProduct;
  quantity: number;
  customization?: string;
  packaging: "standard" | "premium" | "collector";
  region: string;
}

export interface NavCategory {
  id: LuxuryCategory;
  label: string;
  labelZh: string;
  description: string;
}

export interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
}

export interface RegionOption {
  code: string;
  label: string;
  flag: string;
  languages: string[];
}