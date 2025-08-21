"use client";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { useEffect, useState } from "react";
import { Tweights } from "../models/types";

interface TestGraphProps {
  id?: string;
}

export default function TestGraph({ id }: TestGraphProps) {
  const [weights, setWeights] = useState<Tweights | null>(null);

  useEffect(() => {
    if (id) {
      const fetchWeights = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/results/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.status}`);
          }

          setWeights(await response.json());
        } catch (err) {
          console.error(err);
        }
      };
      fetchWeights();
    } else {
      const storageWeights = localStorage.getItem("weights");
      setWeights(JSON.parse(storageWeights!));
    }
  }, []);
  return (
    <div className="w-50 h-10 bg-amber-200 flex items-center justify-center"></div>
  );
}
