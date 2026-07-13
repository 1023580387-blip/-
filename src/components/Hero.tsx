import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Triangle, Hexagon, Square } from "lucide-react";
import GlitchText from "@/components/GlitchText";
import NeonButton from "@/components/NeonButton";
import { HERO_STATS } from "@/data/content";

/**
 * Hero 区：故障大标题 + 透视网格 + 双 CTA + 悬浮几何体 + 实时状态条。
 */
export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24"
    >
      {/* 悬浮几何体 */}
      <Triangle
        className="absolute left-[8%] top-[22%] h-10 w-10 text-neon-pink/70 animate-float"
        strokeWidth={1.2}
      />
      <Hexagon
        className="absolute right-[12%] top-[30%] h-14 w-14 text-neon-cyan/60 animate-float"
        strokeWidth={1}
        style={{ animationDelay: "1.4s" }}
      />
      <Square
        className="absolute right-[22%] bottom-[20%] h-8 w-8 rotate-12 text-neon-lime/60 animate-float"
        strokeWidth={1.2}
        style={{ animationDelay: "0.7s" }}
      />
      <Triangle
        className="absolute left-[18%] bottom-[24%] h-6 w-6 rotate-180 text-neon-magenta/60 animate-float"
        strokeWidth={1.2}
        style={{ animationDelay: "2.1s" }}
      />

      <motion.div
        className="container relative z-10 mx-auto max-w-5xl"
        variants={reduce ? undefined : container}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* 顶部状态条 */}
        <motion.div
          variants={reduce ? undefined : item}
          className="mb-8 flex flex-wrap items-center gap-3 font-data text-[11px] uppercase tracking-[0.3em] text-neon-cyan/80"
        >
          <span className="inline-flex h-2 w-2 animate-pulse-glow rounded-full bg-neon-lime shadow-neon-lime" />
          <span>SIGNAL · ONLINE</span>
          <span className="text-ink-line">/</span>
          <span className="text-white/60">PULSE KERNEL v3.1.4</span>
          <span className="text-ink-line">/</span>
          <span className="text-neon-pink/80">2087 · NEO-SHANGHAI</span>
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          variants={reduce ? undefined : item}
          className="font-display text-[clamp(2.8rem,11vw,8.5rem)] leading-[0.95] tracking-tight"
        >
          <GlitchText
            as="span"
            text="NEON"
            accent="cyan"
            className="block"
          />
          <span className="block">
            <span className="text-white/30">//</span>
            <GlitchText as="span" text="PULSE" accent="pink" className="ml-2" />
          </span>
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          variants={reduce ? undefined : item}
          className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-white/70 sm:text-base"
        >
          一个面向设计师、开发者与赛博文化爱好者的霓虹脉冲集体。
          <br className="hidden sm:block" />
          接入协议，让每一次脉冲都被解析为可执行的视觉指令——
          <span className="text-glow-lime">点亮城市的下一道霓虹。</span>
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={reduce ? undefined : item}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <NeonButton accent="pink" href="#access" className="font-bold">
            接入脉冲 / JACK IN
          </NeonButton>
          <NeonButton accent="cyan" variant="ghost" href="#protocol">
            浏览协议 / VIEW PROTOCOL
          </NeonButton>
        </motion.div>

        {/* Hero 数据条 */}
        <motion.dl
          variants={reduce ? undefined : item}
          className="mt-16 grid max-w-2xl grid-cols-1 gap-px overflow-hidden border border-ink-line bg-ink-line sm:grid-cols-3"
        >
          {HERO_STATS.map((s) => (
            <div
              key={s.label}
              className="corner-ticks relative bg-ink-base/80 p-4 backdrop-blur"
            >
              <dt className="font-data text-[10px] uppercase tracking-[0.25em] text-white/50">
                {s.label}
              </dt>
              <dd className="mt-1 font-display text-2xl text-glow-cyan">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* 滚动提示 */}
      <a
        href="#protocol"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-data text-[10px] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-neon-cyan"
      >
        <span className="block animate-bounce text-neon-cyan/80">
          <ChevronDown className="mx-auto h-5 w-5" />
        </span>
        <span className="mt-1 block">SCROLL · 向下滚动</span>
      </a>
    </section>
  );
}
