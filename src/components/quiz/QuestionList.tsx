'use client';

import fetchData from '@/apis/fetch';
import { usePageTransition } from '@/contexts/PageTransitionContext';
import { Tweights } from '@/models/type';
import { AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import QuestionStep from './QuestionStep';

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
  const router = useRouter();

  const [answers, setAnswers] = useState<AnswersType[]>(
    Array(scripts.length).fill(null)
  );

  const currentScript = scripts[step - 1];
  const { triggerTransition } = usePageTransition();

  const handleSelectOption = (optionId: string) => {
    const newAnswers = [...answers];
    newAnswers[step - 1] = {
      id: optionId,
      weights:
        currentScript.options.find(option => option.id === optionId)?.weights ||
        {},
    };
    setAnswers(newAnswers);
  };

  const handleNextButton = async () => {
    if (step < scripts.length) {
      setStep(prevStep => {
        const newStep = prevStep + 1;
        return newStep;
      });
    } else if (step === scripts.length) {
      const weights: { [key in Tweights]: number } = {
        침착: 0,
        협력: 0,
        신중: 0,
        공격: 0,
        헌신: 0,
        결단: 0,
        창의: 0,
        열정: 0,
      };

      for (const answer of answers) {
        if (answer) {
          for (const [key, value] of Object.entries(answer.weights)) {
            weights[key as Tweights] += value || 0;
          }
        }
      }

      try {
        const result = await fetchData(`/results`, 'POST', { weights });
        const type = result.type as string;
        const href = `/results/${type}`;
        localStorage.setItem('weights', JSON.stringify(weights));
        triggerTransition(() => {
          router.push(href);
        });
      } catch (err) {
        console.error('API 요청 실패:', err);
      }
    }
  };

  const handlePrevButton = async () => {
    if (step > 1) {
      setStep(prevStep => {
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
