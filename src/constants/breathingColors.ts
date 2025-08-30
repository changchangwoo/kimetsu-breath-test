import { Ttypes } from '@/models/type';

export const breathingColors: Record<Ttypes, string> = {
  water: 'rgba(31, 83, 196, 0.7)', // 물 - 딥 블루
  fire: 'rgba(233, 79, 27, 0.7)', // 화염 - 붉음+주황 계열 (#E94F1B)
  love: 'rgba(216, 97, 140, 0.7)', // 사랑 - 로즈핑크 톤다운
  mist: 'rgba(62, 149, 146, 0.6)', // 안개 - 청록 계열 톤다운
  wind: 'rgba(29, 140, 98, 0.6)', // 바람 - 딥 그린
  beast: 'rgba(127, 142, 155, 0.7)', // 짐승 - 청회색
  rock: 'rgba(98, 105, 115, 0.7)', // 바위 - 딥 그레이
  insect: 'rgba(111, 101, 196, 0.6)', // 벌레 - 톤다운 라벤더
  thunder: 'rgba(184, 144, 0, 0.6)', // 번개 - 딥 앰버
  flower: 'rgba(203, 134, 166, 0.7)', // 꽃 - 톤다운 핑크
  sound: 'rgba(175, 106, 13, 0.7)', // 소리 - 다크 앰버
  snake: 'rgba(126, 100, 161, 0.6)', // 뱀 - 딥 퍼플
  sun: 'rgba(230, 54, 19, 0.7)', // 해 - 히노카미 카구라
};

// 호흡법 한국어 이름 매핑
export const breathingNames: Record<Ttypes, string> = {
  water: '물',
  fire: '화염',
  love: '사랑',
  mist: '안개',
  wind: '바람',
  beast: '짐승',
  rock: '바위',
  insect: '벌레',
  thunder: '번개',
  flower: '꽃',
  sound: '소리',
  snake: '뱀',
  sun: '해',
};
