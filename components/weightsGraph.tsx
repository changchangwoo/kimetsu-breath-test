"use client";

export default function WeightGraph() {
  const weights =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("weights") || "{}")
      : {};

  console.log(weights);

  return <></>;
}
