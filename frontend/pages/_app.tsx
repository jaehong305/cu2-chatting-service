import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import Layout from '../src/components/commons/layout';
import { globalStyles } from '../src/commons/styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
