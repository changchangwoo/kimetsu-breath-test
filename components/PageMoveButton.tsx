"use client";

import { useRouter } from "next/navigation";
import { AnswersType } from "./QuestionList";

interface PageMoveButtonProps {
  href: "" | "/tes" | "/result";
  title: string;
  answers?: AnswersType[];
}

type Tweights = "침착" | "협력" | "신중" | "공격" | "헌신" | "결단" | "창의" | "열정";

export default function PageMoveButton({ href, title, answers }: PageMoveButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    if(answers) {
      const weights: { [key in Tweights]: number } = {
        침착: 0,
        협력: 0,
        신중: 0,
        공격: 0,
        헌신: 0,
        결단: 0,
        창의: 0,
        열정: 0
      };
      for(const answer of answers) {
        if(answer) {
          for(const [key, value] of Object.entries(answer.weights)) {
            weights[key as Tweights] += value || 0;
          }
        }
      }
      return;
    }
    router.push(href);
  };

  return (
    <button onClick={handleClick} className="w-30 h-10 bg-orange-300">
      {title}
    </button>
  );
}
