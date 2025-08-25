"use client";

import { motion } from "framer-motion";
import { usePageTransition } from "@/contexts/PageTransitionContext";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isTransitioning } = usePageTransition();
  const itemVariants = {
    initial: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      y: 25,
      transition: {
        duration: 0.7,
        ease: [0.7, 0.1, 0.4, 1] as const,
      },
    },
  };

  return (
    <>
      <motion.div
        className="w-full h-auto"
        variants={itemVariants}
        initial="initial"
        animate={isTransitioning ? "exit" : "initial"}
      >
        {children}
      </motion.div>
    </>
  );
}
