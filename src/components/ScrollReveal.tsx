import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

/**
 * 滚动揭示：进入视口时淡入上移。
 * 尊重 prefers-reduced-motion，降级为直接显示。
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
