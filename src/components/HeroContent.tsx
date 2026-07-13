import React from 'react';

const HeroContent: React.FC = () => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center pointer-events-none">
      {/* 主标题 */}
      <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-extralight tracking-[0.2em] text-white/90 font-futuristic mb-6 drop-shadow-[0_0_20px_rgba(79,240,255,0.3)] animate-breathe">
        THE FUTURE OF
        <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-cyan to-white">
          INTELLIGENT COMPUTING
        </span>
      </h1>

      {/* 副标题 */}
      <p className="text-[clamp(1rem,2vw,1.25rem)] font-light tracking-wider text-white/50 max-w-2xl mx-auto mb-12">
        新一代AI大模型算力平台 · 量子级数字空间 · 未来智能计算
      </p>

      {/* CTA按钮 */}
      <div className="pointer-events-auto">
        <button className="glass-panel px-8 py-4 rounded-full text-white/80 hover:text-neon-cyan transition-all duration-500 hover:shadow-[0_0_30px_rgba(79,240,255,0.3)] hover:scale-105">
          <span className="text-sm tracking-wider font-light">探索技术能力</span>
        </button>
      </div>
    </div>
  );
};

export default HeroContent;
