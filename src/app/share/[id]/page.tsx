const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ResultData {
  id: string;
  weights: any;
  type: string;
}

interface PageProps {
  params: { id: string };
}

export default async function ResultPage(props: PageProps) {
  const { id } = props.params;

  let result: ResultData | null = null;

  try {
    const response = await fetch(`${API_BASE_URL}/results/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    result = await response.json();
  } catch (err) {
    console.error(err);
  }

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
