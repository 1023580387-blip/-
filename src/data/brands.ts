import type { Brand } from "../types";

export const brands: Brand[] = [
  {
    id: "brand-001",
    name: "LAURENT FERRIER",
    founded: "2009",
    origin: "Geneva, Switzerland",
    description:
      "Founded by a former Patek Philippe creative director, Laurent Ferrier represents the pinnacle of independent Swiss watchmaking. Each timepiece is a testament to understated elegance and technical mastery.",
    timelineEvents: [
      { year: "2009", title: "Foundation", description: "Laurent Ferrier establishes his eponymous manufacture in Geneva." },
      { year: "2010", title: "Galet Classic", description: "The Galet Classic Tourbillon wins Best Men's Watch at the GPHG.", productId: "havok-001" },
      { year: "2015", title: "Microrotor", description: "Introduction of the proprietary microrotor movement, redefining automatic winding." },
      { year: "2020", title: "Grand Feu", description: "Mastery of grand feu enamel dials, each requiring 12 firings." },
      { year: "2025", title: "Chronomètre Souverain", description: "The Chronomètre Souverain sets new standards in chronometric precision." },
    ],
  },
  {
    id: "brand-002",
    name: "CARTIER",
    founded: "1847",
    origin: "Paris, France",
    description:
      "The jeweler of kings and the king of jewelers. Cartier has defined luxury since 1847, creating iconic designs that transcend time and trend.",
    timelineEvents: [
      { year: "1847", title: "Foundation", description: "Louis-François Cartier takes over his master's workshop in Paris." },
      { year: "1904", title: "Santos", description: "Creation of the Santos watch, one of the first modern wristwatches." },
      { year: "1917", title: "Tank", description: "The Tank watch is created, inspired by the Renault FT-17 tank." },
      { year: "1970", title: "Love Bracelet", description: "The iconic Love bracelet is designed in New York." },
      { year: "2025", title: "Serpentis Collection", description: "The Serpentis Emerald Ring embodies Art Deco revival." },
    ],
  },
  {
    id: "brand-003",
    name: "AUDEMARS PIGUET",
    founded: "1875",
    origin: "Le Brassus, Switzerland",
    description:
      "The oldest fine watchmaking manufacture still in the hands of its founding families. Audemars Piguet has been pushing the boundaries of haute horlogerie since 1875.",
    timelineEvents: [
      { year: "1875", title: "Foundation", description: "Jules Louis Audemars and Edward Auguste Piguet establish their workshop." },
      { year: "1972", title: "Royal Oak", description: "The Royal Oak, designed by Gérald Genta, revolutionizes luxury sports watches." },
      { year: "1993", title: "Royal Oak Offshore", description: "The Offshore collection pushes the Royal Oak into bold new territory." },
      { year: "2002", title: "Concept Series", description: "The Royal Oak Concept series begins, exploring avant-garde watchmaking." },
      { year: "2025", title: "Concept GMT", description: "The Royal Oak Concept GMT combines titanium and ceramic in a skeletonized masterpiece." },
    ],
  },
  {
    id: "brand-004",
    name: "GRAFF",
    founded: "1960",
    origin: "London, United Kingdom",
    description:
      "Laurence Graff's obsession with the world's most exceptional diamonds has made Graff synonymous with the rarest gems on Earth.",
    timelineEvents: [
      { year: "1960", title: "Foundation", description: "Laurence Graff founds his first jewelry workshop in London." },
      { year: "1974", title: "Graff Diamond", description: "Acquisition of the 47.39-carat Graff Diamond." },
      { year: "2010", title: "Graff Pink", description: "The 24.78-carat fancy intense pink diamond sets a world record." },
      { year: "2024", title: "Celestial Parure", description: "The Celestial Parure debuts as the most significant diamond set in Graff history." },
    ],
  },
  {
    id: "brand-005",
    name: "PATEK PHILIPPE",
    founded: "1839",
    origin: "Geneva, Switzerland",
    description:
      "The last family-owned independent Genevan watch manufacture. Patek Philippe is universally recognized as the pinnacle of watchmaking excellence.",
    timelineEvents: [
      { year: "1839", title: "Foundation", description: "Antoine Norbert de Patek and François Czapek establish Patek, Czapek & Cie." },
      { year: "1868", title: "First Swiss Wristwatch", description: "Patek Philippe creates the first Swiss wristwatch for Countess Koscowicz." },
      { year: "1932", title: "Stern Family", description: "The Stern family acquires Patek Philippe, beginning a new era." },
      { year: "1989", title: "Calibre 89", description: "The most complicated portable timepiece ever made, with 33 complications." },
      { year: "2025", title: "Sky Moon Tourbillon", description: "The Sky Moon Tourbillon 6002G represents the ultimate expression of Patek Philippe's art." },
    ],
  },
];