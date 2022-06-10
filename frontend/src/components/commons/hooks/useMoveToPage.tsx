import { useRouter } from 'next/router';
import { useContext } from 'react';
import { GlobalContext } from '../../../../pages/_app';

export function useMoveToPage() {
  const router = useRouter();
  const { setVisitedPage } = useContext(GlobalContext);

  const moveToPage = (page) => () => {
    setVisitedPage(page);
    router.push(page);
  };
  return {
    moveToPage,
  };
}
