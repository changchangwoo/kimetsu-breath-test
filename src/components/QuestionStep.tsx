"use client";

import Image from "next/image";
import RightToLeft from "../animation/RightToLeft";
import SelectedItem from "../animation/SelectedItem";
import { useState } from "react";

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
  onSelectOption: (optionId: string) => void;
  handleNextButton: () => void;
}

const QuestionStep = ({
  script,
  onSelectOption,
  handleNextButton,
}: QuestionStepProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOptionClick = (optionId: string) => {
    setSelectedId(optionId);
    onSelectOption(optionId);
  };

  const handleSelectAnimationComplete = () => {
    setTimeout(() => {
      handleNextButton();
    }, 200);
  };

  return (
    <div className="flex flex-col">
      <RightToLeft delay={0.2}>
        <h1 className="text-center text-white font-shilla text-large whitespace-pre-line mb-10">
          {script.question}
        </h1>
      </RightToLeft>

      <RightToLeft delay={0.3}>
        <div className="w-full h-48 aspect-video rounded-2xl relative overflow-hidden mb-10">
          <Image
            src={`/imgs/q${script.id}.jpg`}
            alt={`질문 ${script.id} 배경 이미지`}
            fill
            className="object-cover relative"
            priority
          />
        </div>
      </RightToLeft>

      <ul className="flex flex-col gap-3">
        {script.options.map((option, idx) => (
          <RightToLeft delay={0.3 + 0.05 * idx} key={option.id}>
            <SelectedItem
              isSelected={selectedId === option.id}
              hasAnySelection={selectedId !== null}
              onSelectAnimationComplete={
                selectedId === option.id
                  ? handleSelectAnimationComplete
                  : undefined
              }
            >
              <li
                className={`flex items-center justify-center border rounded-2xl
                cursor-pointer transition-all hover:scale-105 font-nanumB text-center
                 text-white py-2 whitespace-pre-line text-descript
                 bg-lightGray/20 border-border/50
                `}
                onClick={() => handleOptionClick(option.id)}
              >
                {option.text}
              </li>
            </SelectedItem>
          </RightToLeft>
        ))}
      </ul>
    </div>
  );
};

export default QuestionStep;
