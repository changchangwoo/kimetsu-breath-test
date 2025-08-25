import { Ttypes } from "@/models/type";
import {
  ResultDeiscription,
  ResultHeader,
  ResultKeywords,
  ResultSuccessor,
} from "./ResultItems";

interface Section02Props {
  breathingColor: string;
  breathingName: string;
  type: Ttypes;
}

export function Section02({
  breathingColor,
  breathingName,
  type,
}: Section02Props) {
  console.log(breathingColor);
  return (
    <div
      className={`w-full pt-10 h-auto`}
      style={{ backgroundColor: breathingColor }}
    >
      <ResultHeader />
      <ResultDeiscription />
      <ResultKeywords />
      <ResultSuccessor />
    </div>
  );
}
