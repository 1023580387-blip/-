import { cn } from "@/lib/utils";

type Accent = "pink" | "cyan" | "lime" | "magenta";

const ACCENT_TEXT: Record<Accent, string> = {
  pink: "text-glow-pink",
  cyan: "text-glow-cyan",
  lime: "text-glow-lime",
  magenta: "text-glow-magenta",
};

type GlitchTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  accent?: Accent;
  className?: string;
};

/**
 * 故障文字：基于 .glitch 伪元素的双通道 RGB 偏移。
 * 尊重 prefers-reduced-motion（在 index.css 中降级为静态）。
 */
export default function GlitchText({
  text,
  as = "span",
  accent = "cyan",
  className,
}: GlitchTextProps) {
  const Tag = as;
  return (
    <Tag
      data-text={text}
      className={cn("glitch font-display", ACCENT_TEXT[accent], className)}
    >
      {text}
    </Tag>
  );
}
