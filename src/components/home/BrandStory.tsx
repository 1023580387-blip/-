import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-12 bg-havok-deep border-t border-havok-border/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] border border-havok-border/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-havok-surface via-havok-deep to-havok-base" />
              {/* Decorative metal elements */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-havok-platinum/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-havok-platinum/20 to-transparent" />
              <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-havok-platinum/20 to-transparent" />
              <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-havok-platinum/20 to-transparent" />
              {/* Center emblem */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <div className="absolute inset-0 border border-havok-platinum/20 rotate-45" />
                    <div className="absolute inset-3 border border-havok-platinum/15 -rotate-45" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl text-havok-gold">H</span>
                    </div>
                  </div>
                  <div className="h-px w-16 bg-havok-platinum/15 mx-auto mb-4" />
                  <span className="font-display text-xl tracking-[0.3em] text-havok-gold block">
                    HAVOK
                  </span>
                  <span className="text-[10px] tracking-[0.5em] text-havok-platinum/30 block mt-1">
                    EST. 1887
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Story */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] tracking-[0.4em] text-havok-accent/60 uppercase block mb-4">
              Our Heritage
            </span>
            <h2 className="font-display text-display-md text-havok-gold leading-tight mb-6">
              A Legacy of <br />
              <span className="italic">Excellence</span>
            </h2>
            <div className="space-y-4 text-havok-platinum/50 text-sm leading-relaxed tracking-wider">
              <p>
                Founded in 1887 in the heart of Geneva, Havok Luxury Group has spent over a century
                curating the world's finest expressions of craftsmanship. What began as a single
                atelier dedicated to precision horology has grown into a global institution
                representing the pinnacle of luxury across six distinct categories.
              </p>
              <p>
                Our philosophy remains unchanged: to seek out the extraordinary, to champion
                the artisans who dedicate their lives to perfection, and to provide our
                distinguished clientele with access to objects of enduring beauty and
                significance.
              </p>
              <p>
                Today, with twelve flagship boutiques worldwide and relationships with the
                most esteemed maisons across Europe, Asia, and the Americas, Havok stands
                as the definitive destination for those who demand nothing less than the
                exceptional.
              </p>
            </div>
            <div className="flex gap-12 mt-8 pt-8 border-t border-havok-border/10">
              <div>
                <span className="font-mono text-2xl text-havok-gold">12</span>
                <span className="block text-[10px] tracking-[0.2em] text-havok-platinum/40 mt-1">
                  GLOBAL BOUTIQUES
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl text-havok-gold">50+</span>
                <span className="block text-[10px] tracking-[0.2em] text-havok-platinum/40 mt-1">
                  MAISON PARTNERS
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl text-havok-gold">138</span>
                <span className="block text-[10px] tracking-[0.2em] text-havok-platinum/40 mt-1">
                  YEARS OF HERITAGE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}