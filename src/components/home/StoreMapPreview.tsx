import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const previewCities = [
  { name: "Geneva", lat: 46.2, lng: 6.15, x: "48%", y: "38%" },
  { name: "Paris", lat: 48.85, lng: 2.35, x: "46%", y: "35%" },
  { name: "London", lat: 51.5, lng: -0.1, x: "44%", y: "33%" },
  { name: "New York", lat: 40.7, lng: -74, x: "25%", y: "38%" },
  { name: "Dubai", lat: 25.2, lng: 55.3, x: "58%", y: "45%" },
  { name: "Tokyo", lat: 35.7, lng: 139.7, x: "82%", y: "40%" },
  { name: "Shanghai", lat: 31.2, lng: 121.5, x: "76%", y: "42%" },
  { name: "Hong Kong", lat: 22.3, lng: 114.2, x: "75%", y: "44%" },
];

export default function StoreMapPreview() {
  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-[10px] tracking-[0.4em] text-havok-accent/60 uppercase block mb-3">
            Global Presence
          </span>
          <h2 className="font-display text-display-md text-havok-gold leading-tight">
            Worldwide Boutiques
          </h2>
          <p className="text-havok-platinum/40 text-sm tracking-wider mt-2 max-w-md">
            Twelve flagship locations across four continents, each offering an unparalleled luxury experience.
          </p>
        </motion.div>

        <motion.div
          className="relative aspect-[2/1] max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* World Map Silhouette */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))" }}
          >
            {/* Simplified world map paths */}
            <path
              d="M150,200 Q200,150 220,160 Q250,170 230,200 Q210,230 150,200Z M180,180 Q220,140 280,150 Q320,160 300,190 Q240,220 180,180Z M350,140 Q400,120 450,135 Q470,150 440,170 Q390,190 350,140Z M420,130 Q480,100 520,115 Q540,130 510,150 Q460,170 420,130Z M550,100 Q600,85 650,100 Q670,115 640,135 Q590,150 550,100Z M700,110 Q750,95 800,110 Q820,125 790,145 Q740,160 700,110Z M820,130 Q860,120 900,140 Q910,150 880,160 Q840,170 820,130Z M160,250 Q200,230 240,250 Q260,270 230,290 Q180,310 160,250Z M280,260 Q330,240 370,270 Q380,290 340,310 Q290,330 280,260Z M400,280 Q450,260 480,290 Q490,310 450,330 Q400,350 400,280Z M500,300 Q550,280 590,310 Q600,330 560,350 Q510,370 500,300Z M620,320 Q660,305 700,330 Q710,350 670,370 Q620,380 620,320Z"
              fill="none"
              stroke="rgba(168,168,173,0.08)"
              strokeWidth="1"
            />
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={80 + i * 72}
                x2="1000"
                y2={80 + i * 72}
                stroke="rgba(168,168,173,0.04)"
                strokeWidth="0.5"
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line
                key={`v${i}`}
                x1={120 + i * 110}
                y1="0"
                x2={120 + i * 110}
                y2="500"
                stroke="rgba(168,168,173,0.04)"
                strokeWidth="0.5"
              />
            ))}
          </svg>

          {/* City Dots */}
          {previewCities.map((city, i) => (
            <motion.div
              key={city.name}
              className="absolute group cursor-pointer"
              style={{ left: city.x, top: city.y, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
            >
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-havok-accent/60 group-hover:bg-havok-accent transition-colors duration-500" />
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-havok-accent/20 animate-ping" />
                <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] text-havok-gold whitespace-nowrap">
                    {city.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/stores" className="btn-havok-primary inline-flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            Explore All Boutiques
          </Link>
        </div>
      </div>
    </section>
  );
}