"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  step: number;
}

export default function ScaleUp({ children, step }: IProps) {
  const itemVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.8, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className="w-full h-auto"
      variants={itemVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
}
