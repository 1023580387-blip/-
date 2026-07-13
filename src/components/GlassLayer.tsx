import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassLayerProps {
  children?: ReactNode;
  className?: string;
  depth?: "shallow" | "medium" | "deep";
  animate?: boolean;
  style?: React.CSSProperties;
}

const depthClasses = {
  shallow: "glass-layer-acrylic",
  medium: "glass-panel",
  deep: "glass-layer-deep",
};

export default function GlassLayer({
  children,
  className = "",
  depth = "medium",
  animate = true,
  style,
}: GlassLayerProps) {
  const Component = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.7, ease: "easeOut" },
      }
    : {};

  return (
    <Component
      className={`${depthClasses[depth]} ${className}`}
      style={style}
      {...motionProps}
    >
      {children}
    </Component>
  );
}