"use client";

import WeightGraph from "../weightsGraph";
import { useEffect, useRef, useState } from "react";

interface ResultHeaderProps {
  summary: string;
}

export function ResultHeader({ summary }: ResultHeaderProps) {
  const [showGraph, setShowGraph] = useState(false);
  const graphRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!graphRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
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
      <h1 className="font-shilla text-title text-white mb-5 px-5 ">
        “{summary}”
      </h1>

      <div ref={graphRef} style={{ minHeight: "24rem" }}>
        {showGraph && <WeightGraph />}
      </div>
    </>
  );
}
