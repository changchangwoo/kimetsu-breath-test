import { TBreathingDetails, Ttypes } from "@/models/type";
import ButtonShare from "../share/ButtonShare";
import { ResultHeader } from "./ResultHeader";
import { ResultSuccessor } from "./ResultSuccessor";

const css_subTitle = "";

// 호흡 타입별 캐릭터 데이터


interface Section02Props {
  breathingColor: string;
  breathingDetail: TBreathingDetails;
  breathingName: string;
  type: Ttypes;
}

export function Section02({
  breathingColor,
  breathingDetail,
  breathingName,
  type,
}: Section02Props) {
  const { title, summary, description, strengths, weaknesses, keywords } =
    breathingDetail;

  const isSmall = ["sun", "insect", "love", "snake"].includes(type);
  return (
    <div
      className={`w-full py-10 px-5  h-auto flex flex-col gap-10`}
      style={{ backgroundColor: breathingColor }}
    >
      <ResultHeader
        summary={summary}
        summarySize={isSmall ? "text-smallTitle" : "text-title"}
      />
      <ResultDescription description={description} />
      <ResultKeywords keywords={keywords} />
      <ResultSuccessor breathingName={breathingName} type={type} />
      <ResultShare />
      <footer className="text-extraSmall w-full flex flex-col items-center justify-center font-nanum text-lightGray/40">
        <h3>changchangwoo@naver.com</h3>
        <h3>changchangwoo@velog.io</h3>
        <h3>changchangwoo@github.com</h3>
      </footer>
    </div>
  );
}

interface ResultDescriptionProps {
  description: string;
}

export function ResultDescription({ description }: ResultDescriptionProps) {
  return (
    <div className="text-medium w-full flex flex-col gap-2 h-auto py-5 px-5 bg-white/15 backdrop-blur-md items-center rounded-xl
    font-nanumB whitespace-pre-line line tracking-wide text-white
    border-border/20 border">
      {description}
    </div>
  );
}

interface ResultKeywordsProps {
  keywords: string[];
}

export function ResultKeywords({ keywords }: ResultKeywordsProps) {
  return (
    <div className="w-full flex flex-col items-center rounded-xl py-5 ">
      <h1 className="text-white font-shilla text-extraLarge mb-2">키워드</h1>
      <div className="px-3 flex gap-2 flex-wrap justify-center">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-block bg-white/15 text-white font-nanumB text-medium rounded-full px-3 py-1 border border-border/50"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ResultShare() {
  return (
    <div className=" w-full flex flex-col items-center rounded-xl py-5 justify-center">
      <h1 className="text-white font-shilla text-extraLarge mb-5 text-center">
        결과 공유하기
      </h1>
      <ButtonShare isResult={true} />
    </div>
  );
}
