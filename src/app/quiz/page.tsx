import PageTransition from '@/animation/PageTransition';
import QuestionList from '@/components/quiz/QuestionList';
import scripts from '@/data/script.json';

export default function Test() {
  return (
    <PageTransition>
      <div className="flex flex-col justify-center items-center gap-5 ">
        <QuestionList scripts={scripts.scripts} />
      </div>
    </PageTransition>
  );
}
