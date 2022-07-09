import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>C0FEE</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default layout;
