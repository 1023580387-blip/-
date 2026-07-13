import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { useSceneSwitch } from "@/hooks/useSceneSwitch";
import Preloader from "@/components/Preloader";
import GlassLayer from "@/components/GlassLayer";
import VideoPanel from "@/components/VideoPanel";
import SceneIndicator from "@/components/SceneIndicator";

const VIDEO_URLS = {
  computing:
    "https://assets.mixkit.co/videos/preview/mixkit-server-room-with-blue-lights-3126-large.mp4",
  city:
    "https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-a-city-at-night-34571-large.mp4",
  neural:
    "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-of-connections-31271-large.mp4",
};

const SCENES = [
  {
    id: 0,
    title: "Nexus Computing",
    subtitle: "Next-Generation AI Infrastructure",
    description:
      "Harness the power of distributed neural computing with petabyte-scale throughput and sub-millisecond latency.",
    stat: "99.99%",
    statLabel: "Uptime SLA",
    videos: [
      {
        src: VIDEO_URLS.computing,
        className:
          "top-[10%] right-[8%] w-[340px] h-[200px] md:w-[480px] md:h-[280px]",
        floatDelay: 0,
        floatDuration: 8,
        opacity: 0.4,
      },
      {
        src: VIDEO_URLS.computing,
        className:
          "bottom-[12%] left-[5%] w-[240px] h-[150px] md:w-[340px] md:h-[210px]",
        floatDelay: 1.5,
        floatDuration: 7,
        opacity: 0.3,
      },
    ],
  },
  {
    id: 1,
    title: "Digital Nexus",
    subtitle: "Global Compute Mesh",
    description:
      "Interconnected data centers spanning 40+ regions, delivering seamless AI workloads at planetary scale.",
    stat: "40+",
    statLabel: "Global Regions",
    videos: [
      {
        src: VIDEO_URLS.city,
        className:
          "top-[8%] left-[8%] w-[300px] h-[180px] md:w-[440px] md:h-[260px]",
        floatDelay: 0,
        floatDuration: 9,
        opacity: 0.35,
      },
      {
        src: VIDEO_URLS.city,
        className:
          "bottom-[10%] right-[6%] w-[260px] h-[160px] md:w-[380px] md:h-[230px]",
        floatDelay: 2,
        floatDuration: 7.5,
        opacity: 0.3,
      },
    ],
  },
  {
    id: 2,
    title: "Neural Core",
    subtitle: "Intelligence at Scale",
    description:
      "Purpose-built for large language models and generative AI, with exaflop-class performance on demand.",
    stat: "1.2 EF",
    statLabel: "Peak Performance",
    videos: [
      {
        src: VIDEO_URLS.neural,
        className:
          "top-[12%] right-[10%] w-[310px] h-[190px] md:w-[460px] md:h-[270px]",
        floatDelay: 0.5,
        floatDuration: 8,
        opacity: 0.38,
      },
      {
        src: VIDEO_URLS.neural,
        className:
          "bottom-[14%] left-[8%] w-[220px] h-[140px] md:w-[320px] md:h-[200px]",
        floatDelay: 2,
        floatDuration: 6.5,
        opacity: 0.28,
      },
    ],
  },
];

const sceneVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

function SceneBackground() {
  return (
    <>
      <div className="marble-texture" />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(163,213,224,0.04) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function SceneContent({
  scene,
  direction,
}: {
  scene: (typeof SCENES)[0];
  direction: number;
}) {
  return (
    <motion.div
      key={scene.id}
      className="absolute inset-0 flex items-center justify-center"
      custom={direction}
      variants={sceneVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
    >
      <SceneBackground />

      {scene.videos.map((video, i) => (
        <VideoPanel
          key={i}
          src={video.src}
          className={video.className}
          floatDelay={video.floatDelay}
          floatDuration={video.floatDuration}
          opacity={video.opacity}
        />
      ))}

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
          <div className="flex-1">
            <GlassLayer depth="deep" className="p-8 md:p-12 lg:p-16" animate={false}>
              <motion.p
                className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-titanium-500 uppercase mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {scene.subtitle}
              </motion.p>

              <motion.h2
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ice-100 leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {scene.title.split(" ").map((word, i) => (
                  <span key={i}>
                    {i === 1 ? (
                      <span className="text-cyan-glow text-glow-cyan italic font-light">
                        {word}{" "}
                      </span>
                    ) : (
                      <span>{word} </span>
                    )}
                  </span>
                ))}
              </motion.h2>

              <motion.p
                className="font-sans text-sm md:text-base text-titanium-400 mt-6 max-w-lg leading-relaxed font-light"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {scene.description}
              </motion.p>

              <motion.div
                className="mt-8 flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <button className="px-8 py-3 glass-layer-acrylic text-ice-100 font-sans text-sm tracking-wider uppercase hover:bg-white/[0.08] transition-all duration-500">
                  Explore Platform
                </button>
                <span className="text-titanium-600">|</span>
                <button className="font-sans text-sm text-titanium-400 tracking-wider uppercase hover:text-ice-200 transition-colors duration-300">
                  Documentation
                </button>
              </motion.div>
            </GlassLayer>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlassLayer depth="shallow" className="p-10 md:p-14 text-center min-w-[160px]">
              <motion.div
                className="font-serif text-5xl md:text-7xl font-light text-cyan-glow text-glow-cyan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {scene.stat}
              </motion.div>
              <motion.p
                className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-titanium-500 uppercase mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {scene.statLabel}
              </motion.p>
            </GlassLayer>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-[9px] tracking-[0.3em] text-titanium-600 uppercase">
            Scroll
          </span>
          <div className="w-px h-6 bg-gradient-to-b from-cyan-glow/50 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LuxuryExperienceCanvas() {
  const { currentScene, isPreloading } = useAppStore();
  const { switchScene } = useSceneSwitch();
  const prevScene = useRef(0);

  useEffect(() => {
    prevScene.current = currentScene;
  }, [currentScene]);

  const direction = currentScene > prevScene.current ? 1 : -1;

  return (
    <div className="relative w-full h-full overflow-hidden bg-abyss-900">
      <Preloader />

      <AnimatePresence mode="popLayout" custom={direction}>
        {!isPreloading && (
          <SceneContent
            key={currentScene}
            scene={SCENES[currentScene]}
            direction={direction}
          />
        )}
      </AnimatePresence>

      <SceneIndicator />

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-glow/15 to-transparent z-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-glow/10 to-transparent z-40 pointer-events-none" />
    </div>
  );
}