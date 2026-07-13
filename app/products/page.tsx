"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlassPanel from "@/components/GlassPanel";
import HologramVideo from "@/components/HologramVideo";
import { VIDEO_URLS } from "@/lib/videos";

const products = [
  {
    id: 1,
    name: "NEXUS NODE",
    tag: "边缘计算单元",
    desc: "分布式推理，毫秒级响应",
    video: VIDEO_URLS.compute1,
  },
  {
    id: 2,
    name: "AETHER CORE",
    tag: "云端算力集群",
    desc: "弹性扩展，百万级并发",
    video: VIDEO_URLS.dataCenter,
  },
  {
    id: 3,
    name: "CITY LENS",
    tag: "数字孪生平台",
    desc: "全域感知，实时映射",
    video: VIDEO_URLS.city1,
  },
  {
    id: 4,
    name: "PULSE LINK",
    tag: "智能网络中枢",
    desc: "低延迟传输，自愈拓扑",
    video: VIDEO_URLS.network,
  },
  {
    id: 5,
    name: "VOID ARRAY",
    tag: "高密度存储阵列",
    desc: "冷热分级，秒级读取",
    video: VIDEO_URLS.abstract1,
  },
];

export default function Products() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    setWidth(
      containerRef.current.scrollWidth - containerRef.current.offsetWidth
    );
  }, []);

  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-ink via-[#070a10] to-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.06),transparent_40%)]" />

      <div className="relative z-10 px-8 pt-24 md:px-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 text-xs tracking-[0.35em] text-ice/70"
        >
          PRODUCTS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl tracking-[0.15em] text-white md:text-5xl"
        >
          算力产品矩阵
        </motion.h2>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 flex flex-1 items-center overflow-hidden px-8 md:px-16"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="flex cursor-grab gap-8 md:gap-12"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7 }}
            >
              <GlassPanel className="flex h-[62vh] w-[78vw] flex-col overflow-hidden rounded-3xl border-white/10 bg-white/[0.04] md:w-[32vw]">
                <div className="relative h-[55%] w-full">
                  <HologramVideo
                    src={product.video}
                    className="absolute inset-0 h-full w-full rounded-none border-0"
                    videoClassName="opacity-70"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] tracking-widest text-ice backdrop-blur-md">
                    {product.tag}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-end p-6 md:p-8">
                  <h3 className="font-display text-2xl tracking-[0.15em] text-white md:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 md:text-base">
                    {product.desc}
                  </p>
                  <div className="mt-6 h-[1px] w-12 bg-gradient-to-r from-ice to-transparent" />
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-xs tracking-widest text-white/30">
        拖拽浏览
      </div>
    </section>
  );
}
