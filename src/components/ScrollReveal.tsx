import React from 'react';
import { motion, Variants } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number | 'some' | 'all';
  once?: boolean;
  className?: string;
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  distance = 28,
  amount = 0.15,
  once = true,
  className = '',
  id,
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth natural cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollStaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  amount?: number | 'some' | 'all';
  once?: boolean;
  id?: string;
}

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay || 0.12,
      delayChildren: custom.delayChildren || 0.05,
    },
  }),
};

export const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const ScrollStaggerContainer: React.FC<ScrollStaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.05,
  className = '',
  amount = 0.15,
  once = true,
  id,
}) => {
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      custom={{ staggerDelay, delayChildren }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}> = ({ children, className = '', variants = itemFadeUpVariants }) => {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};
