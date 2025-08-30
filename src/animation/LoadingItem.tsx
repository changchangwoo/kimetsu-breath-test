'use client';

import { motion } from 'framer-motion';

export default function LoadingItem({
  children,
}: {
  children: React.ReactNode;
}) {
  const itemVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1.5,
        ease: [0.7, 0.1, 0.4, 1] as const,
      },
    },
  };

  return (
    <>
      <motion.div
        className="w-full overscroll-y-none"
        variants={itemVariants}
        initial="initial"
        animate="animate"
      >
        {children}
      </motion.div>
    </>
  );
}
