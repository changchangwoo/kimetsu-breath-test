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
  fullMark: 10;
}

export default function WeightGraph() {
  const weights: WeightData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("weights") || "{}")
      : {};

  // 데이터를 Recharts가 요구하는 형식으로 변환
  const chartData: ChartDataPoint[] = [
    { subject: "리더십", value: weights.리더십 ?? 0, fullMark: 10 },
    { subject: "결단", value: weights.결단 ?? 0, fullMark: 10 },
    { subject: "공격", value: weights.공격 ?? 0, fullMark: 10 },
    { subject: "신중", value: weights.신중 ?? 0, fullMark: 10 },
    { subject: "열정", value: weights.열정 ?? 0, fullMark: 10 },
    { subject: "창의", value: weights.창의 ?? 0, fullMark: 10 },
    { subject: "침착", value: weights.침착 ?? 0, fullMark: 10 },
    { subject: "헌신", value: weights.헌신 ?? 0, fullMark: 10 },
    { subject: "협력", value: weights.협력 ?? 0, fullMark: 10 },
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
          <PolarRadiusAxis
            angle={0}
            domain={[0, 10]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="능력치"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
