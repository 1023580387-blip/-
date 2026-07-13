import { cn } from "@/lib/utils";

type Accent = "pink" | "cyan" | "lime" | "magenta";

const ACCENT_TEXT: Record<Accent, string> = {
  pink: "text-glow-pink",
  cyan: "text-glow-cyan",
  lime: "text-glow-lime",
  magenta: "text-glow-magenta",
};

type SectionHeadingProps = {
  tag: string;
  title: string;
  description?: string;
  accent?: Accent;
  align?: "left" | "center";
};

/**
 * 区块标题：带编号标签 + 霓虹主标题 + 描述。
 */
export default function SectionHeading({
  tag,
  title,
  description,
  accent = "cyan",
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <div
        className={cn(
          "mb-4 flex items-center gap-3 font-data text-[11px] uppercase tracking-[0.3em]",
          align === "center" && "justify-center",
        )}
      >
        <span className={cn("h-px w-10", accentBg(accent))} />
        <span className={ACCENT_TEXT[accent]}>{tag}</span>
        <span className={cn("h-px w-10", accentBg(accent))} />
      </div>
      <h2 className="font-display text-[clamp(1.8rem,5vw,3.2rem)] leading-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-mono text-sm leading-relaxed text-white/60">
          {description}
        </p>
      )}
    </div>
  );
}

function accentBg(accent: Accent) {
  return {
    pink: "bg-neon-pink/60",
    cyan: "bg-neon-cyan/60",
    lime: "bg-neon-lime/60",
    magenta: "bg-neon-magenta/60",
  }[accent];
}
