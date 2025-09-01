'use client';

import { useEffect, useRef, useState } from 'react';
import WeightGraph from '../quiz/weightsGraph';

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
        {showGraph && <WeightGraph />}
      </div>
    </>
  );
}
