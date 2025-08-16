"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import PageMoveButton from "./PageMoveButton";

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
  id : string | null;
  weights: { [key: string]: number | undefined };
}

export default function QuestionList({ scripts }: QuestionListProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<AnswersType[]>(
    Array(scripts.length).fill(null)
  );

  const currentScript = scripts[step - 1];
  const selectedOption = answers[step - 1];

  const handleSelectOption = (optionId: string) => {
    const newAnswers = [...answers];
    newAnswers[step - 1] = {
      id: optionId,
      weights: currentScript.options.find(option => option.id === optionId)?.weights || {}
    };
    setAnswers(newAnswers);
    localStorage.setItem("answers", JSON.stringify(newAnswers));
  };

  const handleNextButton = () => {
    if (!selectedOption) {
      alert("옵션을 선택하세요!");
      return;
    }
    if (step < scripts.length) {
      setStep(step + 1);
    }
  };

  const handlePrevButton = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-max h-120 flex flex-col items-center justify-center gap-5">
      <ProgressBar step={step} maxStep={scripts.length} />
      <h1 className="w-100 h-10">{currentScript.question}</h1>

      <ul className="w-100 h-60 bg-sky-200 p-5 flex flex-col gap-3">
        {currentScript.options.map((option) => (
          <li
            key={option.id}
            className={`h-10 flex items-center justify-center border 
              cursor-pointer transition-all
              ${
                selectedOption?.id === option.id
                  ? "bg-orange-300 border-orange-500"
                  : "bg-amber-50 border-gray-300"
              }`}
            onClick={() => handleSelectOption(option.id)}
          >
            {option.text}
          </li>
        ))}
      </ul>

      <div className="flex gap-3">
        <button
          className={`px-4 py-2 bg-blue-200 rounded
            ${step === 1 ? "bg-gray-200" : "bg-blue-200"}
            `}
          onClick={handlePrevButton}
        >
          이전
        </button>
        {step === scripts.length ? (
          <PageMoveButton href="/results" title="제출하기" answers={answers} />
        ) : (
          <button
            className="px-4 py-2 bg-blue-300 rounded"
            onClick={handleNextButton}
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}
