import { Ttypes } from "@/models/type";

export const breathingColors: Record<Ttypes, string> = {
  water: "#4A90E2", // 푸른색
  fire: "#FF4500", // 주황빨강
  love: "#FF69B4", // 분홍색
  mist: "#B19CD9", // 연보라/회색
  moon: "#4B0082", // 진한 보라/남색
  wind: "#00CED1", // 연두/청록색
  beast: "#D2691E", // 주황갈색
  rock: "#8B4513", // 갈색/황토색
  insect: "#E6E6FA", // 연보라/라벤더
  thunder: "#FFD700", // 노란/금색
  flower: "#FF1493", // 분홍/자홍색
  sound: "#8A2BE2", // 자주/보라색
  snake: "#9370DB", // 연보라/자주색
  sun: "#FF6347", // 빨강/주황색
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

// 사용 예시 함수들
export const getBreathingColor = (type: Ttypes): string => {
  return breathingColors[type];
};

export const getBreathingName = (type: Ttypes): string => {
  return breathingNames[type];
};
