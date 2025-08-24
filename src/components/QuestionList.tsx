"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import PageMoveButton from "./PageMoveButton";
import QuestionStep from "./QuestionStep";
import { ProgressBar } from "./ProgressBar";

interface QuestionListProps {
  scripts: {
    id: number;
    question: string;
    options: {
      id: string;
      text: string;
      weights: { [key: string]: number | undefined };
    }[];
  }[];
}

export type AnswersType = {
  id: string | null;
  weights: { [key: string]: number | undefined };
};

export default function QuestionList({ scripts }: QuestionListProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<AnswersType[]>(
    Array(scripts.length).fill(null)
  );

  const currentScript = scripts[step - 1];

  const handleSelectOption = (optionId: string) => {
    const newAnswers = [...answers];
    newAnswers[step - 1] = {
      id: optionId,
      weights:
        currentScript.options.find((option) => option.id === optionId)
          ?.weights || {},
    };
    setAnswers(newAnswers);
  };


  const handleNextButton = async () => {
    if (step < scripts.length) {
      setStep((prevStep) => {
        const newStep = prevStep + 1;
        return newStep;
      });
    }
  };

  const handlePrevButton = async () => {
    if (step > 1) {
      setStep((prevStep) => {
        const newStep = prevStep - 1;
        return newStep;
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center py-10 ">
        <ProgressBar step={step} maxStep={scripts.length} />
        <AnimatePresence mode="wait">
          <QuestionStep
            key={step}
            script={currentScript}
            onSelectOption={handleSelectOption}
            handleNextButton={handleNextButton}
          />
        </AnimatePresence>
    </div>
  );
}