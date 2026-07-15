'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MetalButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function MetalButton({ href, onClick, children, variant = 'primary', className = '' }: MetalButtonProps) {
  const baseClasses =
    'inline-flex items-center gap-2 px-6 py-2.5 text-xs tracking-[0.15em] font-rajdhani font-medium transition-all duration-300 holo-border';

  const variants = {
    primary:
      'border border-haavk-silver/20 text-haavk-silver hover:text-haavk-ice hover:border-haavk-ice/40 bg-haavk-glass',
    secondary:
      'border border-haavk-border/20 text-haavk-platinum/60 hover:text-haavk-silver hover:border-haavk-silver/30 bg-transparent',
  };

  const content = (
    <motion.span
      className="flex items-center gap-2"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      <ArrowRight size={14} />
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
}