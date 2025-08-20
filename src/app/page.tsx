import BottomUp from "../../components/Animation/BottomUp";
import PageMoveButton from "../../components/PageMoveButton";

export default function Home() {
  let delay = 0.05;
  const step = 0.05;

  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-5 p-5 text-center">
      <BottomUp delay={delay}>
        <h1 className="text-3xl">임시 텍스트 애니메이션 확인</h1>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <div className="w-full h-45 rounded-md bg-emerald-200"></div>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <h2 className="text-xl">대략 100명 이상 이용중</h2>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <PageMoveButton href="/quiz" title="시작하기" />
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <span className="text-sm var(--color-gray-200) mt-15">
          저작권 관련 내용 저작권 관련 내용 저작권 관련 내용 저작권 관련 내용
        </span>
      </BottomUp>
    </div>
  );
}
