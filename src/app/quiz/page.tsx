import QuestionList from "../../../components/QuestionList";
import scripts from "../../../data/script.json";

export default function Test() {
  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-5 overflow-x-hidden">
      <QuestionList scripts={scripts.scripts} />
    </div>
  );
}
