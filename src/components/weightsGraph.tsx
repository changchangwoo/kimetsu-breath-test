"use client";

export default function WeightGraph() {
  const weights =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("weights") || "{}")
      : {};

  return (
    <>
      <div className="w-[60%] bg-amber-50"></div>
    </>
  );
}
