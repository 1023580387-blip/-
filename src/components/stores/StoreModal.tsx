import { motion } from "framer-motion";
import { X, MapPin, Clock, Phone, Gem } from "lucide-react";
import type { Store } from "../../types";

interface Props {
  store: Store;
  onClose: () => void;
}

export default function StoreModal({ store, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-havok-base/90 backdrop-blur-heavy" />
      <motion.div
        className="relative glass-panel p-8 lg:p-10 max-w-lg w-full"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-havok-platinum/30 hover:text-havok-gold transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[10px] tracking-[0.3em] text-havok-accent/60 uppercase block mb-2">
          {store.continent}
        </span>
        <h2 className="font-display text-display-sm text-havok-gold mb-1">{store.city}</h2>
        <p className="text-xs text-havok-platinum/40 tracking-wider mb-6">{store.name}</p>

        <div className="metal-divider mb-6" />

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5 text-havok-platinum/30 flex-shrink-0" />
            <div>
              <span className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-0.5">
                Address
              </span>
              <span className="text-xs text-havok-platinum/60 tracking-wider">{store.address}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 mt-0.5 text-havok-platinum/30 flex-shrink-0" />
            <div>
              <span className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-0.5">
                Hours
              </span>
              <span className="text-xs text-havok-platinum/60 tracking-wider">{store.hours}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 mt-0.5 text-havok-platinum/30 flex-shrink-0" />
            <div>
              <span className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-0.5">
                Phone
              </span>
              <span className="text-xs text-havok-platinum/60 tracking-wider font-mono">{store.phone}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Gem className="w-4 h-4 mt-0.5 text-havok-platinum/30 flex-shrink-0" />
            <div>
              <span className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-0.5">
                Services
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {store.services.map((s, i) => (
                  <span key={i} className="text-[10px] tracking-wider px-2 py-1 border border-havok-border/20 text-havok-platinum/50">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="metal-divider my-6" />

        <button className="w-full btn-havok-primary flex items-center justify-center gap-2">
          <Phone className="w-3.5 h-3.5" />
          Schedule Private Appointment
        </button>
      </motion.div>
    </motion.div>
  );
}