import { useEffect, useRef, useCallback } from "react";
import { useAppStore } from "@/store/useAppStore";

const SCENE_COUNT = 3;
const DEBOUNCE_MS = 800;

export function useSceneSwitch() {
  const { currentScene, isPreloading, isTransitioning, setScene, setTransitioning } =
    useAppStore();
  const lastSwitchTime = useRef(0);
  const touchStartY = useRef(0);

  const switchScene = useCallback(
    (direction: "up" | "down") => {
      const now = Date.now();
      if (now - lastSwitchTime.current < DEBOUNCE_MS || isTransitioning || isPreloading)
        return;

      lastSwitchTime.current = now;
      setTransitioning(true);

      const next =
        direction === "down"
          ? Math.min(currentScene + 1, SCENE_COUNT - 1)
          : Math.max(currentScene - 1, 0);

      if (next !== currentScene) {
        setScene(next);
      }

      setTimeout(() => setTransitioning(false), 800);
    },
    [currentScene, isPreloading, isTransitioning, setScene, setTransitioning]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 20) {
        switchScene("down");
      } else if (e.deltaY < -20) {
        switchScene("up");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        switchScene("down");
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        switchScene("up");
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        switchScene(diff > 0 ? "down" : "up");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [switchScene]);

  return { currentScene, switchScene };
}