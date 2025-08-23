import BottomUp from "../../Animation/BottomUp";
import PageMoveButton from "../../components/PageMoveButton";

export default function Home() {
  let delay = 0.05;
  const step = 0.05;

  return (
    <div className="
    pt-20
    pb-20
    pl-5
    pr-5
    h-dvh flex flex-col text-center items-center
    bg-[url('../../public/imgs/bg.png')] bg-cover bg-center">
      <BottomUp delay={delay}>
        <h1 className="mb-10 text-title font-shilla text-lightGray">나는 어떤<br/> 호흡 계승자일까?</h1>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <div className="mb-14 w-full h-48 rounded-md
        bg-[url('../../public/imgs/main.png')] bg-cover bg-center
        "></div>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <h2 className="mb-5 font-shilla text-medium text-lightGray">현재 호흡을 계승한 인원 314명</h2>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <PageMoveButton href="/quiz" title="테스트 시작하기" className="mb-14"/>
      </BottomUp>

      <BottomUp delay={(delay += step)}>
        <div className="flex gap-2 justify-center mb-14">
          <button className="bg-lightGray w-9 h-9 rounded-full border border-border"></button>
          <button className="bg-lightGray w-9 h-9 rounded-full border border-border"></button>
          <button className="bg-lightGray w-9 h-9 rounded-full border border-border"></button>
          <button className="bg-lightGray w-9 h-9 rounded-full border border-border"></button>
        </div>
        {/* 추후 공유하기 로직 추가 */}
      </BottomUp>      
      
      <BottomUp delay={(delay += step)}>
        <h3 className="text-extraSmall text-gray font-nanum leading-tight">
          본 사이트의 모든 설정은 ‘귀멸의 칼날’ 원작자에 귀속되며,<br/>  
          비영리로서 오직 팬 활동 목적으로만 운영됩니다.
        </h3>
      </BottomUp>
    </div>
  );
}
