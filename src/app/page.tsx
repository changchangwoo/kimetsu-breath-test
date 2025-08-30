import BottomUp from '@/animation/BottomUp';
import PageTransition from '@/animation/PageTransition';
import CountUser from '@/components/CountUser';
import PageMoveButton from '@/components/PageMoveButton';
import ButtonShare from '@/components/share/ButtonShare';

export default async function Home() {
  let delay = 0.05;
  const step = 0.05;

  return (
    <PageTransition>
      <div
        className="
    px-4 sm:px-5
    py-12 sm:py-20
    h-dvh flex flex-col text-center items-center overflow-y-hidden"
      >
        <BottomUp delay={delay}>
          <h1 className="mb-6 sm:mb-10 text-mobileTitle sm:text-title font-shilla text-lightGray leading-tight">
            나는 어떤
            <br /> 호흡 계승자일까?
          </h1>
        </BottomUp>

        <BottomUp delay={(delay += step)}>
          <div className="mb-8 sm:mb-14 w-full max-w-md aspect-[16/9] rounded-md bg-[url('../../public/imgs/main.webp')] bg-cover bg-center"></div>
        </BottomUp>

        <BottomUp delay={(delay += step)}>
          <CountUser />
        </BottomUp>

        <BottomUp delay={(delay += step)}>
          <PageMoveButton
            href="/quiz"
            title="테스트 시작하기"
            className="mb-8 sm:mb-14 active:bg-lightGray/5
            cursor-pointer hover:scale-105 duration-75"
          />
        </BottomUp>

        <BottomUp delay={(delay += step)}>
          <ButtonShare />
        </BottomUp>

        <BottomUp delay={(delay += step)}>
          <h3 className="text-xs sm:text-extraSmall text-gray font-nanum leading-tight mt-12 sm:mt-20 px-2">
            모든 설정 및 저작권은 '귀멸의 칼날' 원작자에 귀속되며,
            <br />
            비영리로서 오직 팬 활동 목적으로만 운영됩니다.
          </h3>
        </BottomUp>
      </div>
    </PageTransition>
  );
}
