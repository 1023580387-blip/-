import {
  LuxuryProduct,
  StoreLocation,
  ArchiveEntry,
  NavCategory,
  CurrencyOption,
  RegionOption,
} from "./types";

export const navCategories: NavCategory[] = [
  {
    id: "watches",
    label: "Watches",
    labelZh: "腕表",
    description: "Haute Horlogerie",
  },
  {
    id: "couture",
    label: "Couture",
    labelZh: "高定服饰",
    description: "Haute Couture",
  },
  {
    id: "jewelry",
    label: "Jewelry",
    labelZh: "珠宝",
    description: "Fine Jewelry",
  },
  {
    id: "auto-accessories",
    label: "Auto",
    labelZh: "豪车配饰",
    description: "Automotive Luxury",
  },
  {
    id: "tech",
    label: "Tech",
    labelZh: "高端数码",
    description: "Elite Technology",
  },
  {
    id: "collectibles",
    label: "Collectibles",
    labelZh: "典藏藏品",
    description: "Rare Collectibles",
  },
];

export const currencies: CurrencyOption[] = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "CHF", symbol: "CHF", label: "Swiss Franc" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham" },
];

export const regions: RegionOption[] = [
  { code: "global", label: "Global", flag: "🌐", languages: ["EN"] },
  { code: "na", label: "North America", flag: "🇺🇸", languages: ["EN", "FR"] },
  { code: "eu", label: "Europe", flag: "🇪🇺", languages: ["EN", "FR", "DE", "IT"] },
  { code: "me", label: "Middle East", flag: "🇦🇪", languages: ["EN", "AR"] },
  { code: "apac", label: "Asia Pacific", flag: "🇯🇵", languages: ["EN", "ZH", "JP"] },
  { code: "cn", label: "China", flag: "🇨🇳", languages: ["ZH", "EN"] },
];

