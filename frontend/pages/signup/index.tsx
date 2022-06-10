import { useEffect, useState } from 'react';
import User from '../../src/components/units/user/User.container';
import { UserContext } from '../mypage';

export default function SignUpPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log('aaaaa', document.cookie);
    const email = document.cookie
      .split('; ')
      .filter((e) => e.startsWith('email='))[0]
      ?.replace('email=', '');
    console.log('bbbbb', email);
    setEmail(email);
  }, []);

  return (
    <UserContext.Provider value={{ email }}>
      <User />;
    </UserContext.Provider>
  );
}
