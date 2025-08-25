import PageTransition from "@/animation/PageTransition";
import QuestionList from "@/components/QuestionList";
import scripts from "@/data/script.json";

export default function Test() {
  return (
    <PageTransition>
      <div className="h-auto flex flex-col justify-center items-center gap-5 overflow-x-hidden">
        <QuestionList scripts={scripts.scripts} />
      </div>
    </PageTransition>
  );
}
