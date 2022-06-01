import { useEffect, useState } from 'react';
import User from '../../src/components/units/user/User.container';

export default function SignUpPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const email = document.cookie
      .split('; ')
      .filter((e) => e.includes('email='))[0]
      .replace('email=', '');

    setEmail(email);
  }, []);

  return <User email={email} />;
}
