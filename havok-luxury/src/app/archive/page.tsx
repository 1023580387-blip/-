'use client';

import { motion } from 'framer-motion';
import ArchiveTimeline from '@/components/ArchiveTimeline';
import PageTransition from '@/components/PageTransition';
import { archiveEntries } from '@/lib/data';

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ArchivePage() {
  return (
    <PageTransition>
      <div className="bg-havok-carbon">
        {/* ================================================================
            HERO SECTION
        ================================================================ */}
        <section className="relative py-32 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <motion.h1
                className="text-display-lg font-[200] text-havok-platinum tracking-tight"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Heritage Archive
              </motion.h1>

              <motion.p
                className="mt-5 text-sm font-[300] text-havok-silver tracking-[0.04em]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                Two centuries of precision, artistry, and innovation
              </motion.p>

              <motion.p
                className="mt-8 max-w-2xl mx-auto text-sm font-[300] text-havok-text-muted leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                From a single atelier in 18th-century France to a global house of luxury, the
                Havok legacy spans more than two centuries of unwavering dedication to
                precision, artistry, and the pursuit of perfection. Each milestone below
                represents a chapter in our enduring story of exceptional craftsmanship.
              </motion.p>

              <motion.div
                className="metal-divider mt-10 max-w-sm mx-auto"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            ARCHIVE TIMELINE
        ================================================================ */}
        <section className="relative py-24 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <ArchiveTimeline entries={archiveEntries} />
          </div>
        </section>

        {/* ================================================================
            THE HAVOK PROMISE
        ================================================================ */}
        <section className="relative py-32 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
            >
              <motion.h2
                className="text-center text-display-md font-[250] text-havok-platinum tracking-tight"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                The Havok Promise
              </motion.h2>

              <motion.div
                className="metal-divider mt-6 max-w-xs mx-auto"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />

              <motion.div
                className="glass-panel mt-12 p-10 md:p-14"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="text-center">
                  <p className="text-lg font-[300] text-havok-platinum leading-relaxed italic">
                    &ldquo;Every Havok creation is a testament to the pursuit of perfection.
                    From our first workshop in 1790 to our global ateliers today, we remain
                    devoted to the art of exceptional craftsmanship.&rdquo;
                  </p>
                  <footer className="mt-6">
                    <p className="text-label text-havok-frost uppercase tracking-[0.12em]">
                      The House of Havok
                    </p>
                    <p className="mt-1 text-detail text-havok-text-muted">
                      Est. 1790
                    </p>
                  </footer>
                </blockquote>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}