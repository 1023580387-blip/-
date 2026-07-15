import { motion } from 'framer-motion';
import { timelineEvents } from '@/data/timeline';

export default function Timeline() {
  return (
    <div className="relative py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-orbitron text-4xl font-bold text-gradient mb-16 text-center">
          集团历程
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-havoc-blue/30" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="bg-havoc-dark/50 border border-havoc-blue/20 rounded-lg p-6 glow-border-hover">
                  <div className="font-orbitron text-2xl font-bold text-havoc-blue mb-2">
                    {event.year}
                  </div>
                  <h3 className="font-rajdhani text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="font-rajdhani text-white/70 text-sm">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Node */}
              <div className="w-2/12 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-4 h-4 rounded-full ${
                    event.isPositive ? 'bg-havoc-blue' : 'bg-havoc-red'
                  } shadow-[0_0_10px_rgba(0,212,255,0.8)]`}
                />
              </div>

              {/* Spacer */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
