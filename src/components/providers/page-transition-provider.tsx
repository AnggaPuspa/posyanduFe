"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { PageTransitionLoading } from "@/components/ui/loading";

interface PageTransitionContextType {
  isLoading: boolean;
  startLoading: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isLoading: false,
  startLoading: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const pathname = usePathname();

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setMinTimeElapsed(false);
    
    // Minimum 700ms loading
    setTimeout(() => {
      setMinTimeElapsed(true);
    }, 700);
  }, []);
  
  // Hide loading when pathname changes AND minimum time elapsed
  useEffect(() => {
    if (minTimeElapsed) {
      setIsLoading(false);
    }
  }, [pathname, minTimeElapsed]);

  return (
    <PageTransitionContext.Provider value={{ isLoading, startLoading }}>
      {isLoading && <PageTransitionLoading />}
      {children}
    </PageTransitionContext.Provider>
  );
}
