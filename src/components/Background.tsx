import { useEffect, useState } from "react";

/**
 * 全局背景层：透视网格地面 + CRT 扫描线 + 噪点 + 缓动光斑。
 * 固定定位，作为整页氛围底色。
 */
export default function Background() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 深空底色 + 噪点 */}
      <div className="absolute inset-0 bg-ink-void bg-noise" />

      {/* 顶部辐射光晕 */}
      <div
        className="absolute -top-1/3 left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(176,38,255,0.22), rgba(255,0,110,0.12) 40%, transparent 70%)",
        }}
      />

      {/* 透视网格地面（下方） */}
      <div
        className="absolute bottom-0 left-1/2 h-[60vh] w-[200vw] -translate-x-1/2"
        style={{ perspective: "320px", perspectiveOrigin: "50% 0%" }}
      >
        <div
          className="grid-floor absolute inset-0 origin-top animate-grid-move"
          style={{
            transform: "rotateX(72deg)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 30%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 30%, black 100%)",
          }}
        />
      </div>

      {/* 缓动漂浮光斑 */}
      <div
        className={`absolute left-[12%] top-[28%] h-64 w-64 rounded-full opacity-40 blur-3xl transition-opacity duration-1000 ${
          mounted ? "opacity-40" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,0.35), transparent 70%)",
        }}
      />
      <div
        className="absolute right-[10%] top-[55%] h-72 w-72 animate-float rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(198,255,0,0.25), transparent 70%)",
        }}
      />

      {/* CRT 扫描线全屏叠层 */}
      <div className="scanlines absolute inset-0" />

      {/* 移动扫描光带 */}
      <div className="absolute inset-x-0 top-0 h-px animate-scan-move bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent shadow-[0_0_24px_rgba(0,240,255,0.6)]" />

      {/* 暗角 vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
