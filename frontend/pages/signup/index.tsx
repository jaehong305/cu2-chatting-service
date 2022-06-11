import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import User from '../../src/components/units/user/User.container';
import { UserContext } from '../mypage';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const social = router.asPath.split('?')[1];
    setEmail(social);
  }, []);

  return (
    <UserContext.Provider value={{ email }}>
      <User />;
    </UserContext.Provider>
  );
}
