import { createContext } from 'react';
import { withAuth } from '../../src/components/commons/hocs/withAuth';
import User from '../../src/components/units/user/User.container';

export const UserContext = createContext(null);
const MyPage = () => {
  return (
    <UserContext.Provider value={{ isEdit: true }}>
      <User />;
    </UserContext.Provider>
  );
};

export default withAuth(MyPage);
