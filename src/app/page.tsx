import PageMoveButton from "../../components/PageMoveButton";

export default function Home() {
  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-5">
      시작 페이지
      <PageMoveButton href="/quiz" title="시작하기" />
    </div>
  );
}