export const products: LuxuryProduct[] = [
  {
    id: "havok-chronograph-x1",
    name: "HAVOK Chronograph X1",
    brand: "Havok Horlogerie",
    category: "watches",
    price: 185000,
    currency: "USD",
    description:
      "A masterpiece of precision engineering, the Chronograph X1 features a hand-wound tourbillon movement encased in grade-5 titanium with a matte DLC coating. Each timepiece undergoes 1,200 hours of hand-finishing by master watchmakers.",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
    ],
    limitedEdition: true,
    limitedNumber: 50,
    stockRegions: [
      {
        region: "North America",
        code: "na",
        inStock: true,
        quantity: 12,
        storeAddress: "Havok Boutique, Fifth Avenue, New York",
      },
      {
        region: "Europe",
        code: "eu",
        inStock: true,
        quantity: 8,
        storeAddress: "Havok Maison, Avenue Montaigne, Paris",
      },
      {
        region: "Middle East",
        code: "me",
        inStock: true,
        quantity: 5,
        storeAddress: "Havok Atelier, Dubai Mall, Dubai",
      },
      {
        region: "Asia Pacific",
        code: "apac",
        inStock: true,
        quantity: 15,
        storeAddress: "Havok Ginza, Chuo-ku, Tokyo",
      },
      {
        region: "China",
        code: "cn",
        inStock: false,
        quantity: 0,
        storeAddress: "Havok Pavilion, IFC, Shanghai",
      },
    ],
    features: [
      "Hand-wound tourbillon caliber HC-01",
      "Grade-5 titanium case with DLC coating",
      "120-hour power reserve",
      "Sapphire crystal with anti-reflective coating",
      "Water resistant to 100m",
      "Hand-stitched alligator leather strap",
    ],
    heritage:
      "Founded in 1847, Havok Horlogerie has been at the forefront of Swiss watchmaking innovation for over 175 years.",
    yearIntroduced: 2025,
    customizationAvailable: true,
  },
  {
    id: "havok-evening-gown-noir",
    name: "Noir Absolute Evening Gown",
    brand: "Havok Couture",
    category: "couture",
    price: 65000,
    currency: "USD",
    description:
      "An architectural masterpiece of draping and structure, crafted from 45 meters of midnight silk mikado. Each gown requires 800 hours of handwork by the atelier's premier artisans.",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    ],
    limitedEdition: true,
    limitedNumber: 10,
    stockRegions: [
      {
        region: "Europe",
        code: "eu",
        inStock: true,
        quantity: 4,
        storeAddress: "Havok Maison, Avenue Montaigne, Paris",
      },
      {
        region: "North America",
        code: "na",
        inStock: true,
        quantity: 2,
        storeAddress: "Havok Boutique, Fifth Avenue, New York",
      },
      {
        region: "Middle East",
        code: "me",
        inStock: true,
        quantity: 1,
        storeAddress: "Havok Atelier, Dubai Mall, Dubai",
      },
      {
        region: "Asia Pacific",
        code: "apac",
        inStock: false,
        quantity: 0,
        storeAddress: "Havok Ginza, Chuo-ku, Tokyo",
      },
      {
        region: "China",
        code: "cn",
        inStock: true,
        quantity: 3,
        storeAddress: "Havok Pavilion, IFC, Shanghai",
      },
    ],
    features: [
      "Midnight silk mikado fabric",
      "Hand-embroidered platinum thread detailing",
      "800 hours of handwork",
      "Custom-fitted to client measurements",
      "Complimentary lifetime alterations",
    ],
    heritage:
      "Havok Couture, established in 1923, has dressed royalty, heads of state, and the world's most discerning clientele.",
    yearIntroduced: 2025,
    customizationAvailable: true,
  },
  {
    id: "havok-sapphire-nebula",
    name: "Sapphire Nebula Necklace",
    brand: "Havok Jewelry",
    category: "jewelry",
    price: 420000,
    currency: "USD",
    description:
      "A constellation of 47 Ceylon sapphires totaling 128.5 carats, set in platinum with a signature Havok micro-pavé diamond halo. Each stone is independently certified by the GIA.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e43bdc75?w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141589-ef4a2c7ba3d0?w=800&q=80",
    ],
    limitedEdition: true,
    limitedNumber: 3,
    stockRegions: [
      {
        region: "Europe",
        code: "eu",
        inStock: true,
        quantity: 1,
        storeAddress: "Havok Maison, Avenue Montaigne, Paris",
      },
      {
        region: "Middle East",
        code: "me",
        inStock: true,
        quantity: 1,
        storeAddress: "Havok Atelier, Dubai Mall, Dubai",
      },
      {
        region: "Asia Pacific",
        code: "apac",
        inStock: true,
        quantity: 1,
        storeAddress: "Havok Ginza, Chuo-ku, Tokyo",
      },
      {
        region: "North America",
        code: "na",
        inStock: false,
        quantity: 0,
        storeAddress: "Havok Boutique, Fifth Avenue, New York",
      },
      {
        region: "China",
        code: "cn",
        inStock: false,
        quantity: 0,
        storeAddress: "Havok Pavilion, IFC, Shanghai",
      },
    ],
    features: [
      "47 Ceylon sapphires (128.5 carats total)",
      "Platinum setting with micro-pavé diamonds",
      "GIA-certified stones",
      "Customizable length and clasp",
      "Presented in a Havok signature leather case",
    ],
    heritage:
      "Havok Jewelry, founded in 1891, sources the world's finest gemstones directly from ethical mines.",
    yearIntroduced: 2025,
    customizationAvailable: true,
  },
  {
    id: "havok-carbon-touring-case",
    name: "Carbon Touring Luggage Set",
    brand: "Havok Auto Accessories",
    category: "auto-accessories",
    price: 28000,
    currency: "USD",
    description:
      "A three-piece luggage set crafted from the same forged carbon fiber used in hypercar construction. Each piece is hand-laid and autoclave-cured for maximum strength-to-weight ratio.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
      "https://images.unsplash.com/photo-1581553680321-4fffae59fea5?w=800&q=80",
    ],
    limitedEdition: false,
    stockRegions: [
      {
        region: "North America",
        code: "na",
        inStock: true,
        quantity: 20,
        storeAddress: "Havok Boutique, Fifth Avenue, New York",
      },
      {
        region: "Europe",
        code: "eu",
        inStock: true,
        quantity: 25,
        storeAddress: "Havok Maison, Avenue Montaigne, Paris",
      },
      {
        region: "Middle East",
        code: "me",
        inStock: true,
        quantity: 10,
        storeAddress: "Havok Atelier, Dubai Mall, Dubai",
      },
      {
        region: "Asia Pacific",
        code: "apac",
        inStock: true,
        quantity: 18,
        storeAddress: "Havok Ginza, Chuo-ku, Tokyo",
      },
      {
        region: "China",
        code: "cn",
        inStock: true,
        quantity: 30,
        storeAddress: "Havok Pavilion, IFC, Shanghai",
      },
    ],
    features: [
      "Forged carbon fiber construction",
      "Autoclave-cured for maximum strength",
      "Italian leather interior lining",
      "TSA-approved integrated locks",
      "360° silent-run wheels",
      "Telescopic carbon fiber handle",
    ],
    heritage:
      "Havok Auto Accessories, established 1967, applies aerospace-grade materials to luxury travel goods.",
    yearIntroduced: 2024,
    customizationAvailable: false,
  },
  {
    id: "havok-audio-system-reference",
    name: "Reference Audio System Mk IV",
    brand: "Havok Technology",
    category: "tech",
    price: 95000,
    currency: "USD",
    description:
      "A statement audio system featuring bespoke tube amplification and diamond-tweeter speakers. Each unit is hand-assembled by a single master technician over 6 months.",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&q=80",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80",
    ],
    limitedEdition: true,
    limitedNumber: 25,
    stockRegions: [
      {
        region: "Europe",
        code: "eu",
        inStock: true,
        quantity: 8,
        storeAddress: "Havok Maison, Avenue Montaigne, Paris",
      },
      {
        region: "North America",
        code: "na",
        inStock: true,
        quantity: 5,
        storeAddress: "Havok Boutique, Fifth Avenue, New York",
      },
      {
        region: "Asia Pacific",
        code: "apac",
        inStock: true,
        quantity: 7,
        storeAddress: "Havok Ginza, Chuo-ku, Tokyo",
      },
      {
        region: "Middle East",
        code: "me",
        inStock: false,
        quantity: 0,
        storeAddress: "Havok Atelier, Dubai Mall, Dubai",
      },
      {
        region: "China",
        code: "cn",
        inStock: true,
        quantity: 5,
        storeAddress: "Havok Pavilion, IFC, Shanghai",
      },
    ],
    features: [
      "Bespoke Class-A tube amplification",
      "Diamond-tweeter loudspeakers",
      "Hand-wound output transformers",
      "6-month single-technician assembly",
      "Frequency response: 5Hz - 100kHz",
      "Custom finish options available",
    ],
    heritage:
      "Havok Technology, founded in 1955, pioneered high-end audio engineering for discerning listeners.",
    yearIntroduced: 2025,
    customizationAvailable: true,
  },
  {
    id: "havok-celestial-globe-1892",
    name: "Celestial Globe, 1892",
    brand: "Havok Collectibles",
    category: "collectibles",
    price: 180000,
    currency: "USD",
    description:
      "An extraordinarily rare celestial globe crafted by master cartographer Jean-Baptiste Havok in 1892. One of only three known to exist, featuring hand-painted constellations on a solid silver armillary sphere.",
    images: [
      "https://images.unsplash.com/photo-1582719471384-894fbb4e46b2?w=800&q=80",
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&q=80",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=80",
    ],
    limitedEdition: true,
    limitedNumber: 1,
    stockRegions: [
      {
        region: "Europe",
        code: "eu",
        inStock: true,
        quantity: 1,
        storeAddress: "Havok Archive, Geneva, Switzerland",
      },
      {
        region: "North America",
        code: "na",
        inStock: false,
        quantity: 0,
        storeAddress: "Havok Boutique, Fifth Avenue, New York",
      },
      {
        region: "Middle East",
        code: "me",
        inStock: false,
        quantity: 0,
        storeAddress: "Havok Atelier, Dubai Mall, Dubai",
      },
      {
        region: "Asia Pacific",
        code: "apac",
        inStock: false,
        quantity: 0,
        storeAddress: "Havok Ginza, Chuo-ku, Tokyo",
      },
      {
        region: "China",
        code: "cn",
        inStock: false,
        quantity: 0,
        storeAddress: "Havok Pavilion, IFC, Shanghai",
      },
    ],
    features: [
      "Solid silver armillary sphere",
      "Hand-painted celestial constellations",
      "Original 1892 craftsmanship",
      "Provenance documentation included",
      "Museum-grade display case",
      "One of only three known examples",
    ],
    heritage:
      "The Havok family's cartographic legacy dates to 1790, when Pierre Havok was appointed Royal Cartographer to the French court.",
    yearIntroduced: 1892,
    customizationAvailable: false,
  },
  {
    id: "havok-tourbillon-skeleton",
    name: "Tourbillon Skeleton Masterpiece",
    brand: "Havok Horlogerie",
    category: "watches",
    price: 320000,
    currency: "USD",
    description:
      "A fully skeletonized double-tourbillon timepiece with a hand-engraved movement visible through sapphire crystal on both sides. The case is crafted from proprietary Havok alloy HA-7.",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
    ],
    limitedEdition: true,
    limitedNumber: 12,
    stockRegions: [
      {
        region: "Europe",
        code: "eu",
        inStock: true,
        quantity: 3,
        storeAddress: "Havok Maison, Avenue Montaigne, Paris",
      },
      {
        region: "Middle East",
        code: "me",
        inStock: true,
        quantity: 2,
        storeAddress: "Havok Atelier, Dubai Mall, Dubai",
      },
      {
        region: "Asia Pacific",
        code: "apac",
        inStock: true,
        quantity: 4,
        storeAddress: "Havok Ginza, Chuo-ku, Tokyo",
      },
      {
        region: "North America",
        code: "na",
        inStock: true,
        quantity: 2,
        storeAddress: "Havok Boutique, Fifth Avenue, New York",
      },
      {
        region: "China",
        code: "cn",
        inStock: true,
        quantity: 1,
        storeAddress: "Havok Pavilion, IFC, Shanghai",
      },
    ],
    features: [
      "Double-tourbillon caliber HC-02",
      "Fully hand-engraved skeleton movement",
      "Proprietary Havok HA-7 alloy case",
      "Dual sapphire crystal display",
      "150-hour power reserve",
      "Individually numbered",
    ],
    heritage:
      "Each skeleton movement requires 18 months of work by a single master engraver.",
    yearIntroduced: 2025,
    customizationAvailable: true,
  },
  {
    id: "havok-platinum-cufflinks",
    name: "Platinum Precision Cufflinks",
    brand: "Havok Jewelry",
    category: "jewelry",
    price: 8500,
    currency: "USD",
    description:
      "Architectural cufflinks in solid platinum, featuring a micro-mechanical gear system visible through sapphire crystal. Each pair contains 47 moving components.",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e43bdc75?w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    ],
    limitedEdition: false,
    stockRegions: [
      {
        region: "North America",
        code: "na",
        inStock: true,
        quantity: 45,
        storeAddress: "Havok Boutique, Fifth Avenue, New York",
      },
      {
        region: "Europe",
        code: "eu",
        inStock: true,
        quantity: 50,
        storeAddress: "Havok Maison, Avenue Montaigne, Paris",
      },
      {
        region: "Middle East",
        code: "me",
        inStock: true,
        quantity: 30,
        storeAddress: "Havok Atelier, Dubai Mall, Dubai",
      },
      {
        region: "Asia Pacific",
        code: "apac",
        inStock: true,
        quantity: 35,
        storeAddress: "Havok Ginza, Chuo-ku, Tokyo",
      },
      {
        region: "China",
        code: "cn",
        inStock: true,
        quantity: 40,
        storeAddress: "Havok Pavilion, IFC, Shanghai",
      },
    ],
    features: [
      "Solid platinum construction",
      "47 moving micro-mechanical components",
      "Sapphire crystal display window",
      "Havok signature presentation box",
      "Lifetime mechanical warranty",
    ],
    heritage:
      "The micro-mechanical tradition at Havok dates to the company's origins in precision instrument making.",
    yearIntroduced: 2024,
    customizationAvailable: false,
  },
];

