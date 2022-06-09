import { useRouter } from 'next/router';
import { useState } from 'react';

export function useMoveToPage() {
  const router = useRouter();
  const [visitedPage, setVisitedPage] = useState('/');

  const moveToPage = (page) => () => {
    setVisitedPage(page);
    router.push(page);
  };

  return {
    moveToPage,
    visitedPage,
  };
}
