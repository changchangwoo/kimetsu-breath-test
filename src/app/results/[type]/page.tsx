import TestGraph from "../../../../components/TestGraph";
import { Ttypes } from "../../../../models/types";

interface PageProps {
  params: { type: string };
}

const TYPE_DATA: Ttypes[] = [
  "sun",
  "fire",
  "love",
  "water",
  "mist",
  "moon",
  "wind",
  "beast",
  "rock",
  "insect",
  "thunder",
  "flower",
  "sound",
  "snake",
];

export async function generateStaticParams() {
  return TYPE_DATA.map((type) => ({ type }));
}

export default async function ResultPage(props: PageProps) {
  const { type } = await props.params;

  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-5">
      {type}
      <TestGraph />
    </div>
  );
}
