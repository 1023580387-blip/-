'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const regions = ['全部地区', '全球', '阿萨拉地区', '近地轨道', '撒哈拉航天城', '潮汐监狱'];

interface TechFilterProps {
  onRegionChange: (region: string) => void;
}

export default function TechFilter({ onRegionChange }: TechFilterProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* 地区筛选 */}
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(openDropdown === 'region' ? null : 'region')}
          className="flex items-center gap-2 px-4 py-2 text-xs font-rajdhani tracking-wider text-haavk-platinum/60 border border-haavk-border/20 hover:border-haavk-silver/30 transition-colors"
        >
          地区筛选
          <ChevronDown size={12} />
        </button>
        {openDropdown === 'region' && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-1 w-48 holo-glass z-20 py-1"
          >
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => { onRegionChange(r === '全部地区' ? 'all' : r); setOpenDropdown(null); }}
                className="block w-full text-left px-4 py-2 text-xs font-rajdhani text-haavk-platinum/60 hover:text-haavk-silver hover:bg-haavk-ice/5 transition-colors"
              >
                {r}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}