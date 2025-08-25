// src/app/results/[type]/page.tsx

import { TresultType } from "@/models/type";
import { breathingColors, breathingNames } from "@/constants/breathingColors";
import Image from "next/image";
import WeightGraph from "@/components/weightsGraph";
import {
  ResultDeiscription,
  ResultHeader,
  ResultKeywords,
  ResultSuccessor,
} from "@/components/ResultContents";

interface PageProps {
  params: { type: TresultType };
}

export async function generateStaticParams() {
  const types: TresultType[] = [
    "sun",
    "fire",
    "love",
    "water",
    "mist",
    "moon",
    "wind",
    "beast",
    "rock",
    "insect",
    "thunder",
    "flower",
    "sound",
    "snake",
  ];

  return types.map((type) => ({
    type: type,
  }));
}

export default async function ResultPage({ params }: PageProps) {
  const { type } = await params;
  const breathingColor = breathingColors[type];
  const breathingName = breathingNames[type];
  return (
    <main>
      <div
        id="section-01"
        className="w-full h-dvh flex flex-col items-center px-5"
      >
        <h2 className="mt-32 font-shilla text-lightGray text-extraLarge">
          내가 계승한 호흡은..
        </h2>
        <h1
          style={{ color: breathingColor }}
          className="font-bold  font-shilla text-extraTitle "
        >
          {breathingName}의 호흡
        </h1>
        <div className="w-full h-[353px] rounded-2xl relative overflow-hidden  mt-12">
          <Image
            src={`/imgs/result/${type}.png`}
            alt={`${breathingName}의 결과 이미지`}
            fill
            className="object-cover relative"
            priority
          />
        </div>
        <h3 className="mt-20 font-nanum text-gray">
          아래로 드래그해 결과설명 확인하기
        </h3>
        <div className="w-full flex justify-center items-center mt-5">
          {/* @ts-ignore */}
          <dotlottie-wc
            src="https://lottie.host/c6893063-8f95-463a-a921-7a1c35200faf/fVgVWBTa1U.lottie"
            style={{ width: 50, height: 50 }}
            speed={1}
            autoplay
            loop
          />
        </div>
      </div>
      <div
        id="section-02"
        className="w-full h-auto pt-10"
        style={{ backgroundColor: `${breathingColor}` }} // HEX 뒤에 16진수 alpha
      >
        <ResultHeader breathingName={breathingName} />
        <ResultDeiscription />
        <ResultKeywords />
        <ResultSuccessor />
      </div>
    </main>
  );
}
