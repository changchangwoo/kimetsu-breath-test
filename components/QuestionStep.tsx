"use client";

import { motion, scale } from "motion/react";
import BottomUp from "./Animation/BottomUp";
import RightToLeft from "./Animation/RightToLeft";

interface QuestionStepProps {
  script: {
    id: number;
    question: string;
    options: {
      id: string;
      text: string;
      weights: { [key: string]: number | undefined };
    }[];
  };
  selectedOption: string | null;
  onSelectOption: (optionId: string) => void;
}

const QuestionStep = ({
  script,
  selectedOption,
  onSelectOption,
}: QuestionStepProps) => {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <RightToLeft delay={0}>
        <h1 className="text-center">{script.question}</h1>
      </RightToLeft>

      <RightToLeft delay={0.1}>
        <div className="w-full h-30 bg-amber-300"></div>
      </RightToLeft>

      <ul className="w-full  p-5 flex flex-col gap-3 ">
        {script.options.map((option, idx) => (
          <RightToLeft delay={0.2 + 0.1 * idx} key={option.id}>
            <li
              key={option.id}
              className={`h-10 flex items-center justify-center border rounded-md
              cursor-pointer transition-all hover:scale-105
              ${
                selectedOption === option.id
                  ? "bg-orange-300 border-orange-500 shadow-md"
                  : "bg-amber-50 border-gray-300 hover:bg-amber-100"
              }`}
              onClick={() => onSelectOption(option.id)}
            >
              {option.text}
            </li>
          </RightToLeft>
        ))}
      </ul>
    </div>
  );
};

export default QuestionStep;
