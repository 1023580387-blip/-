'use client';

import { motion } from 'framer-motion';
import type { ArchiveEntry } from '@/lib/types';

interface ArchiveTimelineProps {
  entries: ArchiveEntry[];
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const timelineDotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
      duration: 0.5,
    },
  },
};

const connectorVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: '100%',
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

const cardVariantsLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const cardVariantsRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const cardVariantsMobile = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

function TimelineEntry({
  entry,
  index,
}: {
  entry: ArchiveEntry;
  index: number;
}) {
  const isLeft = index % 2 === 0;

  const staggerDelay = index * 0.12;

  return (
    <>
      {/* ====== Desktop: alternating layout ====== */}
      <div className="hidden md:contents">
        <div className="relative flex items-center">
          {/* Left side (even index) */}
          {isLeft && (
            <motion.div
              className="w-1/2 pr-10 flex justify-end"
              variants={cardVariantsLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: staggerDelay }}
            >
              <ContentCard entry={entry} />
            </motion.div>
          )}

          {/* Center timeline column */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex flex-col items-center">
            {/* Connecting line from center to card — animated */}
            <motion.div
              className="absolute top-[calc(1.75rem)] h-px bg-havok-silver/30"
              style={{
                width: isLeft ? 'calc(50% - 0.5rem)' : 'calc(50% - 0.5rem)',
                left: isLeft ? 'auto' : '0.5rem',
                right: isLeft ? '0.5rem' : 'auto',
              }}
              variants={connectorVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: staggerDelay + 0.15 }}
            />

            {/* Timeline dot */}
            <motion.div
              className="relative z-10 mt-[1.25rem]"
              variants={timelineDotVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: staggerDelay }}
            >
              <div className="h-2 w-2 rounded-full bg-havok-frost" />
              {/* Pulse glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-havok-frost/30"
                initial={{ scale: 1, opacity: 0.6 }}
                whileInView={{
                  scale: [1, 2.2, 1],
                  opacity: [0.6, 0, 0],
                }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  delay: staggerDelay + 0.3,
                  duration: 1.8,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          </div>

          {/* Right side (odd index) */}
          {!isLeft && (
            <motion.div
              className="w-1/2 pl-10 flex justify-start"
              variants={cardVariantsRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: staggerDelay }}
            >
              <ContentCard entry={entry} />
            </motion.div>
          )}
        </div>
      </div>

      {/* ====== Mobile: all on right side ====== */}
      <div className="flex md:hidden">
        {/* Timeline column on the left */}
        <div className="relative flex shrink-0 flex-col items-center" style={{ width: '2rem' }}>
          {/* Vertical connecting line */}
          <motion.div
            className="absolute top-[1.75rem] h-px bg-havok-silver/30"
            style={{ width: 'calc(100% - 0.5rem)', right: '0.5rem' }}
            variants={connectorVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: staggerDelay + 0.15 }}
          />

          {/* Timeline dot */}
          <motion.div
            className="relative z-10 mt-[1.25rem]"
            variants={timelineDotVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: staggerDelay }}
          >
            <div className="h-2 w-2 rounded-full bg-havok-frost" />
            <motion.div
              className="absolute inset-0 rounded-full bg-havok-frost/30"
              initial={{ scale: 1, opacity: 0.6 }}
              whileInView={{
                scale: [1, 2.2, 1],
                opacity: [0.6, 0, 0],
              }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                delay: staggerDelay + 0.3,
                duration: 1.8,
                ease: 'easeOut',
              }}
            />
          </motion.div>
        </div>

        {/* Content card */}
        <motion.div
          className="flex-1 pl-5"
          variants={cardVariantsMobile}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: staggerDelay }}
        >
          <ContentCard entry={entry} />
        </motion.div>
      </div>
    </>
  );
}

function ContentCard({ entry }: { entry: ArchiveEntry }) {
  return (
    <div className="glass-panel w-full max-w-md p-5">
      <div className="flex gap-4">
        <div className="min-w-0 flex-1 space-y-2.5">
          {/* Year */}
          <p className="text-display-md font-light text-havok-frost leading-none">
            {entry.year}
          </p>

          {/* Brand */}
          <p className="text-label uppercase tracking-[0.12em] text-havok-silver">
            {entry.brand}
          </p>

          {/* Title */}
          <h3 className="text-heading font-light text-havok-platinum leading-tight">
            {entry.title}
          </h3>

          {/* Description */}
          <p className="text-detail leading-relaxed text-havok-text-muted">
            {entry.description}
          </p>

          {/* Significance quote */}
          {entry.significance && (
            <p className="text-detail italic leading-relaxed text-havok-frost/70">
              &ldquo;{entry.significance}&rdquo;
            </p>
          )}
        </div>

        {/* Image preview */}
        {entry.image && (
          <div className="hidden shrink-0 sm:block">
            <div className="glass-panel h-20 w-20 overflow-hidden">
              <img
                src={entry.image}
                alt={entry.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ArchiveTimeline({ entries }: ArchiveTimelineProps) {
  if (!entries || entries.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full">
      {/* Section header */}
      <div className="mb-16 text-center">
        <motion.p
          className="text-label uppercase tracking-[0.12em] text-havok-frost"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Heritage Archive
        </motion.p>
        <motion.h2
          className="mt-3 text-display-lg font-light text-havok-platinum"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          A Legacy of Excellence
        </motion.h2>
        <motion.div
          className="metal-divider mx-auto mt-6 w-32"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Timeline container */}
      <div className="relative mx-auto max-w-5xl">
        {/* Central vertical timeline line — desktop */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-havok-silver/20 to-transparent" />
        </div>

        {/* Vertical timeline line — mobile */}
        <div className="absolute left-[0.9375rem] top-0 h-full w-px md:hidden">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-havok-silver/20 to-transparent" />
        </div>

        {/* Entries */}
        <div className="flex flex-col" style={{ gap: '5rem' }}>
          {entries.map((entry, index) => (
            <TimelineEntry
              key={entry.year + entry.title}
              entry={entry}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}