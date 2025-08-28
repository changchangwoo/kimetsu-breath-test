import BottomUp from '@/animation/BottomUp';
import PageTransition from '@/animation/PageTransition';
import fetchData from '@/apis/fetch';
import PageMoveButton from '@/components/PageMoveButton';
import ButtonShare from '@/components/share/ButtonShare';

export default async function Home() {
  let delay = 0.05;
  const step = 0.05;

  const countUser = await fetchData(`/`, 'GET');

  return (
    <PageTransition>
      <div
        className="
    px-5
    py-20 
    h-dvh flex flex-col text-center items-center overflow-y-hidden"
      >
        <BottomUp delay={delay}>
          <h1 className="mb-10 text-title font-shilla text-lightGray">
            나는 어떤
            <br /> 호흡 계승자일까?
          </h1>
        </BottomUp>

        <BottomUp delay={(delay += step)}>
          <div
            className="mb-14 w-full h-48 rounded-md
        bg-[url('../../public/imgs/main.png')] bg-cover bg-center
        "
          ></div>
        </BottomUp>

        <BottomUp delay={(delay += step)}>
          <h2 className="mb-5 font-shilla text-medium text-lightGray">
            현재 호흡을 계승한 인원 {countUser}명
          </h2>
        </BottomUp>

        <BottomUp delay={(delay += step)}>
          <PageMoveButton
            href="/quiz"
            title="테스트 시작하기"
            className="mb-14"
          />
        </BottomUp>

        <BottomUp delay={(delay += step)}>
          <ButtonShare />
        </BottomUp>

        <BottomUp delay={(delay += step)}>
          <h3 className="text-extraSmall text-gray font-nanum leading-tight mt-20">
            본 사이트의 모든 설정은 ‘귀멸의 칼날’ 원작자에 귀속되며,
            <br />
            비영리로서 오직 팬 활동 목적으로만 운영됩니다.
          </h3>
        </BottomUp>
      </div>
    </PageTransition>
  );
}

/*
Todo
: 강점 약점 추가..? => 이거 있어야하나
: 호흡 계승자 이미지 추가, 설명 추가
: 이미지 추가 => 결과 화면 AI 이미지
: 개발 완료 후 QA
: Vercel 배포
: 배포 도메인 카카오 공유하기 연결
: OG 태그 설정, 추가
=> 공유하기 OG 태그 QA
: 반응형 추가
:   

*/
