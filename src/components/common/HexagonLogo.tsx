import { motion } from 'framer-motion';

interface HexagonLogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function HexagonLogo({ size = 'md', animated = false }: HexagonLogoProps) {
  const sizeMap = {
    sm: 40,
    md: 80,
    lg: 200,
  };

  const dimension = sizeMap[size];

  const logo = (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 5L93.3013 27.5V72.5L50 95L6.69873 72.5V27.5L50 5Z"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M50 20L75 35V65L50 80L25 65V35L50 20Z"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill="url(#gradient)"
        fontSize="24"
        fontFamily="Orbitron"
        fontWeight="700"
      >
        H
      </text>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#0088cc" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {logo}
      </motion.div>
    );
  }

  return logo;
}
