import React from 'react';

const DataFlow: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
      {/* 水平数据流线条 */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent animate-flow"
          style={{
            top: `${15 + i * 18}%`,
            left: '-50%',
            animationDelay: `${i * -3}s`,
            animationDuration: `${20 + i * 5}s`,
            opacity: 0.3 + i * 0.1,
          }}
        />
      ))}

      {/* 垂直微数据流 */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-[1px] h-[200%] bg-gradient-to-b from-transparent via-neon-cyan/15 to-transparent"
          style={{
            left: `${25 + i * 35}%`,
            top: '-50%',
            animation: `flow 25s linear infinite reverse`,
            animationDelay: `${i * -5}s`,
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default DataFlow;
