'use client';

import { AnswersType } from '@/components/quiz/QuestionList';
import { usePageTransition } from '@/contexts/PageTransitionContext';
import { useRouter } from 'next/navigation';

interface PageMoveButtonProps {
  href: '' | '/quiz';
  title: string;
  answers?: AnswersType[];
  className?: string;
}

export default function PageMoveButton({
  href,
  title,
  className,
}: PageMoveButtonProps) {
  const router = useRouter();
  const { triggerTransition } = usePageTransition();

  const handleClick = async () => {
    triggerTransition(() => {
      router.push(href);
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`border border-border text-white font-nanumB w-[243px] h-12 rounded-xl bg-lightGray/20 ${className}`}
    >
      {title}
    </button>
  );
}
