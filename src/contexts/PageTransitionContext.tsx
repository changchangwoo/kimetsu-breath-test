'use client';

import { usePathname } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface PageTransitionContextType {
  isTransitioning: boolean;
  triggerTransition: (callback?: () => void) => void;
}

const PageTransitionContext = createContext<
  PageTransitionContextType | undefined
>(undefined);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsTransitioning(false);
  }, [pathname]);

  const triggerTransition = (callback?: () => void) => {
    setIsTransitioning(true);

    setTimeout(() => {
      if (callback) callback();
    }, 700);
  };

  return (
    <PageTransitionContext.Provider
      value={{ isTransitioning, triggerTransition }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (context === undefined) {
    throw new Error('컨텍스트 없음');
  }
  return context;
}
