"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/GlassPanel";
import HologramVideo from "@/components/HologramVideo";
import { VIDEO_URLS } from "@/lib/videos";

const milestones = [
  {
    year: "2019",
    title: "MAISON ÉCLAT 诞生",
    desc: "以「光之宅邸」为名，开启高端算力品牌之路。",
    video: VIDEO_URLS.abstract1,
  },
  {
    year: "2021",
    title: "城市级算力网络",
    desc: "首个数字孪生城市项目落地，连接十万级边缘节点。",
    video: VIDEO_URLS.city2,
  },
  {
    year: "2023",
    title: "自研推理芯片",
    desc: "低延迟 AI 推理架构发布，能效比提升 400%。",
    video: VIDEO_URLS.compute2,
  },
  {
    year: "2025",
    title: "未来座舱生态",
    desc: "算力与移动空间融合，定义下一代沉浸式出行。",
    video: VIDEO_URLS.abstract2,
  },
];

export default function About() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-1/4 top-0 h-[80vh] w-[80vh] rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-[-10%] h-[60vh] w-[60vh] rounded-full bg-ice/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 px-8 pt-24 md:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-2 text-xs tracking-[0.35em] text-ice/70"
        >
          ABOUT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl tracking-[0.15em] text-white md:text-5xl"
        >
          品牌历程
        </motion.h2>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-8 py-20 md:px-16">
        <div className="relative">
          {/* 时间轴线 */}
          <div className="absolute left-4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent md:left-1/2" />

          {milestones.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative mb-24 flex items-center md:justify-center ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* 节点圆点 */}
                <div className="absolute left-4 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-ice shadow-[0_0_12px_rgba(34,211,238,0.6)] md:left-1/2" />

                <div
                  className={`pl-12 md:w-[calc(50%-3rem)] ${
                    isLeft ? "md:pr-12 md:pl-0" : "md:pl-12"
                  }`}
                >
                  <GlassPanel
                    float={false}
                    intensity="normal"
                    className="overflow-hidden rounded-2xl p-0"
                  >
                    <div className="grid grid-cols-1 gap-0 md:grid-cols-[1.2fr_1fr]">
                      <div className="p-6 md:p-8">
                        <span className="font-display text-sm tracking-[0.2em] text-ice/80">
                          {item.year}
                        </span>
                        <h3 className="mt-2 font-display text-xl tracking-[0.1em] text-white md:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/50">
                          {item.desc}
                        </p>
                      </div>
                      <div className="relative h-40 w-full md:h-auto">
                        <HologramVideo
                          src={item.video}
                          className="absolute inset-0 h-full w-full rounded-none border-0"
                          videoClassName="opacity-65"
                        />
                      </div>
                    </div>
                  </GlassPanel>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 pb-16 text-center text-xs tracking-[0.3em] text-white/30"
      >
        MAISON ÉCLAT © 2025
      </motion.footer>
    </section>
  );
}
