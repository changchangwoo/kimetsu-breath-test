"use client";

import RightToLeft from "../Animation/RightToLeft";

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
  isAnimation?: boolean;
}

const QuestionStep = ({
  script,
  selectedOption,
  onSelectOption,
  isAnimation = true,
}: QuestionStepProps) => {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <RightToLeft isAnimation={isAnimation} delay={0}>
        <h1 className="text-center">{script.question}</h1>
      </RightToLeft>

      <RightToLeft isAnimation={isAnimation} delay={0.1}>
        <div className="w-full h-30 bg-amber-300"></div>
      </RightToLeft>

      <ul className="w-full p-5 flex flex-col gap-3 ">
        {script.options.map((option, idx) => (
          <RightToLeft
            isAnimation={isAnimation}
            delay={0.2 + 0.05 * idx}
            key={option.id}
          >
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
