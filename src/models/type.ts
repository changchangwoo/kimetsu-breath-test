export type Ttypes =
  | "sun"
  | "fire"
  | "love"
  | "water"
  | "mist"
  | "wind"
  | "beast"
  | "rock"
  | "insect"
  | "thunder"
  | "flower"
  | "sound"
  | "snake";

export type Tweights =
  | "침착"
  | "협력"
  | "신중"
  | "공격"
  | "헌신"
  | "결단"
  | "창의"
  | "열정";

export type TBreathingDetails = {
  title: string;
  summary: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  keywords: string[];
};
