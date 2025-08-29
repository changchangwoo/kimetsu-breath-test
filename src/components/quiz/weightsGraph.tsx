"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface WeightData {
  침착?: number;
  협력?: number;
  신중?: number;
  공격?: number;
  헌신?: number;
  결단?: number;
  창의?: number;
  열정?: number;
  방어?: number | null;
  리더십?: number | null;
}

interface ChartDataPoint {
  subject: string;
  value: number;
  fullMark: 20;
}

export default function WeightGraph() {
  const weights: WeightData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("weights") || "{}")
      : {};

  // 데이터를 Recharts가 요구하는 형식으로 변환
  const chartData: ChartDataPoint[] = [
    { subject: "결단", value: weights.결단 ?? 0, fullMark: 20 },
    { subject: "공격", value: weights.공격 ?? 0, fullMark: 20 },
    { subject: "신중", value: weights.신중 ?? 0, fullMark: 20 },
    { subject: "열정", value: weights.열정 ?? 0, fullMark: 20 },
    { subject: "창의", value: weights.창의 ?? 0, fullMark: 20 },
    { subject: "침착", value: weights.침착 ?? 0, fullMark: 20 },
    { subject: "헌신", value: weights.헌신 ?? 0, fullMark: 20 },
    { subject: "협력", value: weights.협력 ?? 0, fullMark: 20 },
  ];

  return (
    <div className="w-full h-96 font-shilla text-lightGray">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#ffffff", fontSize: 17, fontWeight: 500 }}
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: "#ffffff",
              fontSize: 17,
              fontWeight: 500,
              dy: 0, // y축 방향으로 10px 아래로 이동
            }}
          />

          <Radar
            name="능력치"
            dataKey="value"
            stroke="#ffffff"
            fill="#ffffff"
            fillOpacity={0.6}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
