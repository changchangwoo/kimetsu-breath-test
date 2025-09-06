import { Ttypes } from '@/models/type';

export const breathingColors: Record<Ttypes, string> = {
  water: '#1F53C4B3', // rgba(31, 83, 196, 0.7)
  fire: '#FF8201B3', // rgba(255, 130, 1, 0.7)
  love: '#D8618CB3', // rgba(216, 97, 140, 0.7)
  mist: '#3E959299', // rgba(62, 149, 146, 0.6)
  wind: '#1D8C6299', // rgba(29, 140, 98, 0.6)
  beast: '#7F8E9BB3', // rgba(127, 142, 155, 0.7)
  rock: '#FFE38480', // rgba(255, 227, 132, 0.5)
  insect: '#6F65C499', // rgba(111, 101, 196, 0.6)
  thunder: '#FFCC00B3', // rgba(255, 204, 0, 0.7)
  flower: '#CB86A6B3', // rgba(203, 134, 166, 0.7)
  sound: '#AF6A0DB3', // rgba(175, 106, 13, 0.7)
  snake: '#7E64A199', // rgba(126, 100, 161, 0.6)
  sun: '#E63613B3', // rgba(230, 54, 19, 0.7)
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
