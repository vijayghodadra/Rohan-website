'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  amount?: number | 'some' | 'all';
  as?: 'div' | 'section';
  id?: string;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  distance = 36,
  once = true,
  className = '',
  amount = 0.12,
  as = 'div',
  id,
}: ScrollRevealProps) {
  const getInitialPosition = () => {
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
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();
  const Component = as === 'section' ? motion.section : motion.div;

  return (
    <Component
      id={id}
      initial={{ opacity: 0, ...initialPos }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth Apple luxury deceleration curve
      }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </Component>
  );
}

// Reusable stagger container for cards/grids
export function ScrollStagger({
  children,
  className = '',
  staggerChildren = 0.1,
  delayChildren = 0.05,
  amount = 0.1,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  amount?: number | 'some' | 'all';
  once?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className = '',
  distance = 32,
  duration = 0.85,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}
