import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
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
