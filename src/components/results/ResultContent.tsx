'use client';

import React, { Suspense, useRef } from 'react';

interface ResultContentProps {
  firstSection: React.ReactNode;
  secondSection: React.ReactNode;
}

export function ResultContent({
  firstSection,
  secondSection,
}: ResultContentProps) {
  const section01Ref = useRef<HTMLDivElement>(null);
  const section02Ref = useRef<HTMLDListElement>(null);

  return (
    <div className="max-w-[512px] overflow-y-auto h-svh no-scrollbar">
      <section
        ref={section01Ref}
        className="w-full h-svh flex flex-col items-center px-5 "
      >
        {firstSection}
      </section>
      <Suspense>
        <section ref={section02Ref}>{secondSection}</section>
      </Suspense>
    </div>
  );
}
