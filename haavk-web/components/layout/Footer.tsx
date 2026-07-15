import Link from 'next/link';

const baseCoordinates = [
  { name: '撒哈拉航天城', coords: '23°30\'N 13°12\'E', href: '/bases' },
  { name: '零号大坝', coords: '18°42\'N 42°30\'E', href: '/bases' },
  { name: '潮汐监狱', coords: '34°36\'S 18°30\'E', href: '/bases' },
  { name: '哈夫克尖塔', coords: '25°12\'N 55°18\'E', href: '/bases' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-haavk-border/20 bg-haavk-carbon/95">
      {/* 金属分割线 */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-haavk-silver/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {baseCoordinates.map((base) => (
            <Link
              key={base.name}
              href={base.href}
              className="group"
            >
              <div className="text-[10px] tracking-[0.2em] text-haavk-platinum/50 font-rajdhani mb-1">
                {base.name}
              </div>
              <div className="time-font text-[11px] text-haavk-ice/50 group-hover:text-haavk-ice/80 transition-colors">
                {base.coords}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-haavk-border/10">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-haavk-silver/20 flex items-center justify-center rotate-45">
              <div className="w-1.5 h-1.5 bg-haavk-ice/30 -rotate-45" />
            </div>
            <span className="font-orbitron text-[10px] tracking-[0.2em] text-haavk-silver/50">
              HAAVK GLOBAL DEFENSE GROUP
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] tracking-[0.15em] text-haavk-platinum/40 font-rajdhani">
            <span>哈夫克与你同频，信息予你无限</span>
            <span className="text-haavk-border/40">|</span>
            <span>天空属于哈夫克</span>
            <span className="text-haavk-border/40">|</span>
            <span className="time-font text-haavk-ice/40">EST. 2012</span>
          </div>
        </div>
      </div>
    </footer>
  );
}