export const storeLocations: StoreLocation[] = [
  {
    id: "nyc-fifth-ave",
    name: "Havok Boutique New York",
    region: "North America",
    continent: "na",
    country: "United States",
    city: "New York",
    address: "745 Fifth Avenue, New York, NY 10151",
    coordinates: { lat: 40.7634, lng: -73.9737 },
    phone: "+1 (212) 555-0100",
    hours: "Mon-Sat: 10:00-20:00, Sun: 12:00-18:00",
    services: [
      "Private Viewing Suite",
      "Custom Commission",
      "On-Site Master Watchmaker",
      "Personal Shopping",
      "Afternoon Tea Salon",
    ],
    brands: [
      "Havok Horlogerie",
      "Havok Couture",
      "Havok Jewelry",
      "Havok Technology",
    ],
  },
  {
    id: "paris-montaigne",
    name: "Havok Maison Paris",
    region: "Europe",
    continent: "eu",
    country: "France",
    city: "Paris",
    address: "28 Avenue Montaigne, 75008 Paris",
    coordinates: { lat: 48.8667, lng: 2.3050 },
    phone: "+33 1 44 55 01 00",
    hours: "Mon-Sat: 10:00-19:30, Sun: Closed",
    services: [
      "Haute Couture Salon",
      "Fine Jewelry Atelier",
      "Private Dining Room",
      "Art Advisory",
      "Champagne Bar",
    ],
    brands: [
      "Havok Horlogerie",
      "Havok Couture",
      "Havok Jewelry",
      "Havok Collectibles",
      "Havok Auto Accessories",
    ],
  },
  {
    id: "dubai-mall",
    name: "Havok Atelier Dubai",
    region: "Middle East",
    continent: "me",
    country: "United Arab Emirates",
    city: "Dubai",
    address: "The Dubai Mall, Fashion Avenue, Dubai",
    coordinates: { lat: 25.1972, lng: 55.2790 },
    phone: "+971 4 555 0200",
    hours: "Sun-Wed: 10:00-23:00, Thu-Sat: 10:00-00:00",
    services: [
      "Royal Suite",
      "Bespoke Commission",
      "Private Helicopter Transfer",
      "24/7 Concierge",
      "VIP Valet",
    ],
    brands: [
      "Havok Horlogerie",
      "Havok Couture",
      "Havok Jewelry",
      "Havok Auto Accessories",
    ],
  },
  {
    id: "tokyo-ginza",
    name: "Havok Ginza Tokyo",
    region: "Asia Pacific",
    continent: "apac",
    country: "Japan",
    city: "Tokyo",
    address: "5-4-8 Ginza, Chuo-ku, Tokyo 104-0061",
    coordinates: { lat: 35.6717, lng: 139.7650 },
    phone: "+81 3 5555 0300",
    hours: "Daily: 11:00-20:00",
    services: [
      "Tea Ceremony Room",
      "Master Engraver Studio",
      "Private Consultation",
      "Art Gallery",
      "Sake Tasting",
    ],
    brands: [
      "Havok Horlogerie",
      "Havok Couture",
      "Havok Jewelry",
      "Havok Technology",
      "Havok Collectibles",
    ],
  },
  {
    id: "shanghai-ifc",
    name: "Havok Pavilion Shanghai",
    region: "China",
    continent: "cn",
    country: "China",
    city: "Shanghai",
    address: "IFC Mall, 8 Century Avenue, Pudong, Shanghai",
    coordinates: { lat: 31.2357, lng: 121.5016 },
    phone: "+86 21 5555 0400",
    hours: "Daily: 10:00-22:00",
    services: [
      "Private Suite",
      "Custom Tailoring",
      "Art Consultation",
      "Tea Lounge",
      "Personal Concierge",
    ],
    brands: [
      "Havok Horlogerie",
      "Havok Couture",
      "Havok Jewelry",
      "Havok Technology",
      "Havok Auto Accessories",
    ],
  },
  {
    id: "geneva-archive",
    name: "Havok Archive Geneva",
    region: "Europe",
    continent: "eu",
    country: "Switzerland",
    city: "Geneva",
    address: "12 Rue du Rhône, 1204 Geneva",
    coordinates: { lat: 46.2044, lng: 6.1490 },
    phone: "+41 22 555 0500",
    hours: "Tue-Sat: 10:00-18:00, By Appointment Only",
    services: [
      "Archive Viewing",
      "Restoration Atelier",
      "Historical Consultation",
      "Private Museum Tour",
      "Academic Research Access",
    ],
    brands: [
      "Havok Horlogerie",
      "Havok Collectibles",
      "Havok Jewelry",
    ],
  },
  {
    id: "london-bond",
    name: "Havok House London",
    region: "Europe",
    continent: "eu",
    country: "United Kingdom",
    city: "London",
    address: "158 New Bond Street, London W1S 2UB",
    coordinates: { lat: 51.5122, lng: -0.1425 },
    phone: "+44 20 7555 0600",
    hours: "Mon-Sat: 10:00-19:00, Sun: 12:00-18:00",
    services: [
      "Bespoke Tailoring",
      "Fine Watch Gallery",
      "Private Client Lounge",
      "Whisky Tasting Room",
      "Art Advisory",
    ],
    brands: [
      "Havok Horlogerie",
      "Havok Couture",
      "Havok Jewelry",
      "Havok Collectibles",
    ],
  },
  {
    id: "milan-montenapoleone",
    name: "Havok Milano",
    region: "Europe",
    continent: "eu",
    country: "Italy",
    city: "Milan",
    address: "Via Monte Napoleone 12, 20121 Milano",
    coordinates: { lat: 45.4689, lng: 9.1950 },
    phone: "+39 02 555 0700",
    hours: "Mon-Sat: 10:00-19:30, Sun: Closed",
    services: [
      "Couture Salon",
      "Jewelry Atelier",
      "Private Terrace",
      "Espresso Bar",
      "Personal Shopper",
    ],
    brands: [
      "Havok Horlogerie",
      "Havok Couture",
      "Havok Jewelry",
      "Havok Auto Accessories",
    ],
  },
];

