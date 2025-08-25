// Animation/Progress.tsx (수정된 버전)
"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  step: number;
  maxStep: number;
  percentage: number;
}

export default function Progress({
  children,
  step,
  maxStep,
  percentage,
}: IProps) {
  return (
    <div className="relative w-full">
      {children}
      <motion.div
        className="absolute left-0 top-0 h-full bg-lightGray rounded-2xl"
        initial={{ width: "0%" }}
        animate={{ width: `${step === 1 ? 0 : percentage}%` }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        layoutId={`progress-${step}`}
      />
      <div className="absolute left-0 top-0 w-full h-full">
        <h1
          className={`font-shilla text-extraSmall text-lightGray right-3 top-0.5 absolute`}
        >
          {maxStep}
        </h1>
      </div>
    </div>
  );
}
