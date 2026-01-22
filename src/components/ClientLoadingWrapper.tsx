'use client';

import LoadingItem from '@/animation/LoadingItem';
import { ReactNode, useEffect, useState } from 'react';

interface ClientLoadingWrapperProps {
  children: ReactNode;
}

const LoadingScreen = () => {
  return (
    <LoadingItem>
      <div className="fixed inset-0 flex items-center justify-center overflow-y-hidden">
        <h2 className="text-white text-xl font-bold font-shilla">불러오는중</h2>
      </div>
    </LoadingItem>
  );
};

export default function ClientLoadingWrapper({
  children,
}: ClientLoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const checkFonts = async () => {
      try {
        await document.fonts.ready;
        setFontsLoaded(true);
      } catch (error) {
        console.log('Font loading check failed:', error);
        setFontsLoaded(true);
      }
    };

    if (typeof window !== 'undefined') {
      checkFonts();
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      setIsLoading(false);
    }
  }, [fontsLoaded]);

  return (
    <>
      {isLoading && <LoadingScreen />}

      <div
        className={`transition-all duration-700 ease-out ${
          isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {children}
      </div>
    </>
  );
}
