import { motion, useReducedMotion } from "framer-motion";
import { PROTOCOL_FEATURES, type ProtocolFeature } from "@/data/content";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

const ACCENT = {
  pink: {
    text: "text-glow-pink",
    border: "group-hover:border-neon-pink/70",
    shadow: "group-hover:shadow-neon-pink",
    glow: "bg-neon-pink/10",
    icon: "text-neon-pink",
  },
  cyan: {
    text: "text-glow-cyan",
    border: "group-hover:border-neon-cyan/70",
    shadow: "group-hover:shadow-neon-cyan",
    glow: "bg-neon-cyan/10",
    icon: "text-neon-cyan",
  },
  lime: {
    text: "text-glow-lime",
    border: "group-hover:border-neon-lime/70",
    shadow: "group-hover:shadow-neon-lime",
    glow: "bg-neon-lime/10",
    icon: "text-neon-lime",
  },
  magenta: {
    text: "text-glow-magenta",
    border: "group-hover:border-neon-magenta/70",
    shadow: "group-hover:shadow-neon-magenta",
    glow: "bg-neon-magenta/10",
    icon: "text-neon-magenta",
  },
} as const;

function FeatureCard({ feature }: { feature: ProtocolFeature }) {
  const reduce = useReducedMotion();
  const a = ACCENT[feature.accent];
  const Icon = feature.icon;

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative flex h-full flex-col border border-ink-line bg-ink-base/70 p-8 backdrop-blur transition-colors duration-300 ${a.border} ${a.shadow}`}
    >
      {/* 角标 */}
      <span className={`corner-ticks ${a.icon}`} />

      {/* 编号 + 图标 */}
      <div className="mb-6 flex items-start justify-between">
        <span className={`font-data text-xs tracking-[0.3em] ${a.icon}`}>
          // {feature.index}
        </span>
        <div className="relative">
          <Icon
            className={`h-9 w-9 ${a.icon} transition-transform duration-300 group-hover:scale-110`}
            strokeWidth={1.2}
          />
          <span
            className={`absolute inset-0 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 ${a.glow}`}
          />
        </div>
      </div>

      {/* 标题 */}
      <h3 className={`font-display text-xl leading-tight ${a.text}`}>
        {feature.title}
      </h3>

      {/* 描述 */}
      <p className="mt-4 font-mono text-sm leading-relaxed text-white/65">
        {feature.description}
      </p>

      {/* 底部脉冲指示 */}
      <div className="mt-auto flex items-center gap-2 pt-8 font-data text-[10px] uppercase tracking-[0.25em] text-white/40">
        <span className={`inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full ${a.icon.replace("text-", "bg-")}`} />
        <span>ACTIVE</span>
      </div>

      {/* hover 扫光线 */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px translate-y-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
    </motion.article>
  );
}

export default function ProtocolFeatures() {
  return (
    <section id="protocol" className="relative px-6 py-28">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            tag="// 02 · PROTOCOL"
            title="协议能力"
            accent="cyan"
            description="三套核心协议构成脉冲集体的底层语法。每个节点接入后自动继承全部能力，无需额外配置。"
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROTOCOL_FEATURES.map((f, i) => (
            <ScrollReveal key={f.index} delay={i * 0.12}>
              <FeatureCard feature={f} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
