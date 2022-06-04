import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import Layout from '../src/components/commons/layout';
import { globalStyles } from '../src/commons/styles/globalStyles';
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IUserInfo {
  email?: string;
  nickname?: string;
  image?: string;
}

interface IGlobalContext {
  accessToken?: string;
  setAccessToken?: Dispatch<SetStateAction<string>>;
  userInfo?: IUserInfo;
  setUserInfo?: Dispatch<SetStateAction<IUserInfo>>;
}
export const GlobalContext = createContext<IGlobalContext>({});
function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState('');
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const value = {
    accessToken,
    setAccessToken,
    userInfo,
    setUserInfo,
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAccessToken(localStorage.getItem('accessToken') || '');
    }
  }, []);

  const uploadLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
  });

  return (
    <GlobalContext.Provider value={value}>
      <ApolloProvider client={client}>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </GlobalContext.Provider>
  );
}

export default MyApp;
