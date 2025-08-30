'use client';

import LoadingItem from '@/animation/LoadingItem';
import { ReactNode, useEffect, useState } from 'react';

interface ClientLoadingWrapperProps {
  children: ReactNode;
}

const LoadingScreen = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500); // 0.5초마다 점 추가

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingItem>
      <div className="fixed inset-0 flex items-center justify-center">
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
  const [imagesLoaded, setImagesLoaded] = useState(false);

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

    const checkImages = () => {
      const criticalImages = ['/imgs/bg.webp', '/og-image.webp'];

      const imagePromises = criticalImages.map(src => {
        return new Promise<void>(resolve => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => {
            console.log(`Failed to load image: ${src}`);
            resolve();
          };
          img.src = src;
        });
      });

      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true);
      });
    };

    if (typeof window !== 'undefined') {
      checkFonts();
      checkImages();
    }
  }, []);

  useEffect(() => {
    console.log(fontsLoaded, imagesLoaded);
    if (fontsLoaded && imagesLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, imagesLoaded]);

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
