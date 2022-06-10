import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../pages/_app';
import { getAccessToken } from '../../../commons/libraries/getAccessToken';

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useContext(GlobalContext);

  useEffect(() => {
    async function Auth() {
      if (!accessToken) {
        const newAccessToken = await getAccessToken();
        if (!newAccessToken) {
          alert('로그인이 필요합니다.');
          router.push('/login');
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    Auth();
  }, [accessToken]);

  return {
    isLoading,
  };
}
