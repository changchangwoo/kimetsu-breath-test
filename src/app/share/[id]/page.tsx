import fetchData from "@/apis/fetch";


interface ResultData {
  id: string;
  weights: any;
  type: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SharePage({ params }: PageProps) {
  const { id } = await params;

  let result = await fetchData(`/results/${id}`);

  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-5">
      {result ? (
        <>
          <h1>결과 ID: {result.id}</h1>
          {/* <h1>결과 data: {result.weights}</h1> */}
          <h1>결과 data: {result.type}</h1>
        </>
      ) : (
        <p>결과를 불러오는 중 오류가 발생했습니다.</p>
      )}
    </div>
  );
}
