'use client';

import { successorData } from '@/data/result_succesor.json';
import { Ttypes } from '@/models/type';
import Image from 'next/image';
import { useState } from 'react';

interface ResultSuccessorProps {
  breathingName: string;
  type: Ttypes;
}

export function ResultSuccessor({ breathingName, type }: ResultSuccessorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const characters = successorData[type];

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % characters.length);
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + characters.length) % characters.length);
  };

  const currentCharacter = characters[currentIndex];

  return (
    <div className="bg-white/15 backdrop-blur-md w-full flex flex-col items-center rounded-xl py-5 min-h-56 border border-border/20">
      <h1 className="text-white font-shilla text-extraLarge mb-5">
        {breathingName}의 호흡 계승자
      </h1>

      <div className="relative w-full max-w-[200px] flex items-center justify-center">
        {/* 이전 버튼 */}
        <button
          onClick={prevImage}
          className="absolute left-2 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          aria-label="이전 이미지"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* 이미지 컨테이너 */}
        <div className="w-[150px] h-[300px] relative">
          <Image
            src={currentCharacter.image}
            alt={`${currentCharacter.name}의 이미지`}
            fill
            sizes="100%"
            className="object-cover relative"
            priority
          />
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={nextImage}
          className="absolute right-2 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          aria-label="다음 이미지"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* 캐릭터 정보 */}
      <div className="text-center mt-4">
        <h2 className="text-white font-shilla text-large mb-2">
          {currentCharacter.name}
        </h2>
        <p className="text-white/80 font-nanum text-small">
          {currentCharacter.description}
        </p>
      </div>

      {/* 인디케이터 */}
      {characters.length > 1 && (
        <div className="flex gap-2 mt-4">
          {characters.map((_, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`${index + 1}번째 이미지로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
