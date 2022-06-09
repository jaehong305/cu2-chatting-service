import { createContext } from 'react';
import { useAuth } from '../../src/components/commons/hooks/useAuth';
import User from '../../src/components/units/user/User.container';

export const UserContext = createContext(null);
export default function MyPage() {
  const { isLoading } = useAuth();

  if (isLoading) return <></>;
  return (
    <UserContext.Provider value={{ isEdit: true }}>
      <User />;
    </UserContext.Provider>
  );
}
