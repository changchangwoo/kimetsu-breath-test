'use client';

import fetchData from '@/apis/fetch';
import { usePageTransition } from '@/contexts/PageTransitionContext';
import { Tweights } from '@/models/type';
import { AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<AnswersType[]>(
    Array(scripts.length).fill(null)
  );
  const { triggerTransition } = usePageTransition();

  const currentScript = scripts[step - 1];

  useEffect(() => {
    if (currentScript.id < scripts.length) {
      const img = new Image();
      img.src = `/imgs/q${currentScript.id + 1}.webp`;
    }
  }, [currentScript.id]);

  useEffect(() => {
    window.history.replaceState({ step }, '');

    const onPopState = (event: PopStateEvent) => {
      if (event.state?.step) {
        setStep(event.state.step);
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const pushStepToHistory = (newStep: number) => {
    window.history.pushState({ step: newStep }, '');
  };

  const handleSelectOption = (
    optionId: string,
    activeDetermination: boolean
  ) => {
    const newAnswers = [...answers];

    newAnswers[step - 1] = {
      id: optionId,
      weights:
        currentScript.options.find(option => option.id === optionId)?.weights ||
        {},
    };
    if (activeDetermination) {
      newAnswers[step - 1].weights['결단'] = 1;
    }
    setAnswers(newAnswers);
  };

  const handleNextButton = async () => {
    if (step < scripts.length) {
      const newStep = step + 1;
      setStep(newStep);
      pushStepToHistory(newStep);
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
        const id = result.id as string;
        const href = `/results/${type}?id=${id}`;
        localStorage.setItem('id', JSON.stringify(id));
        localStorage.setItem('type', JSON.stringify(type));
        triggerTransition(() => {
          router.push(href);
        });
      } catch (err) {
        console.error('API 요청 실패:', err);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-svh justify-center items-center">
      <ProgressBar step={step} maxStep={scripts.length} />
      <AnimatePresence mode="wait">
        <QuestionStep
          key={step}
          script={currentScript}
          handleSelectOption={handleSelectOption}
          handleNextButton={handleNextButton}
        />
      </AnimatePresence>
    </div>
  );
}
