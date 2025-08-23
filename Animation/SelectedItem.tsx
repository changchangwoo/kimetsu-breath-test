"use client";
import { motion } from "motion/react";
import { ReactNode, useState, useEffect } from "react";

interface IProps {
  children: ReactNode;
  isSelected: boolean;
  hasAnySelection?: boolean;
  onSelectAnimationComplete?: () => void;
}

export default function SelectedItem({ 
  children, 
  isSelected, 
  hasAnySelection = false,
  onSelectAnimationComplete 
}: IProps) {
  const [animationState, setAnimationState] = useState<"initial" | "selected" | "deselected">("initial");

  const itemVariants = {
    initial: {
      opacity: 1,
      scale: 1,
    },
    selected: {
      opacity: 1,
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.8, 0, 0.2, 1] as const,
      },
    },
    deselected: {
      opacity: 0.6,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.8, 0, 0.2, 1] as const,
      },
    },
  };

  useEffect(() => {
    if (!hasAnySelection) {
      setAnimationState("initial");
    } else {
      setAnimationState(isSelected ? "selected" : "deselected");
    }
  }, [isSelected, hasAnySelection]);

  const handleAnimationComplete = () => {
    if (animationState === "selected" && onSelectAnimationComplete) {
      onSelectAnimationComplete();
    }
  };

  return (
    <motion.div
      className="w-full h-auto"
      variants={itemVariants}
      initial="initial"
      animate={animationState}
      onAnimationComplete={handleAnimationComplete}
    >
      {children}
    </motion.div>
  );
}