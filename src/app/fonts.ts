import { Nanum_Myeongjo } from 'next/font/google';

export const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-nanum-myeongjo',
  fallback: ['serif'],
});
