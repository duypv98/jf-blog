import { PropsWithChildren } from 'react';
import Head from 'next/head';

/**
 * 
 * @param {PropsWithChildren<{}>} props 
 */
const Layout = (props) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>Blog | Duy PV - Jerry F</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    {props.children}
  </>
)

export default Layout;
