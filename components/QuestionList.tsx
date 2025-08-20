"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import ProgressBar from "./ProgressBar";
import PageMoveButton from "./PageMoveButton";
import QuestionStep from "./QuestionStep";

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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentScript = scripts[step - 1];
  const selectedOption = answers[step - 1];

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
    if (!selectedOption) {
      alert("옵션을 선택하세요!");
      return;
    }

    if (step < scripts.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrevButton = async () => {
    if (step > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(step - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full h-full">
        <ProgressBar step={step} maxStep={scripts.length} />

        <AnimatePresence mode="wait" initial={false}>
          <QuestionStep
            key={step}
            script={currentScript}
            selectedOption={selectedOption?.id || null}
            onSelectOption={handleSelectOption}
          />
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8">
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-all
              ${
                step === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-200 hover:bg-blue-300 text-blue-800"
              }`}
            onClick={handlePrevButton}
            disabled={step === 1 || isTransitioning}
          >
            이전
          </button>

          {step === scripts.length ? (
            <PageMoveButton
              href="/results"
              title="제출하기"
              answers={answers}
            />
          ) : (
            <button
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all disabled:opacity-50"
              onClick={handleNextButton}
              disabled={isTransitioning}
            >
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/*

*/
