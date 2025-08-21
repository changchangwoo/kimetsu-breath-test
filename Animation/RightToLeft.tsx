"use client";
import { motion, scale } from "motion/react";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  delay: number;
  isAnimation?: boolean;
}
export default function RightToLeft({
  children,
  delay,
  isAnimation = true,
}: IProps) {
  const itemVariants = {
    initial: {
      opacity: 0,
      x: 300,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.8, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      x: -300,
      scale: 0.8,
      y: -5,

      transition: {
        duration: 0.5,
        ease: [0.8, 0, 0.2, 1] as const,
        delay: delay,
      },
    },
  };

  return (
    <>
      {isAnimation ? (
        <motion.div
          className="w-full h-auto"
          variants={itemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
