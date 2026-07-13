import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Accent = "pink" | "cyan" | "lime" | "magenta";

const ACCENT_BORDER: Record<Accent, string> = {
  pink: "border-neon-pink/70 hover:shadow-neon-pink",
  cyan: "border-neon-cyan/70 hover:shadow-neon-cyan",
  lime: "border-neon-lime/70 hover:shadow-neon-lime",
  magenta: "border-neon-magenta/70 hover:shadow-neon-magenta",
};

const ACCENT_TEXT: Record<Accent, string> = {
  pink: "text-neon-pink",
  cyan: "text-neon-cyan",
  lime: "text-neon-lime",
  magenta: "text-neon-magenta",
};

type NeonButtonProps = {
  children: ReactNode;
  accent?: Accent;
  variant?: "solid" | "ghost";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

/**
 * 霓虹按钮：透明背景 + 霓虹边框 + 辉光阴影，hover 扫光 + 填色脉冲。
 */
export default function NeonButton({
  children,
  accent = "cyan",
  variant = "solid",
  href,
  onClick,
  type = "button",
  className,
}: NeonButtonProps) {
  const base = cn(
    "neon-sweep group relative inline-flex items-center justify-center gap-2",
    "border px-6 py-3 font-mono text-xs uppercase tracking-[0.2em]",
    "transition-all duration-300 hover:-translate-y-0.5",
    ACCENT_BORDER[accent],
    ACCENT_TEXT[accent],
    variant === "solid" && "bg-ink-base/60",
    variant === "ghost" && "bg-transparent",
    className,
  );

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span
          className={cn(
            "absolute inset-0 animate-pulse-glow",
            accent === "pink" && "bg-neon-pink/10",
            accent === "cyan" && "bg-neon-cyan/10",
            accent === "lime" && "bg-neon-lime/10",
            accent === "magenta" && "bg-neon-magenta/10",
          )}
        />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={base}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {inner}
    </button>
  );
}
