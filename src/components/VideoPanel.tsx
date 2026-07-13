import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface VideoPanelProps {
  src: string;
  className?: string;
  floatDelay?: number;
  floatDuration?: number;
  opacity?: number;
  scale?: number;
}

export default function VideoPanel({
  src,
  className = "",
  floatDelay = 0,
  floatDuration = 8,
  opacity = 0.35,
  scale = 1,
}: VideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => setLoaded(true);
    video.addEventListener("loadeddata", handleLoaded);
    return () => video.removeEventListener("loadeddata", handleLoaded);
  }, []);

  return (
    <motion.div
      className={`absolute overflow-hidden rounded-2xl border border-white/[0.06] ${className}`}
      style={{ opacity: opacity * (loaded ? 1 : 0), scale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? opacity : 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          delay: floatDelay,
          ease: "easeInOut",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover"
          style={{ pointerEvents: "none" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.02] pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-t from-abyss-900/40 via-transparent to-transparent pointer-events-none" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(163,213,224,0.08) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}