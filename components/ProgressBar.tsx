"use client";

interface ProgressBarProps {
  step: number;
  maxStep: number;
}

export default function ProgressBar({ step, maxStep }: ProgressBarProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-[80%] mb-5">
      <h1 className="font-shilla text-large text-lightGray ">Q{step}.</h1>
      <div className="w-full h-5 bg-gray/30 flex items-center justify-center rounded-2xl border-border/40 border"></div>
    </div>
  );
}
