import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, Terminal } from "lucide-react";
import { useAccessStore } from "@/store/useAccessStore";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

const CHANNELS = [
  { id: "default", label: "主频道 · MAIN" },
  { id: "visual", label: "视觉 · VISUAL" },
  { id: "audio", label: "音频 · AUDIO" },
  { id: "code", label: "代码 · CODE" },
];

export default function AccessCTA() {
  const { handle, channel, status, setHandle, setChannel, submit, reset } =
    useAccessStore();
  const reduce = useReducedMotion();

  const canSubmit = handle.trim().length >= 2 && status === "idle";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) submit();
  };

  return (
    <section id="access" className="relative px-6 py-28">
      <div className="container mx-auto max-w-3xl">
        <ScrollReveal>
          <SectionHeading
            tag="// 05 · ACCESS"
            title="接入脉冲"
            accent="pink"
            align="center"
            description="提交你的代号与频道。脉冲集体将在 12ms 内完成握手，分配节点编号。"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-14">
          <div className="corner-ticks relative border border-ink-line bg-ink-base/70 p-8 text-neon-cyan backdrop-blur sm:p-10">
            <AnimatePresence mode="wait">
              {status !== "connected" ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* 终端头 */}
                  <div className="mb-2 flex items-center gap-2 font-data text-[11px] uppercase tracking-[0.25em] text-white/50">
                    <Terminal className="h-4 w-4 text-neon-cyan" />
                    <span>/dev/pulse · access-request</span>
                  </div>

                  {/* 代号输入 */}
                  <div>
                    <label
                      htmlFor="handle"
                      className="mb-2 block font-data text-[10px] uppercase tracking-[0.3em] text-white/50"
                    >
                      代号 / HANDLE
                    </label>
                    <input
                      id="handle"
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="anonymous_7741"
                      maxLength={24}
                      className="w-full border border-ink-line bg-ink-void/60 px-4 py-3 font-mono text-sm text-neon-cyan placeholder:text-white/25 focus:border-neon-cyan/70 focus:outline-none focus:shadow-neon-cyan"
                    />
                  </div>

                  {/* 频道选择 */}
                  <div>
                    <span className="mb-2 block font-data text-[10px] uppercase tracking-[0.3em] text-white/50">
                      频道 / CHANNEL
                    </span>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {CHANNELS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setChannel(c.id)}
                          className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-all ${
                            channel === c.id
                              ? "border-neon-pink/70 bg-neon-pink/10 text-glow-pink shadow-neon-pink"
                              : "border-ink-line text-white/50 hover:border-neon-cyan/50 hover:text-neon-cyan"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 提交按钮 */}
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="neon-sweep group relative flex w-full items-center justify-center gap-2 border border-neon-pink/70 bg-ink-void/40 px-6 py-4 font-mono text-xs uppercase tracking-[0.25em] text-neon-pink transition-all hover:-translate-y-0.5 hover:shadow-neon-pink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>握手ing...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">
                          {canSubmit
                            ? "接入脉冲 / JACK IN →"
                            : "请输入代号 (≥2字符)"}
                        </span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="py-6 text-center"
                >
                  <CheckCircle2 className="mx-auto h-14 w-14 text-glow-lime" />
                  <p className="mt-6 font-display text-2xl text-glow-lime">
                    接入成功
                  </p>
                  <p className="mt-3 font-mono text-sm text-white/70">
                    欢迎，<span className="text-glow-cyan">{handle || "anonymous"}</span>
                    <br />
                    节点编号{" "}
                    <span className="text-glow-pink">
                      #NP-{Math.floor(1000 + Math.random() * 9000)}
                    </span>{" "}
                    · 频道 {channel.toUpperCase()}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 font-data text-[10px] uppercase tracking-[0.3em] text-neon-lime/70">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-neon-lime" />
                    PULSE ACTIVE · 12ms
                  </div>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={reset}
                      className="font-data text-[10px] uppercase tracking-[0.3em] text-white/40 underline-offset-4 transition-colors hover:text-neon-cyan hover:underline"
                    >
                      ↺ 重新接入
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
