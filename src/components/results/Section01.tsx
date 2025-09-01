import BottomUp from '@/animation/BottomUp';
import { Ttypes } from '@/models/type';
import Image from 'next/image';

interface Section01Props {
  breathingColor: string;
  breathingName: string;
  type: Ttypes;
}

export function Section01({
  breathingColor,
  breathingName,
  type,
}: Section01Props) {
  let delay = 0.05;
  const step = 0.05;

  return (
    <>
      <BottomUp delay={delay}>
        <h2
          className="mt-16 sm:mt-32 font-shilla text-lightGray sm:text-extraLarge
        text-large"
        >
          내가 계승한 호흡은..
        </h2>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <h1
          style={{ color: breathingColor }}
          className="font-bold font-shilla  text-extraTitle"
        >
          {breathingName}의 호흡
        </h1>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <div
          className="w-full h-[40dvh] 
        rounded-2xl relative overflow-hidden mt-12"
        >
          <Image
            src={`/imgs/result/${type}.webp`}
            alt={`${breathingName}의 결과 이미지`}
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
            fill
            className="object-cover relative"
            priority
          />
        </div>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <h3 className="mt-20 font-nanum text-gray sm:text-medium text-descript">
          아래로 드래그해 결과 자세히보기
        </h3>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <div className="w-full flex justify-center items-center sm:mt-5 mt-2">
          {/* @ts-ignore */}
          <dotlottie-wc
            src="https://lottie.host/c6893063-8f95-463a-a921-7a1c35200faf/fVgVWBTa1U.lottie"
            style={{ width: 50, height: 50 }}
            speed={1}
            autoplay
            loop
          />
        </div>
      </BottomUp>
    </>
  );
}
