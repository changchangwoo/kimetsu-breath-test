"use client";

import { motion } from "framer-motion";
import { usePageTransition } from "@/contexts/PageTransitionContext";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isTransitioning }= usePageTransition();
  const itemVariants = {
    initial: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.8, 0, 0.2, 1] as const,
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
