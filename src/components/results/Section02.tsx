import { TBreathingDetails, Ttypes } from '@/models/type';
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
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        changchangwoo/github.io
      </a>
      <a
        href="https://velog.io/@changwoo/posts"
        className="flex items-center gap-2"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.174 2.826c-1.101-1.101-2.891-1.101-3.992 0l-1.415 1.414 3.992 3.992 1.415-1.414c1.101-1.101 1.101-2.891 0-3.992zM3 17.25V21h3.75l10.564-10.564-3.75-3.75L3 17.25z" />
        </svg>
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
