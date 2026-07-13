import { motion, useReducedMotion } from "framer-motion";
import { MANIFESTO_LINES } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";

const ACCENT = {
  default: "text-white",
  pink: "text-glow-pink",
  cyan: "text-glow-cyan",
  lime: "text-glow-lime",
  magenta: "text-glow-magenta",
} as const;

/**
 * 宣言区：大字排版，逐行滚动揭示，背景扫描线常驻。
 */
export default function Manifesto() {
  const reduce = useReducedMotion();

  return (
    <section
      id="manifesto"
      className="scanlines relative overflow-hidden px-6 py-32"
    >
      {/* 背景巨字水印 */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[28vw] leading-none text-white/[0.02]"
      >
        PULSE
      </span>

      <div className="container relative z-10 mx-auto max-w-5xl">
        <SectionHeading
          tag="// 04 · MANIFESTO"
          title="霓虹宣言"
          accent="magenta"
          align="center"
        />

        <div className="mt-16 space-y-2 text-center sm:space-y-3">
          {MANIFESTO_LINES.map((line, i) => {
            const accent = line.accent ?? "default";
            return (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-display text-[clamp(1.6rem,6vw,4rem)] leading-tight ${ACCENT[accent]}`}
              >
                {line.text}
              </motion.p>
            );
          })}
        </div>

        {/* 签名条 */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-4 font-data text-[10px] uppercase tracking-[0.3em] text-white/40"
        >
          <span className="h-px w-12 bg-neon-cyan/50" />
          <span>SIGNED · 2087.07.13 · NEO-SHANGHAI</span>
          <span className="h-px w-12 bg-neon-pink/50" />
        </motion.div>
      </div>
    </section>
  );
}
