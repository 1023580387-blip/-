"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import GlassPanel from "@/components/GlassPanel";
import HologramVideo from "@/components/HologramVideo";
import { VIDEO_URLS } from "@/lib/videos";

export default function Compute() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const layer1X = useTransform(mouseX, [-0.5, 0.5], [24, -24]);
  const layer1Y = useTransform(mouseY, [-0.5, 0.5], [16, -16]);
  const layer2X = useTransform(mouseX, [-0.5, 0.5], [-16, 16]);
  const layer2Y = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-ink"
    >
      {/* 环境光 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.08),transparent_55%)]" />

      {/* 顶部标题 */}
      <div className="relative z-10 px-8 pt-24 md:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-2 text-xs tracking-[0.35em] text-ice/70"
        >
          COMPUTE HALL
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl tracking-[0.15em] text-white md:text-5xl"
        >
          算力展厅
        </motion.h2>
      </div>

      {/* 视差玻璃层 + 全息大屏 */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 md:px-16">
        <motion.div
          style={{ x: layer1X, y: layer1Y }}
          className="pointer-events-none absolute left-[5%] top-[18%] hidden lg:block"
        >
          <GlassPanel
            float
            intensity="normal"
            className="h-48 w-36 opacity-40"
          />
        </motion.div>

        <motion.div
          style={{ x: layer2X, y: layer2Y }}
          className="pointer-events-none absolute right-[6%] top-[22%] hidden lg:block"
        >
          <GlassPanel
            float
            intensity="low"
            className="h-56 w-44 opacity-35"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2"
        >
          <HologramVideo
            src={VIDEO_URLS.compute1}
            className="h-56 w-full md:h-72"
          />
          <HologramVideo
            src={VIDEO_URLS.dataCenter}
            className="h-56 w-full md:h-72"
          />
          <HologramVideo
            src={VIDEO_URLS.compute2}
            className="h-56 w-full md:h-72"
          />
          <HologramVideo
            src={VIDEO_URLS.network}
            className="h-56 w-full md:h-72"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-2xl text-center"
        >
          <p className="text-sm leading-relaxed text-white/50 md:text-base">
            巨型全息屏幕同步呈现服务器运算、城市脉搏与网络拓扑。
            <br />
            移动鼠标，感受玻璃层随视线浮动的未来空间。
          </p>
        </motion.div>
      </div>

      {/* 镜面地面反射 */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[22vh] origin-bottom mirror-floor">
        <div
          className="h-full w-full opacity-30"
          style={{
            transform: "scaleY(-1)",
            background:
              "linear-gradient(to top, rgba(34,211,238,0.08), transparent)",
          }}
        />
      </div>
    </section>
  );
}
