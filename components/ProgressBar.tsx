"use client";

interface ProgressBarProps {
  step: number;
  maxStep: number;
}

export default function ProgressBar({ step, maxStep }: ProgressBarProps) {
  return (
    <div className="w-50 h-10 bg-amber-200 flex items-center justify-center">
      {step} / {maxStep}
    </div>
  );
}
