import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import Layout from '../src/components/commons/layout';
import { globalStyles } from '../src/commons/styles/globalStyles';
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { onError } from '@apollo/client/link/error';
import { getAccessToken } from '../src/commons/libraries/getAccessToken';
import { backendURL } from '../src/commons/config/config';

interface IGlobalContext {
  accessToken?: string;
  setAccessToken?: Dispatch<SetStateAction<string>>;
  visitedPage?: string;
  setVisitedPage?: Dispatch<SetStateAction<string>>;
}
export const GlobalContext = createContext<IGlobalContext>({});
function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState('');
  const [visitedPage, setVisitedPage] = useState('/');
  const value = {
    accessToken,
    setAccessToken,
    visitedPage,
    setVisitedPage,
  };

  useEffect(() => {
    getAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === 'UNAUTHENTICATED') {
          getAccessToken().then((newAccessToken) => {
            setAccessToken(newAccessToken);
            operation.setContext({
              headers: {
                ...operation.getContext().headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            return forward(operation);
          });
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: `${backendURL}/graphql`,
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
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
