import { TBreathingDetails, Ttypes } from '@/models/type';
import { FaGithub } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import PageMoveButton from '../PageMoveButton';
import ButtonShare from '../share/ButtonShare';
import { ResultHeader } from './ResultHeader';
import { ResultSuccessor } from './ResultSuccessor';

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

  const isSmall = ['sun', 'insect', 'love', 'snake', 'flower', 'wind'].includes(
    type
  );
  return (
    <div
      className={`w-full py-20 px-5  h-auto flex flex-col`}
      style={{
        backgroundColor: breathingColor,
        paddingBottom: `calc(5rem + env(safe-area-inset-bottom))`,
      }}
    >
      <ResultHeader
        summary={summary}
        summarySize={isSmall ? 'text-smallTitle' : 'text-title'}
      />
      <ResultDescription description={description} />
      <ResultKeywords keywords={keywords} />
      <ResultSuccessor breathingName={breathingName} type={type} />
      <ResultShare />
      <PageMoveButton
        href={'/'}
        title={'테스트 다시하기'}
        className="mt-5 m-auto font-shilla text-large border-white cursor-pointer hover:scale-105 active:scale-105 transition-all"
      />
      <Footer />
    </div>
  );
}

interface ResultDescriptionProps {
  description: string;
}

export function ResultDescription({ description }: ResultDescriptionProps) {
  return (
    <div
      className="mt-5 text-medium w-full flex flex-col gap-2 h-auto py-5 px-5 bg-white/15 backdrop-blur-md items-center rounded-xl
    font-nanumB whitespace-pre-line line tracking-wide text-white
    border-border/20 border"
    >
      {description}
    </div>
  );
}

interface ResultKeywordsProps {
  keywords: string[];
}

export function ResultKeywords({ keywords }: ResultKeywordsProps) {
  return (
    <div className="mt-5 w-full flex flex-col items-center rounded-xl py-5 ">
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
    <div className="mt-10 w-full flex flex-col items-center rounded-xl py-5 justify-center">
      <h1 className="text-white font-shilla text-extraLarge mb-5 text-center">
        결과 공유하기
      </h1>
      <ButtonShare isResult={true} />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-10 text-extraSmall w-full flex flex-col items-center justify-center font-nanum text-lightGray/40">
      <a
        href="https://github.com/changchangwoo/kimetsu-breath-test"
        className="flex items-center gap-2"
      >
        <FaGithub />
        changchangwoo/github.io
      </a>
      <a
        href="https://velog.io/@changwoo/posts"
        className="flex items-center gap-2"
      >
        <FaPencil />
        velog.io/@changwoo
      </a>{' '}
      <h3 className="text-extraSmall text-lightGray/40 font-nanum leading-tight text-center mt-5">
        모든 설정 및 저작권은 ‘귀멸의 칼날’ 원작자에 귀속되며,
        <br />
        비영리로서 오직 팬 활동 목적으로만 운영됩니다.
      </h3>
    </footer>
  );
}
