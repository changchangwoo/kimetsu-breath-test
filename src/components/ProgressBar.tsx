"use client";

import Progress from "@/animation/Progress";
import ScaleUp from "@/animation/ScaleUp";

interface ProgressBarProps {
  step: number;
  maxStep: number;
}

export function ProgressBar({ step, maxStep }: ProgressBarProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-[80%] mb-5 px-5">
      <ScaleUp step={step}>
        <h1 className="font-shilla text-large text-lightGray text-center">
          Q{step}.
        </h1>
      </ScaleUp>
      <ScaleUp step={step}>
        <Progress step={step} maxStep={maxStep} percentage={step === 1 ? 0 : (step / maxStep) * 100}>
          <div className="w-full h-5 bg-gray/30 flex items-center justify-center rounded-2xl border-border/40 border overflow-hidden" />
        </Progress>
      </ScaleUp>
    </div>
  );
}