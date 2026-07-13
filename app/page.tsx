"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassPanel from "@/components/GlassPanel";
import HologramVideo from "@/components/HologramVideo";
import WindshieldOverlay from "@/components/WindshieldOverlay";
import { VIDEO_URLS } from "@/lib/videos";

const scenes = [
  {
    key: "city",
    gradient:
      "radial-gradient(circle at 70% 30%, rgba(34,211,238,0.12), transparent 50%), linear-gradient(to bottom, #050507, #0a0f14)",
    title: "DIGITAL CITY",
    subtitle: "智慧城市 · 实时算力",
  },
  {
    key: "compute",
    gradient:
      "radial-gradient(circle at 30% 40%, rgba(99,102,241,0.12), transparent 45%), linear-gradient(to bottom, #050507, #0d1018)",
    title: "COMPUTE CORE",
    subtitle: "数据中心 · 无限并行",
  },
  {
    key: "future",
    gradient:
      "radial-gradient(circle at 50% 60%, rgba(255,255,255,0.06), transparent 50%), linear-gradient(to bottom, #050507, #080a10)",
    title: "FUTURE DRIVE",
    subtitle: "未来座舱 · 沉浸感知",
  },
];

export default function Home() {
  const [scene, setScene] = useState(0);

  const nextScene = useCallback(() => {
    setScene((s) => (s + 1) % scenes.length);
  }, []);

  const prevScene = useCallback(() => {
    setScene((s) => (s - 1 + scenes.length) % scenes.length);
  }, []);

  useEffect(() => {
    let last = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - last < 900) return;
      last = now;
      if (e.deltaY > 0) nextScene();
      else prevScene();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") nextScene();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prevScene();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [nextScene, prevScene]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={scenes[scene].key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{ background: scenes[scene].gradient }}
        />
      </AnimatePresence>

      <WindshieldOverlay />

      {/* 三层悬浮玻璃空间 */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <GlassPanel
          float
          intensity="low"
          className="absolute left-[8%] top-[18%] h-40 w-28 opacity-40 md:h-56 md:w-40"
        />
        <GlassPanel
          float
          intensity="normal"
          className="absolute right-[10%] top-[28%] h-48 w-36 opacity-50 md:h-64 md:w-48"
        />
        <GlassPanel
          float
          intensity="low"
          className="absolute bottom-[20%] left-[15%] h-32 w-44 opacity-35 md:h-44 md:w-56"
        />
      </div>

      {/* 全息视频窗口 */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <HologramVideo
          src={VIDEO_URLS.compute1}
          className="absolute left-[6%] top-[14%] h-28 w-44 md:h-36 md:w-60"
        />
        <HologramVideo
          src={VIDEO_URLS.city1}
          className="absolute right-[5%] top-[12%] h-32 w-48 md:h-44 md:w-72"
        />
        <HologramVideo
          src={VIDEO_URLS.dataCenter}
          className="absolute bottom-[14%] left-[4%] h-28 w-48 md:h-40 md:w-64"
        />
        <HologramVideo
          src={VIDEO_URLS.compute2}
          className="absolute bottom-[18%] right-[8%] h-24 w-40 md:h-32 md:w-56"
        />
      </div>

      {/* 中心文案 */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-3 text-xs tracking-[0.4em] text-ice/80"
        >
          {scenes[scene].subtitle}
        </motion.p>
        <motion.h1
          key={scenes[scene].title}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl tracking-[0.25em] text-white md:text-6xl lg:text-7xl"
        >
          {scenes[scene].title}
        </motion.h1>
      </div>

      {/* 场景指示器 */}
      <div className="absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 gap-3">
        {scenes.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setScene(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === scene
                ? "w-8 bg-ice shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                : "bg-white/25 hover:bg-white/50"
            }`}
            aria-label={`切换到场景 ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
