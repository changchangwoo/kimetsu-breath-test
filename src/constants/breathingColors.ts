import { Ttypes } from "@/models/type";

export const breathingColors: Record<Ttypes, string> = {
  water: "rgba(30, 144, 255, 0.7)", // 물의 호흡 - 깊은 바다색
  fire: "rgba(255, 69, 0, 0.8)", // 염의 호흡 - 타오르는 불꽃색
  love: "rgba(255, 182, 193, 0.7)", // 연의 호흡 - 연한 벚꽃 핑크
  mist: "rgba(220, 220, 220, 0.6)", // 안개의 호흡 - 흰 안개색
  moon: "rgba(72, 61, 139, 0.7)", // 달의 호흡 - 밤하늘의 어두운 보라
  wind: "rgba(144, 238, 144, 0.6)", // 바람의 호흡 - 연초록/청록
  beast: "rgba(255, 140, 0, 0.7)", // 야수의 호흡 - 주황갈색
  rock: "rgba(160, 82, 45, 0.7)", // 암의 호흡 - 진한 갈색
  insect: "rgba(186, 85, 211, 0.6)", // 충의 호흡 - 나비의 자주색
  thunder: "rgba(255, 215, 0, 0.6)", // 뇌의 호흡 - 번개의 황금색
  flower: "rgba(255, 105, 180, 0.7)", // 화의 호흡 - 진한 분홍
  sound: "rgba(255, 215, 0, 0.7)", // 음의 호흡 - 화려한 금색
  snake: "rgba(147, 112, 219, 0.6)", // 사의 호흡 - 뱀의 자주색
  sun: "rgba(255, 69, 0, 0.6)", // 일의 호흡 - 태양의 주황빨강
};

// 호흡법 한국어 이름 매핑
export const breathingNames: Record<Ttypes, string> = {
  water: "물",
  fire: "화염",
  love: "사랑",
  mist: "안개",
  moon: "달",
  wind: "바람",
  beast: "짐승",
  rock: "바위",
  insect: "벌레",
  thunder: "천둥",
  flower: "꽃",
  sound: "음향",
  snake: "뱀",
  sun: "태양",
};
