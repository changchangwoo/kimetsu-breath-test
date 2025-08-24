"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  delay: number;
}
export default function RightToLeft({ children, delay }: IProps) {
  const itemVariants = {
    initial: {
      opacity: 0,
      x: 300,
    },

  animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: delay,
        ease: [0.8, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      x: -300,
      transition: {
        duration: 0.5,
        ease: [0.8, 0, 0.2, 1] as const,
        delay: delay,
      },
    },
  };

  return (
      <motion.div
        className="w-full h-auto"
        variants={itemVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
  );
}
