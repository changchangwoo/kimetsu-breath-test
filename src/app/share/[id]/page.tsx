'use client';

import fetchData from '@/apis/fetch';
import { useEffect, useState } from 'react';

interface ResultData {
  id: string;
  weights: any;
  type: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SharePage({ params }: PageProps) {
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log(result);

  useEffect(() => {
    async function loadData() {
      try {
        const { id } = await params;
        const data = await fetchData(`/results/${id}`);
        setResult(data);
      } catch (err) {
        console.error('결과 로딩 실패:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params]);

  if (loading) {
    return (
      <div className="h-dvh flex flex-col justify-center items-center">
        <p>결과를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="h-dvh flex flex-col justify-center items-center">
        <p>결과를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-5">
      <h1>결과 ID: {result.id}</h1>
      {/* <h1>결과 data: {result.weights}</h1> */}
      <h1>결과 data: {result.type}</h1>
    </div>
  );
}
