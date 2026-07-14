'use client';

import { useState, useEffect } from 'react';
import { StarfieldBackground } from '@/components/StarfieldBackground';
import { GalaxyCanvas } from '@/components/GalaxyCanvas';
import { HoloTimeBar } from '@/components/HoloTimeBar';
import { InfoSection } from '@/components/InfoSection';
import { PageTransition } from '@/components/PageTransition';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition isVisible={loaded}>
      <main className="relative min-h-screen w-full overflow-hidden">
        {/* Layer 0: Starfield background */}
        <StarfieldBackground />

        {/* Layer 1: Galaxy canvas */}
        <div className="relative w-full h-screen z-10">
          <GalaxyCanvas />
        </div>

        {/* Layer 2: Fixed top bar */}
        <HoloTimeBar />

        {/* Layer 3: Scrollable info section */}
        <div className="relative z-20 -mt-32">
          <InfoSection />
        </div>
      </main>
    </PageTransition>
  );
}