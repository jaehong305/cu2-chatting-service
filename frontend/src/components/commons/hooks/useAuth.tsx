import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../pages/_app';

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useContext(GlobalContext);

  useEffect(() => {
    if () {
      alert('로그인이 필요합니다.');
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
  };
}
