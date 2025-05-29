'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500); // nhỏ hơn 500ms sẽ không thấy gì

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {children}
    </>
  );
}
