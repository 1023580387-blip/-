'use client';
import CgHoloWindow from '@/components/shared/CgHoloWindow';

export default function HeroCgPlayer() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* 全屏CG */}
      <div className="absolute inset-0">
        <CgHoloWindow
          prompt="UE5 cinematic CG animation, Delta Force HAAVK Group main trailer, 2035 near future, cold matte military sci-fi tone, 16:9 widescreen, 8K ultra HD, cinematic depth of field, soft cold silver industrial lighting, opening shot: aerial view of Asara region, HAAVK Spire skyscraper piercing clouds, SkyNet satellites crossing deep space orbit, Zero Dam hydro energy facility panorama, middle shot: Mandelbrick supercomputer room massive data streams, Relink brain-computer experiment chamber close-up, mechanical prosthetics, mech security forces in formation, autonomous drone swarm launching, conflict shot: GTI task force infiltrating Tide Prison, HAAVK enhanced soldiers activating combat mode, geological weapon dam energy pulse, closing shot: CEO Jacob HAAVK standing at Spire penthouse window looking over controlled territory, screen displays slogan 'The Sky Belongs to HAAVK', matte metal, holographic projections, subtle data light streams, low saturation carbon black ice blue cold tones, no vibrant colors, steady majestic camera movement, oppressive authoritarian epic atmosphere, seamless loop"
          aspectRatio="16:9"
          size="full"
          className="!border-0 !absolute !inset-0 !w-full !h-full"
          showControls={false}
        />
      </div>

      {/* 暗色叠加 */}
      <div className="absolute inset-0 bg-gradient-to-b from-haavk-carbon/60 via-transparent to-haavk-carbon/90 z-[3]" />

      {/* 标题文字 */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-haavk-ice/30" />
          <span className="time-font text-[10px] tracking-[0.4em] text-haavk-ice/50">EST. 2012</span>
          <div className="h-[1px] w-12 bg-haavk-ice/30" />
        </div>

        <h1 className="font-orbitron font-bold text-4xl md:text-6xl lg:text-7xl tracking-[0.05em] text-haavk-silver mb-4">
          HAAVK
        </h1>
        <div className="font-orbitron text-sm md:text-base tracking-[0.3em] text-haavk-platinum/60 mb-8">
          GLOBAL DEFENSE GROUP
        </div>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-haavk-ice/40 to-transparent mx-auto mb-8" />

        <p className="text-sm md:text-base text-haavk-platinum/50 font-rajdhani tracking-wider max-w-2xl mx-auto leading-relaxed">
          哈夫克与你同频，信息予你无限
        </p>
        <p className="text-xs text-haavk-platinum/40 font-rajdhani tracking-[0.2em] mt-2">
          天空属于哈夫克
        </p>

        {/* 向下滚动提示 */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-pulse-slow">
          <div className="w-[1px] h-8 bg-gradient-to-b from-haavk-ice/40 to-transparent" />
          <span className="time-font text-[8px] tracking-[0.3em] text-haavk-ice/30">SCROLL</span>
        </div>
      </div>
    </section>
  );
}