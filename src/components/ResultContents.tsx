"use client";

import Image from "next/image";
import WeightGraph from "./weightsGraph";

interface ResultHeaderProps {
    breathingName: string;
}

export function ResultHeader({ breathingName }: ResultHeaderProps) {
  return (
    <>
      <h1 className="font-shilla text-title text-white mb-5 px-5">
        “ 생사여탈권을 타인 손에 쥐어주지 마!! ”
      </h1>

      <div className="flex gap-2 h-[260px] px-5 mb-10">
        <WeightGraph />
        <div className="w-[150px] h-full relative">
          <Image
            src={`https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/4/43/Giyu_anime_design.png/revision/latest?cb=20190831073602`}
            alt={`${breathingName}의 결과 이미지2`}
            fill
            className="object-cover relative"
            priority
          />
        </div>
      </div>
    </>
  );
}

export function ResultDeiscription() {
  return (
    
        <ul className="list-disc w-full flex flex-col gap-2 h-auto py-5 px-5 bg-white/30 text-black font-nanumB text-medium mb-10">
          <li>
            당신은 물처럼 차분하고 신중하며, 언제나 상황을 객관적으로
            바라봅니다.
          </li>
          <li>
            급박한 순간에도 침착함을 잃지 않고 최선의 선택을 내리는 능력이
            뛰어납니다.
          </li>
          <li>
            부드럽지만 강력한 힘을 지니고 있으며, 필요할 때는 흐름을 바꾸어
            상황을 유리하게 만듭니다
          </li>
        </ul>
  )
}

export function ResultKeywords() {
  const tempKeywordBox = ["신중", "침착", "유연함", "흐름", "깊이", "팀워크", "부드러움", "강인함"];

  return (
        <div className="w-full h-auto flex flex-col items-center ">
          <h1 className="text-white font-shilla text-extraLarge mb-5">키워드</h1>
          <div className="px-5 flex gap-2 flex-wrap justify-center">
            {tempKeywordBox.map((keyword, index) => (
              <span
                key={index}
                className="inline-block bg-white text-black font-nanumB text-medium rounded-full px-3 py-1 border border-border/50"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
  )
}