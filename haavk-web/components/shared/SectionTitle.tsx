import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <motion.div
      className={`mb-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="h-[1px] w-8 bg-haavk-ice/30" />
        <span className="time-font text-[10px] tracking-[0.3em] text-haavk-ice/50">HAAVK</span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-haavk-ice/30 to-transparent" />
      </div>
      <h2 className="font-orbitron text-2xl md:text-3xl tracking-[0.1em] text-haavk-silver mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-haavk-platinum/50 font-rajdhani tracking-wider">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}