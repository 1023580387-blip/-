import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * 粘性顶部导航：滚动后背景变实，霓虹下边框。
 */
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-neon-cyan/20 bg-ink-void/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="group flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 animate-pulse-glow rounded-full bg-neon-pink shadow-neon-pink" />
          <span className="font-display text-lg text-glow-cyan">
            NEON<span className="text-white/30">//</span>PULSE
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-data text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-neon-cyan"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-neon-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#access"
          className="neon-sweep border border-neon-pink/70 px-4 py-2 font-data text-[10px] uppercase tracking-[0.25em] text-neon-pink transition-all hover:-translate-y-0.5 hover:shadow-neon-pink"
        >
          JACK IN
        </a>
      </div>
    </header>
  );
}
