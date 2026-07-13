import { FOOTER_COLUMNS, SOCIAL_LINKS, NAV_LINKS } from "@/data/content";

export default function SiteFooter() {
  return (
    <footer className="relative px-6 pt-20">
      {/* 顶部霓虹分隔线 */}
      <div className="neon-rule mb-16" />

      <div className="container mx-auto max-w-6xl pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* 品牌列 */}
          <div className="md:col-span-1">
            <div className="font-display text-2xl text-glow-cyan">
              NEON<span className="text-white/30">//</span>PULSE
            </div>
            <p className="mt-4 font-mono text-xs leading-relaxed text-white/50">
              霓虹脉冲集体。
              <br />
              点亮城市的下一道霓虹。
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center border border-ink-line text-white/50 transition-all hover:border-neon-cyan/70 hover:text-neon-cyan hover:shadow-neon-cyan"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.4} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* 链接列 */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-data text-[10px] uppercase tracking-[0.3em] text-neon-pink/70">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-sm text-white/60 transition-colors hover:text-neon-cyan"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 快速导航 */}
        <nav className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink-line pt-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-data text-[10px] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-neon-cyan"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* 底部版权 */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 font-data text-[10px] uppercase tracking-[0.25em] text-white/30 sm:flex-row sm:items-center">
          <span>© 2087 NEON//PULSE · ALL FREQUENCIES RESERVED</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-neon-lime" />
            SIGNAL STABLE · 99.7%
          </span>
        </div>
      </div>
    </footer>
  );
}
