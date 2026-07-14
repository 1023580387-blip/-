import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { regions } from "../../data/currencies";

export default function DeliveryForm() {
  const [region, setRegion] = useState("GLOBAL");
  const [packaging, setPackaging] = useState("standard");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel-light p-6 space-y-5">
      <h3 className="text-[10px] tracking-[0.3em] text-havok-platinum/30 uppercase mb-2">
        Delivery Details
      </h3>

      {/* Region */}
      <div>
        <label className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-2">
          Delivery Region
        </label>
        <div className="relative">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="havok-input appearance-none pr-10"
          >
            {regions.map((r) => (
              <option key={r.code} value={r.code} className="bg-havok-surface">
                {r.nameZh} · {r.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-havok-platinum/30 pointer-events-none" />
        </div>
      </div>

      {/* Packaging */}
      <div>
        <label className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-2">
          Packaging
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "standard", label: "Signature Box", desc: "Complimentary" },
            { value: "premium", label: "Président Case", desc: "+$1,200" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPackaging(opt.value)}
              className={`p-3 border text-left transition-all duration-500 ${
                packaging === opt.value
                  ? "border-havok-accent/40 bg-havok-accent/5"
                  : "border-havok-border/20 hover:border-havok-border/40"
              }`}
            >
              <span className="block text-xs text-havok-platinum tracking-wider">{opt.label}</span>
              <span className="text-[10px] text-havok-platinum/40 mt-0.5 block">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-2">
          Full Name
        </label>
        <input type="text" className="havok-input" placeholder="Your name" />
      </div>

      {/* Email */}
      <div>
        <label className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-2">
          Email
        </label>
        <input type="email" className="havok-input" placeholder="your@email.com" />
      </div>

      {/* Address */}
      <div>
        <label className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-2">
          Delivery Address
        </label>
        <textarea className="havok-input h-20 resize-none" placeholder="Enter your delivery address" />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        className="w-full btn-havok-primary flex items-center justify-center gap-2"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {submitted ? (
          <>
            <Check className="w-4 h-4" />
            Order Confirmed
          </>
        ) : (
          "Proceed to Payment"
        )}
      </motion.button>
      <p className="text-[9px] text-havok-platinum/25 text-center tracking-wider">
        Your personal concierge will contact you within 24 hours.
      </p>
    </form>
  );
}