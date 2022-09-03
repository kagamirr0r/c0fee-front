import 'ress';
import 'styles/globals.css';
import 'styles/Home.module.css';
import 'tailwindcss/tailwind.css';
import Layout from '@/components/layout';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
