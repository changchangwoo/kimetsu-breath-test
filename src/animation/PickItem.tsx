'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function PickItem({ children }: IProps) {
  const itemVariants = {
    initial: {
      opacity: 0,
      filter: 'blur(8px)',
    },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(8px)',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
