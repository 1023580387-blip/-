import { useEffect, useRef, useState } from "react";
import { useTerminalStream } from "@/hooks/useTerminalStream";
import { LIVE_STATS, TERMINAL_LOGS, type Stat } from "@/data/content";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

const ACCENT_TEXT: Record<Stat["accent"], string> = {
  pink: "text-glow-pink",
  cyan: "text-glow-cyan",
  lime: "text-glow-lime",
  magenta: "text-glow-magenta",
};

/**
 * 动态计数器：从 0 滚动到目标值的简化版（基于百分比字符串解析）。
 */
function useCountUp(target: string, active: boolean, duration = 1400) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    // 解析出数值与前后缀
    const match = target.match(/([\d,.]+)/);
    if (!match) {
      setDisplay(target);
      return;
    }
    const numStr = match[1].replace(/,/g, "");
    const num = parseFloat(numStr);
    if (Number.isNaN(num)) {
      setDisplay(target);
      return;
    }
    const prefix = target.slice(0, match.index);
    const suffix = target.slice((match.index ?? 0) + match[1].length);
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = num * eased;
      const formatted = match[1].includes(".")
        ? current.toFixed(1)
        : Math.round(current).toLocaleString();
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (p < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target, active, duration]);

  return display;
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const display = useCountUp(stat.value, active);

  return (
    <div
      ref={ref}
      className="corner-ticks relative border border-ink-line bg-ink-base/60 p-6 backdrop-blur"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <dt className="font-data text-[10px] uppercase tracking-[0.25em] text-white/45">
        {stat.label}
      </dt>
      <dd className={`mt-2 font-display text-3xl ${ACCENT_TEXT[stat.accent]}`}>
        {display}
      </dd>
      {/* 底部进度条 */}
      <div className="mt-4 h-px w-full bg-ink-line">
        <div
          className={`h-px ${
            stat.accent === "pink"
              ? "bg-neon-pink"
              : stat.accent === "cyan"
                ? "bg-neon-cyan"
                : stat.accent === "lime"
                  ? "bg-neon-lime"
                  : "bg-neon-magenta"
          }`}
          style={{
            width: active ? "100%" : "0%",
            transition: "width 1.4s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: `${index * 80}ms`,
            boxShadow: "0 0 8px currentColor",
          }}
        />
      </div>
    </div>
  );
}

export default function DataPulse() {
  const { visible, containerRef } = useTerminalStream(TERMINAL_LOGS, 850);

  return (
    <section id="pulse" className="relative px-6 py-28">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            tag="// 03 · PULSE"
            title="实时脉冲"
            accent="lime"
            description="脉冲集体永远在运行。下方为骨干节点的实时遥测与终端日志流——这是一座活着的霓虹城市。"
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* 数据指标 */}
          <ScrollReveal className="lg:col-span-2" delay={0.1}>
            <dl className="grid h-full grid-cols-2 gap-4">
              {LIVE_STATS.map((s, i) => (
                <StatCard key={s.label} stat={s} index={i} />
              ))}
            </dl>
          </ScrollReveal>

          {/* 终端日志流 */}
          <ScrollReveal className="lg:col-span-3" delay={0.2}>
            <div className="relative flex h-full flex-col overflow-hidden border border-ink-line bg-ink-void/80 backdrop-blur">
              {/* 终端标题栏 */}
              <div className="flex items-center justify-between border-b border-ink-line bg-ink-base/60 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-pink/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-lime/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/80" />
                  <span className="ml-3 font-data text-[10px] uppercase tracking-[0.25em] text-white/50">
                    /dev/pulse · live
                  </span>
                </div>
                <span className="font-data text-[10px] uppercase tracking-[0.25em] text-neon-lime/70">
                  ◉ REC
                </span>
              </div>

              {/* 日志内容 */}
              <div
                ref={containerRef}
                className="scanlines relative h-72 overflow-y-auto p-4 font-data text-[12px] leading-relaxed sm:h-80"
              >
                {visible.map((line, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="select-none text-white/25">
                      {String(i).padStart(3, "0")}
                    </span>
                    <span
                      className={
                        line.startsWith("[OK ")
                          ? "text-neon-lime"
                          : line.startsWith("[WARN]")
                            ? "text-neon-pink"
                            : line.startsWith("[EXEC]")
                              ? "text-neon-cyan"
                              : line.startsWith("[PULSE]")
                                ? "text-glow-magenta"
                                : "text-white/70"
                      }
                    >
                      {line}
                    </span>
                  </div>
                ))}
                {/* 闪烁光标 */}
                <div className="flex gap-2">
                  <span className="select-none text-white/25">
                    {String(visible.length).padStart(3, "0")}
                  </span>
                  <span className="text-neon-lime">
                    pulse@neo-shanghai:~${" "}
                    <span className="inline-block h-3 w-2 translate-y-0.5 animate-cursor-blink bg-neon-lime" />
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
