import { TBreathingDetails, Ttypes } from "@/models/type";

interface Section02Props {
  breathingColor: string;
  breathingDetail: TBreathingDetails;
  type: Ttypes;
}

export function Section02({
  breathingColor,
  breathingDetail,
  type,
}: Section02Props) {
  const { title, summary, description, strengths, weaknesses, keywords } =
    breathingDetail;
  return (
    <div
      className={`w-full pt-10 h-auto flex flex-col gap-10`}
      style={{ backgroundColor: breathingColor }}
    >
      <ResultHeader summary={summary} />
      <ResultDescription description={description} />
      <ResultKeywords keywords={keywords} />
      <ResultSuccessor />
    </div>
  );
}

import Image from "next/image";
import WeightGraph from "../weightsGraph";

interface ResultHeaderProps {
  summary: string;
}

export function ResultHeader({ summary }: ResultHeaderProps) {
  return (
    <>
      <h1 className="font-shilla text-title text-white mb-5 px-5">
        “{summary}”
      </h1>

      <div className="flex gap-2 h-[260px] px-5 ">
        <WeightGraph />
        <div className="w-[150px] h-full relative">
          <Image
            src={`https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/4/43/Giyu_anime_design.png/revision/latest?cb=20190831073602`}
            // alt={`${breathingName}의 결과 이미지2`}
            alt={`water의 결과 이미지2`}
            fill
            className="object-cover relative"
            priority
          />
        </div>
      </div>
    </>
  );
}

interface ResultDescriptionProps {
  description: string;
}

export function ResultDescription({ description }: ResultDescriptionProps) {
  return (
    <div className="list-disc w-full flex flex-col gap-2 h-auto py-5 px-5 bg-white/30 text-black font-nanumB text-medium whitespace-pre-line">
      {description}
    </div>
  );
}

interface ResultKeywordsProps {
  keywords: string[];
}

export function ResultKeywords({ keywords }: ResultKeywordsProps) {
  return (
    <div className="w-full h-auto flex flex-col items-center ">
      <h1 className="text-white font-shilla text-extraLarge mb-5">키워드</h1>
      <div className="px-5 flex gap-2 flex-wrap justify-center">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-block bg-white text-black font-nanumB text-medium rounded-full px-3 py-1 border border-border/50"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ResultSuccessor() {
  return (
    <div className="bg-white/30 w-full h-[300px] flex flex-col items-center"></div>
  );
}
