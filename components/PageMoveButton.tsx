"use client";

import { useRouter } from "next/navigation";
import { AnswersType } from "./QuestionList";
import { Tweights } from "../models/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PageMoveButtonProps {
  href: "" | "/quiz" | "/results" | `/results/${string}`;
  title: string;
  answers?: AnswersType[];
}

export default function PageMoveButton({
  href,
  title,
  answers,
}: PageMoveButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    let newHref = href;

    if (answers) {
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
        const response = await fetch(`${API_BASE_URL}/results`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weights }),
        });
        const result = await response.json();
        const type = result.type as string;
        newHref = `/results/${type}`;
        localStorage.setItem("weights", JSON.stringify(weights));
      } catch (err) {
        console.error("API 요청 실패:", err);
      }
    }

    router.push(newHref);
  };

  return (
    <button onClick={handleClick} className="w-30 h-10 bg-orange-300">
      {title}
    </button>
  );
}
