'use client';

import React, { useEffect, useRef } from 'react';

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
  const isTransitioning = useRef(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (isTransitioning.current) return;

      const section01 = section01Ref.current;
      if (!section01) return;

      const section01Rect = section01.getBoundingClientRect();

      if (section01Rect.top <= 0 && section01Rect.bottom > 0) {
        e.preventDefault();
        isTransitioning.current = true;

        const section02 = section02Ref.current;

        if (section02) {
          section02.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }

        setTimeout(() => {
          isTransitioning.current = false;
        }, 800);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        handleScroll(e);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isTransitioning.current) return;

      const section01 = section01Ref.current;
      if (!section01) return;

      const section01Rect = section01.getBoundingClientRect();

      if (section01Rect.top <= 0 && section01Rect.bottom > 0) {
        const startY = e.touches[0].clientY;

        const handleTouchMove = (moveEvent: TouchEvent) => {
          const currentY = moveEvent.touches[0].clientY;
          const deltaY = startY - currentY;

          if (deltaY > 1) {
            moveEvent.preventDefault();
            moveEvent.stopPropagation();
            isTransitioning.current = true;

            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);

            setTimeout(() => {
              const section02 = section02Ref.current;

              if (section02) {
                document.body.style.overflow = 'hidden';

                section02.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });

                setTimeout(() => {
                  document.body.style.overflow = '';
                  isTransitioning.current = false;
                }, 800);
              }
            }, 50);
          }
        };

        const handleTouchEnd = () => {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, {
          passive: false,
        });
        document.addEventListener('touchend', handleTouchEnd);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <>
      <section
        ref={section01Ref}
        className="w-full h-dvh flex flex-col items-center px-5"
      >
        {firstSection}
      </section>
      <section ref={section02Ref} className="w-full h-auto ">
        {secondSection}
      </section>
    </>
  );
}
