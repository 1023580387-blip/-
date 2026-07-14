import { Link } from "react-router-dom";
import { Gem } from "lucide-react";

const footerLinks = [
  {
    title: "EXPLORE",
    links: [
      { label: "All Categories", to: "/shop" },
      { label: "New Arrivals", to: "/shop?filter=new" },
      { label: "Limited Editions", to: "/shop?filter=limited" },
      { label: "Brand Archive", to: "/archive" },
    ],
  },
  {
    title: "BOUTIQUES",
    links: [
      { label: "Geneva", to: "/stores" },
      { label: "Paris", to: "/stores" },
      { label: "New York", to: "/stores" },
      { label: "Tokyo", to: "/stores" },
      { label: "Dubai", to: "/stores" },
      { label: "All Locations", to: "/stores" },
    ],
  },
  {
    title: "SERVICES",
    links: [
      { label: "Private Client", to: "#" },
      { label: "Bespoke Orders", to: "#" },
      { label: "Global Shipping", to: "#" },
      { label: "Concierge", to: "#" },
    ],
  },
  {
    title: "HAVOK GROUP",
    links: [
      { label: "Our Heritage", to: "/archive" },
      { label: "Maisons & Partners", to: "#" },
      { label: "Sustainability", to: "#" },
      { label: "Careers", to: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-havok-border/10 bg-havok-base">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 border border-havok-platinum/30 rotate-45" />
                <div className="absolute inset-1.5 border border-havok-platinum/20 -rotate-45" />
                <Gem className="absolute inset-0 m-auto w-4 h-4 text-havok-gold" />
              </div>
              <span className="font-display text-lg tracking-[0.3em] text-havok-gold">
                HAVOK
              </span>
            </Link>
            <p className="text-havok-platinum/30 text-xs leading-relaxed max-w-[220px]">
              The world's premier destination for exceptional luxury. Curating the finest timepieces, haute couture, jewelry, and collectibles since 1887.
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] tracking-[0.3em] text-havok-platinum/30 uppercase mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs text-havok-platinum/50 hover:text-havok-gold transition-colors duration-500 tracking-wider"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="metal-divider mt-16 mb-8" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.15em] text-havok-platinum/25 uppercase">
            &copy; {new Date().getFullYear()} HAVOK LUXURY GROUP. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] tracking-[0.15em] text-havok-platinum/25 uppercase">
              Privacy Policy
            </span>
            <span className="text-[10px] tracking-[0.15em] text-havok-platinum/25 uppercase">
              Terms of Service
            </span>
            <span className="text-[10px] tracking-[0.15em] text-havok-platinum/25 uppercase">
              Cookie Settings
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}