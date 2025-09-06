'use client';

import RightToLeft from '@/animation/RightToLeft';
import SelectedItem from '@/animation/SelectedItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  handleSelectOption: (optionId: string, activeDetermination: boolean) => void;
  handleNextButton: () => void;
}

const QuestionStep = ({
  script,
  handleSelectOption,
  handleNextButton,
}: QuestionStepProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeDetermination, setactiveDetermination] = useState<boolean>(true);

  const handleOptionClick = (optionId: string) => {
    setSelectedId(optionId);
    handleSelectOption(optionId, activeDetermination);
  };

  const handleSelectAnimationComplete = () => {
    setTimeout(() => {
      handleNextButton();
    }, 200);
  };

  useEffect(() => {
    setTimeout(() => {
      setactiveDetermination(false);
    }, 9000);
  }, []);

  const normalizedOptions = Array.from({ length: 4 }, (_, index) => {
    const option = script.options[index];
    return option || { id: `empty-${index}`, text: '', weights: {} };
  });

  return (
    <div className="w-full">
      <RightToLeft delay={0.2}>
        <h1 className="min-h-[60px] text-center text-white font-shilla text-large whitespace-pre-line mb-7">
          {script.question}
        </h1>
      </RightToLeft>

      <RightToLeft delay={0.3}>
        <div className="w-full h-48 aspect-video rounded-2xl relative overflow-hidden mb-5">
          <Image
            src={`/imgs/q${script.id}.webp`}
            alt={`질문 ${script.id} 배경 이미지`}
            fill
            className="object-cover relative"
            priority
          />
        </div>
      </RightToLeft>

      <ul className="flex flex-col gap-3">
        {normalizedOptions.map((option, idx) => (
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
                w-[90%]
                mx-auto
                cursor-pointer transition-all hover:scale-105 font-nanumB text-center
                 text-white py-2 whitespace-pre-line text-descript
                 bg-lightGray/20 border-border/50
                 ${
                   option.text === ''
                     ? 'opacity-0 pointer-events-none h-[38.33px]'
                     : ''
                 }
                `}
                onClick={() =>
                  option.text !== '' && handleOptionClick(option.id)
                }
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
