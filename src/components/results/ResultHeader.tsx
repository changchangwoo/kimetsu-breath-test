'use client';

import fetchData from '@/apis/fetch';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import WeightGraph, { WeightData } from '../quiz/weightsGraph';

interface ResultHeaderProps {
  summary: string;
  summarySize: 'text-smallTitle' | 'text-title';
}

export function ResultHeader({
  summary,
  summarySize = 'text-title',
}: ResultHeaderProps) {
  const [showGraph, setShowGraph] = useState(false);
  const graphRef = useRef<HTMLDivElement | null>(null);
  const [weights, setWeights] = useState<WeightData>({});

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      try {
        const response = await fetchData(`/results/${id}`);
        setWeights(response.weights);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    if (!graphRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setShowGraph(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(graphRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <h1
        className={`font-shilla text-white whitespace-pre-line ${summarySize} text-center`}
      >
        “{summary}”
      </h1>

      <div ref={graphRef} style={{ minHeight: '24rem' }}>
        {showGraph && <WeightGraph weights={weights} />}
      </div>
    </>
  );
}