export const archiveEntries: ArchiveEntry[] = [
  {
    year: 1790,
    brand: "Havok Cartography",
    title: "Royal Appointment",
    description:
      "Pierre Havok is appointed Royal Cartographer to the French court, establishing the family's legacy of precision craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1524668951403-d44b28200ce0?w=600&q=80",
    significance:
      "The foundation of the Havok dynasty's commitment to precision and excellence.",
  },
  {
    year: 1847,
    brand: "Havok Horlogerie",
    title: "First Workshop",
    description:
      "Henri Havok establishes the first watchmaking workshop in Geneva, specializing in marine chronometers for naval vessels.",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
    significance:
      "The birth of Havok's watchmaking heritage, built on marine precision.",
  },
  {
    year: 1891,
    brand: "Havok Jewelry",
    title: "The First Collection",
    description:
      "Marie Havok unveils the inaugural jewelry collection at the Paris World's Fair, winning the Grand Prix for innovation in gem-setting techniques.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e43bdc75?w=600&q=80",
    significance:
      "Havok enters the world of fine jewelry with revolutionary techniques.",
  },
  {
    year: 1892,
    brand: "Havok Collectibles",
    title: "Celestial Globe",
    description:
      "Jean-Baptiste Havok completes his masterpiece celestial globe, a fusion of astronomical precision and artistic brilliance.",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb4e46b2?w=600&q=80",
    significance:
      "A landmark achievement in precision instrument making and artistry.",
  },
  {
    year: 1923,
    brand: "Havok Couture",
    title: "Maison de Couture",
    description:
      "The Havok fashion house opens on Avenue Montaigne, introducing architectural draping techniques that redefine haute couture.",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
    significance:
      "Havok Couture begins its journey as a defining force in fashion.",
  },
  {
    year: 1955,
    brand: "Havok Technology",
    title: "Audio Division Founded",
    description:
      "The technology division is established, applying precision engineering principles to high-fidelity audio reproduction.",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
    significance:
      "Havok extends precision engineering into the world of sound.",
  },
  {
    year: 1967,
    brand: "Havok Auto Accessories",
    title: "Motorsport Heritage",
    description:
      "Havok begins crafting luxury accessories for the world's most prestigious automobile manufacturers, starting with a bespoke luggage set for a legendary GT car.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    significance:
      "The intersection of automotive excellence and luxury craftsmanship.",
  },
  {
    year: 1985,
    brand: "Havok Horlogerie",
    title: "Tourbillon Revolution",
    description:
      "Master watchmaker Philippe Havok unveils the world's first double-tourbillon wristwatch, redefining haute horlogerie.",
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80",
    significance:
      "A technical breakthrough that established Havok as a leader in complications.",
  },
  {
    year: 2000,
    brand: "Havok Group",
    title: "Global Expansion",
    description:
      "The Havok Group opens boutiques in New York, Tokyo, and Dubai, establishing a truly global presence for the first time.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    significance:
      "The transformation from European luxury house to global powerhouse.",
  },
  {
    year: 2015,
    brand: "Havok Collectibles",
    title: "Archive Foundation",
    description:
      "The Havok Archive Foundation is established in Geneva, dedicated to preserving the group's heritage and supporting horological research.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600&q=80",
    significance:
      "A commitment to preserving and sharing the Havok legacy for future generations.",
  },
  {
    year: 2025,
    brand: "Havok Group",
    title: "The New Era",
    description:
      "Havok unveils its most ambitious collection to date, spanning all six luxury divisions and representing the pinnacle of contemporary craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    significance:
      "A new chapter in Havok's story, honoring tradition while embracing the future.",
  },
];

export const heroSlides = [
  {
    id: "hero-1",
    title: "The Chronograph X1",
    subtitle: "Limited Edition of 50",
    description:
      "A masterpiece of precision engineering. Hand-wound tourbillon movement in grade-5 titanium.",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1600&q=85",
    cta: "Discover the Collection",
    link: "/product/havok-chronograph-x1",
  },
  {
    id: "hero-2",
    title: "Noir Absolute",
    subtitle: "Havok Couture 2025",
    description:
      "Architectural draping in midnight silk. 800 hours of handwork.",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1600&q=85",
    cta: "Explore Couture",
    link: "/product/havok-evening-gown-noir",
  },
  {
    id: "hero-3",
    title: "Sapphire Nebula",
    subtitle: "128.5 Carats of Ceylon Sapphires",
    description:
      "A constellation of 47 sapphires set in platinum. One of only three.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e43bdc75?w=1600&q=85",
    cta: "View Jewelry",
    link: "/product/havok-sapphire-nebula",
  },
];