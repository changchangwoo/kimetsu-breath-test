"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  delay: number;
}
export default function BottomUp({ children, delay }: IProps) {
  const itemVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        delay: delay,
        ease: [0.7, 0, 0.3, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 1,
        ease: [0.7, 0, 0.3, 1] as const,
      },
    },
  };
  return (
    <>
      <motion.div
        className="w-full h-auto text-center"
        variants={itemVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </>
  );
}
