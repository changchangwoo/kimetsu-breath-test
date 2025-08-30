'use client';

import fetchData from '@/apis/fetch';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface ResultData {
  id: string;
  weights: any;
  type: string;
}

function ShareContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
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
  }, [id]);

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
      <h1>결과 data: {result.type}</h1>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShareContent />
    </Suspense>
  );
}

// 사용: /share?id=123
