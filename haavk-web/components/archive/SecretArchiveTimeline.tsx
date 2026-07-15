'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import { archiveEvents } from '@/data/archive';

export default function SecretArchiveTimeline() {
  const [unlockedClassified, setUnlockedClassified] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const handleUnlock = () => {
    if (password === 'HAAVK2035') {
      setUnlockedClassified(true);
      setShowPasswordInput(false);
    }
  };

  const visibleEvents = unlockedClassified
    ? archiveEvents
    : archiveEvents.filter((e) => e.classification !== 'classified');

  return (
    <div className="relative">
      {/* 解密按钮 */}
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setShowPasswordInput(!showPasswordInput)}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-rajdhani tracking-wider border transition-all duration-300 ${
            unlockedClassified
              ? 'text-haavk-ice border-haavk-ice/40 bg-haavk-ice/5'
              : 'text-haavk-platinum/50 border-haavk-border/20 hover:border-haavk-silver/30'
          }`}
        >
          {unlockedClassified ? <Unlock size={14} /> : <Lock size={14} />}
          {unlockedClassified ? '最高机密已解锁' : '解锁机密档案'}
        </button>
      </div>

      {/* 密码输入 */}
      <AnimatePresence>
        {showPasswordInput && !unlockedClassified && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="holo-glass p-4 flex items-center gap-3">
              <Lock size={16} className="text-haavk-ice/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入授权密码..."
                className="flex-1 bg-transparent border-b border-haavk-border/30 text-sm text-haavk-silver font-rajdhani tracking-wider outline-none focus:border-haavk-ice/50 px-2 py-1"
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              />
              <button
                onClick={handleUnlock}
                className="px-4 py-1 text-xs font-rajdhani tracking-wider text-haavk-ice border border-haavk-ice/30 hover:bg-haavk-ice/10 transition-colors"
              >
                验证
              </button>
            </div>
            <p className="text-[9px] text-haavk-platinum/30 font-rajdhani mt-1 text-right">
              提示：HAAVK2035
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 时间轴 */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-haavk-ice/20 via-haavk-border/20 to-haavk-ice/10 -translate-x-1/2" />

        {visibleEvents.map((event, i) => {
          const isLeft = i % 2 === 0;
          const isClassified = event.classification !== 'public';
          const isExpanded = expandedEvent === event.id;

          return (
            <motion.div
              key={event.id}
              className={`relative flex items-start mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              {/* 时间节点 */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10">
                <div className={`w-3 h-3 rounded-full border-2 ${
                  isClassified && !unlockedClassified
                    ? 'border-red-800/50 bg-red-900/30'
                    : 'border-haavk-ice/40 bg-haavk-carbon'
                }`}>
                  <div className="absolute inset-0.5 rounded-full bg-haavk-ice/20" />
                </div>
              </div>

              {/* 内容卡片 */}
              <div className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <motion.div
                  className={`metal-panel p-4 inline-block max-w-sm cursor-pointer ${isLeft ? 'text-left' : 'text-left'}`}
                  onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="time-font text-xs text-haavk-ice/50 tracking-wider">{event.year}</span>
                    {event.classification !== 'public' && (
                      <span className={`text-[8px] px-1 ${
                        event.classification === 'classified'
                          ? 'bg-red-900/40 text-red-300/60'
                          : 'bg-yellow-900/40 text-yellow-300/60'
                      }`}>
                        {event.classification === 'classified' ? '最高机密' : '受限'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-orbitron text-xs tracking-[0.1em] text-haavk-silver mb-1">
                    {event.title}
                  </h3>
                  <p className={`text-[11px] text-haavk-platinum/50 font-rajdhani leading-relaxed ${isClassified && 'classified-text'}`}>
                    {isExpanded ? event.description : event.description.slice(0, 60) + '...'}
                  </p>
                  {event.characters.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {event.characters.map((c) => (
                        <span key={c} className="text-[8px] text-haavk-ice/30 bg-haavk-ice/5 px-1.5 py-0.5">
                          {c === 'jacob-haavk' ? '雅各布' : c === 'anais-demoulin' ? '德穆兰' : c === 'prometheus' ? '罗米修斯' : c === 'gale' ? '疾风' : c}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}