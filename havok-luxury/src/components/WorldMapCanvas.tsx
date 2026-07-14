'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoreLocation } from '@/lib/types';

interface WorldMapCanvasProps {
  stores: StoreLocation[];
  onStoreSelect?: (store: StoreLocation) => void;
}

interface TooltipData {
  store: StoreLocation;
  x: number;
  y: number;
}

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 600;

function geoToSvg(lng: number, lat: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * SVG_WIDTH;
  const y = ((90 - lat) / 180) * SVG_HEIGHT;
  return { x, y };
}

const continentLabels = [
  { label: 'NORTH AMERICA', x: 200, y: 180 },
  { label: 'EUROPE', x: 600, y: 120 },
  { label: 'MIDDLE EAST', x: 760, y: 210 },
  { label: 'ASIA', x: 920, y: 160 },
  { label: 'OCEANIA', x: 960, y: 440 },
];

export default function WorldMapCanvas({ stores, onStoreSelect }: WorldMapCanvasProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStoreClick = useCallback(
    (store: StoreLocation) => {
      onStoreSelect?.(store);
    },
    [onStoreSelect],
  );

  const handleDotEnter = useCallback((store: StoreLocation, x: number, y: number) => {
    setTooltip({ store, x, y });
  }, []);

  const handleDotLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-havok-carbon overflow-hidden"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Grid pattern */}
          <pattern id="map-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(154, 157, 165, 0.03)"
              strokeWidth="0.5"
            />
          </pattern>

          {/* Glow filter for dots */}
          <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="dot-glow-hover" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Continent fill gradient */}
          <linearGradient id="continent-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(154, 157, 165, 0.06)" />
            <stop offset="100%" stopColor="rgba(154, 157, 165, 0.02)" />
          </linearGradient>

          <linearGradient id="continent-fill-hover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(154, 157, 165, 0.10)" />
            <stop offset="100%" stopColor="rgba(154, 157, 165, 0.04)" />
          </linearGradient>
        </defs>

        {/* Background grid */}
        <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#map-grid)" />

        {/* Horizontal latitude lines */}
        {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600].map((y) => (
          <line
            key={`lat-${y}`}
            x1={0}
            y1={y}
            x2={SVG_WIDTH}
            y2={y}
            stroke="rgba(154, 157, 165, 0.04)"
            strokeWidth="0.5"
          />
        ))}

        {/* Vertical longitude lines */}
        {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200].map((x) => (
          <line
            key={`lng-${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2={SVG_HEIGHT}
            stroke="rgba(154, 157, 165, 0.04)"
            strokeWidth="0.5"
          />
        ))}

        {/* ============ CONTINENT OUTLINES ============ */}

        {/* North America */}
        <g className="continent-group cursor-pointer">
          <path
            d="
              M 45 80
              C 55 60, 80 40, 110 35
              C 140 30, 170 45, 200 55
              C 230 65, 260 75, 290 80
              C 320 85, 340 95, 350 115
              C 360 135, 365 155, 360 175
              C 355 195, 340 210, 320 225
              C 300 240, 280 255, 260 265
              C 240 275, 230 290, 225 305
              C 220 320, 230 335, 220 340
              C 210 345, 195 340, 185 335
              C 175 330, 170 320, 160 310
              C 150 300, 130 290, 115 280
              C 100 270, 85 255, 75 240
              C 65 225, 55 205, 50 185
              C 45 165, 40 140, 40 115
              C 40 95, 42 85, 45 80
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.15)"
            strokeWidth="0.8"
            className="transition-all duration-500 hover:fill-[url(#continent-fill-hover)]"
          />
          {/* Greenland */}
          <path
            d="
              M 375 45
              C 385 40, 400 38, 410 45
              C 420 52, 425 65, 420 78
              C 415 91, 405 98, 395 100
              C 385 102, 375 97, 370 85
              C 365 73, 368 55, 375 45
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.12)"
            strokeWidth="0.6"
          />
        </g>

        {/* Europe */}
        <g className="continent-group cursor-pointer">
          <path
            d="
              M 540 70
              C 555 55, 575 45, 595 40
              C 615 35, 635 38, 650 45
              C 665 52, 675 62, 680 75
              C 685 88, 682 102, 675 115
              C 668 128, 655 138, 645 148
              C 635 158, 628 170, 625 185
              C 622 200, 628 215, 635 225
              C 642 235, 650 242, 655 252
              C 660 262, 658 275, 650 282
              C 642 289, 630 292, 618 288
              C 606 284, 598 274, 590 265
              C 582 256, 578 245, 570 238
              C 562 231, 550 228, 540 220
              C 530 212, 522 198, 518 182
              C 514 166, 518 148, 525 130
              C 532 112, 535 92, 540 70
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.15)"
            strokeWidth="0.8"
            className="transition-all duration-500 hover:fill-[url(#continent-fill-hover)]"
          />
          {/* UK / Ireland */}
          <path
            d="
              M 530 55
              C 535 48, 542 42, 548 50
              C 554 58, 550 72, 544 78
              C 538 84, 528 82, 524 74
              C 520 66, 522 58, 530 55
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.12)"
            strokeWidth="0.6"
          />
          {/* Scandinavia */}
          <path
            d="
              M 600 25
              C 610 20, 622 22, 630 30
              C 638 38, 640 52, 635 65
              C 630 78, 618 85, 608 82
              C 598 79, 592 68, 590 55
              C 588 42, 592 30, 600 25
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.12)"
            strokeWidth="0.6"
          />
        </g>

        {/* Middle East */}
        <g className="continent-group cursor-pointer">
          <path
            d="
              M 720 175
              C 735 168, 755 165, 775 168
              C 795 171, 810 180, 820 195
              C 830 210, 825 228, 815 242
              C 805 256, 790 268, 775 278
              C 760 288, 745 295, 732 298
              C 719 301, 708 295, 700 282
              C 692 269, 690 252, 694 238
              C 698 224, 708 210, 712 198
              C 716 186, 710 178, 720 175
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.15)"
            strokeWidth="0.8"
            className="transition-all duration-500 hover:fill-[url(#continent-fill-hover)]"
          />
        </g>

        {/* Asia (including China, India, SE Asia, Russia) */}
        <g className="continent-group cursor-pointer">
          <path
            d="
              M 750 45
              C 780 38, 820 28, 860 30
              C 900 32, 940 40, 975 45
              C 1010 50, 1040 58, 1060 68
              C 1080 78, 1090 92, 1095 108
              C 1100 124, 1098 142, 1088 158
              C 1078 174, 1060 188, 1045 200
              C 1030 212, 1015 222, 1005 235
              C 995 248, 992 262, 988 275
              C 984 288, 975 298, 962 305
              C 949 312, 935 315, 920 310
              C 905 305, 895 292, 885 280
              C 875 268, 868 252, 858 240
              C 848 228, 835 220, 825 212
              C 815 204, 805 195, 798 182
              C 791 169, 790 155, 788 140
              C 786 125, 782 110, 775 98
              C 768 86, 758 75, 750 65
              C 742 55, 745 48, 750 45
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.15)"
            strokeWidth="0.8"
            className="transition-all duration-500 hover:fill-[url(#continent-fill-hover)]"
          />
          {/* Japan */}
          <path
            d="
              M 1095 115
              C 1105 108, 1115 115, 1118 128
              C 1121 141, 1118 158, 1112 170
              C 1106 182, 1098 188, 1092 182
              C 1086 176, 1084 162, 1086 148
              C 1088 134, 1090 120, 1095 115
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.12)"
            strokeWidth="0.6"
          />
          {/* India */}
          <path
            d="
              M 850 240
              C 865 235, 880 238, 892 245
              C 904 252, 912 265, 910 280
              C 908 295, 898 310, 885 318
              C 872 326, 855 325, 842 318
              C 829 311, 820 298, 818 282
              C 816 266, 824 250, 838 242
              C 844 239, 848 240, 850 240
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.15)"
            strokeWidth="0.8"
          />
          {/* Southeast Asia / Indonesia */}
          <path
            d="
              M 940 280
              C 955 275, 970 278, 980 288
              C 990 298, 985 312, 975 322
              C 965 332, 945 335, 930 325
              C 915 315, 912 298, 920 285
              C 925 280, 932 278, 940 280
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.12)"
            strokeWidth="0.6"
          />
          {/* Korean Peninsula */}
          <path
            d="
              M 1070 135
              C 1078 128, 1088 132, 1090 145
              C 1092 158, 1088 172, 1080 178
              C 1072 184, 1064 178, 1062 165
              C 1060 152, 1062 140, 1070 135
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.12)"
            strokeWidth="0.6"
          />
        </g>

        {/* Australia / Oceania */}
        <g className="continent-group cursor-pointer">
          <path
            d="
              M 900 380
              C 930 365, 970 358, 1010 362
              C 1050 366, 1080 380, 1095 400
              C 1110 420, 1105 445, 1085 462
              C 1065 479, 1035 488, 1000 488
              C 965 488, 935 478, 915 460
              C 895 442, 885 418, 890 398
              C 895 388, 898 382, 900 380
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.15)"
            strokeWidth="0.8"
            className="transition-all duration-500 hover:fill-[url(#continent-fill-hover)]"
          />
          {/* New Zealand */}
          <path
            d="
              M 1110 465
              C 1118 460, 1125 468, 1122 482
              C 1119 496, 1108 508, 1100 505
              C 1092 502, 1088 490, 1092 478
              C 1096 466, 1104 463, 1110 465
              Z
            "
            fill="url(#continent-fill)"
            stroke="rgba(154, 157, 165, 0.10)"
            strokeWidth="0.5"
          />
        </g>

        {/* ============ CONNECTING LINES BETWEEN REGIONS ============ */}
        <g opacity="0.12">
          {/* NA to Europe */}
          <line x1={370} y1={140} x2={540} y2={130} stroke="#9A9DA5" strokeWidth="0.5" />
          {/* Europe to Middle East */}
          <line x1={650} y1={240} x2={720} y2={220} stroke="#9A9DA5" strokeWidth="0.5" />
          {/* Middle East to Asia */}
          <line x1={800} y1={200} x2={820} y2={180} stroke="#9A9DA5" strokeWidth="0.5" />
          {/* Asia to Australia */}
          <line x1={960} y1={330} x2={960} y2={370} stroke="#9A9DA5" strokeWidth="0.5" />
          {/* Europe to Asia (northern route) */}
          <line x1={680} y1={70} x2={750} y2={55} stroke="#9A9DA5" strokeWidth="0.5" />
          {/* NA to Asia (pacific) */}
          <line x1={360} y1={200} x2={1080} y2={170} stroke="#9A9DA5" strokeWidth="0.3" strokeDasharray="4,6" />
        </g>

        {/* ============ CONTINENT LABELS ============ */}
        {continentLabels.map((cl) => (
          <text
            key={cl.label}
            x={cl.x}
            y={cl.y}
            fill="rgba(107, 138, 142, 0.4)"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="8"
            fontWeight="300"
            letterSpacing="3"
            textAnchor="middle"
            className="pointer-events-none select-none"
          >
            {cl.label}
          </text>
        ))}

        {/* ============ STORE LOCATION DOTS ============ */}
        {stores.map((store) => {
          const { x, y } = geoToSvg(store.coordinates.lng, store.coordinates.lat);
          const isHovered = tooltip?.store.id === store.id;

          return (
            <g key={store.id}>
              {/* Connecting line from continent to dot */}
              <line
                x1={x}
                y1={y}
                x2={x}
                y2={y + 14}
                stroke="rgba(154, 157, 165, 0.25)"
                strokeWidth="0.5"
                className="pointer-events-none"
              />

              {/* Outer pulse ring */}
              <motion.circle
                cx={x}
                cy={y}
                r={isHovered ? 10 : 6}
                fill="none"
                stroke="rgba(107, 138, 142, 0.3)"
                strokeWidth="0.5"
                animate={{
                  r: isHovered ? [10, 14, 10] : [6, 10, 6],
                  opacity: isHovered ? [0.5, 0.2, 0.5] : [0.4, 0.1, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="pointer-events-none"
              />

              {/* Inner dot */}
              <motion.circle
                cx={x}
                cy={y}
                r={isHovered ? 4.5 : 2.5}
                fill={isHovered ? '#8BA8AC' : '#6B8A8E'}
                filter={isHovered ? 'url(#dot-glow-hover)' : 'url(#dot-glow)'}
                animate={{
                  opacity: isHovered ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => handleDotEnter(store, x, y)}
                onMouseLeave={handleDotLeave}
                onClick={() => handleStoreClick(store)}
              />

              {/* Invisible larger hit area */}
              <circle
                cx={x}
                cy={y}
                r={14}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => handleDotEnter(store, x, y)}
                onMouseLeave={handleDotLeave}
                onClick={() => handleStoreClick(store)}
              />
            </g>
          );
        })}
      </svg>

      {/* ============ TOOLTIP ============ */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute pointer-events-none z-50"
            style={{
              left: `${(tooltip.x / SVG_WIDTH) * 100}%`,
              top: `${(tooltip.y / SVG_HEIGHT) * 100}%`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            <div className="bg-havok-glass backdrop-blur-glass border border-havok-glass-border rounded-glass px-3 py-2 shadow-lg">
              <p className="text-havok-platinum text-[11px] font-[350] leading-tight tracking-[0.02em] whitespace-nowrap">
                {tooltip.store.name}
              </p>
              <p className="text-havok-frost text-[10px] font-[300] leading-tight tracking-[0.04em] whitespace-nowrap mt-0.5">
                {tooltip.store.city}, {tooltip.store.country}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}