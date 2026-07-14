'use client';

export default function Nebula() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* 主星云 - 左上 */}
      <div
        className="absolute"
        style={{
          top: '10%',
          left: '15%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(74, 144, 226, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.6,
        }}
      />
      
      {/* 次星云 - 右下 */}
      <div
        className="absolute"
        style={{
          bottom: '20%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(155, 126, 222, 0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.5,
        }}
      />
      
      {/* 远星云 - 中央 */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(91, 163, 240, 0.08) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.4,
        }}
      />
    </div>
  );
}
