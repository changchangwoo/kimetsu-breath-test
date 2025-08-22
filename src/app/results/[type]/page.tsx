// src/app/results/[type]/page.tsx

import WeightGraph from "../../../../components/weightsGraph";
import { TresultType } from "../../../../models/type";

interface PageProps {
  params: { type: TresultType }
}

export async function generateStaticParams() {
  const types : TresultType[] = [
    "sun", "fire", "love", "water", "mist", "moon",
    "wind", "beast", "rock", "insect", "thunder",
    "flower", "sound", "snake"
  ];

  return types.map((type) => ({
    type: type,
  }));
}

export default async function ResultPage({ params }: PageProps) {
  const { type } = await params;
  
  return (
    <main>
      <WeightGraph/>
      <h1>당신의 타입은: {type}</h1>
      <p>이 타입에 맞는 결과 페이지입니다.</p>
    </main>
  );
}

