import Head from 'next/head';
/* Tanda !!raw-loader biar benar benar string */
const bootstrap_style : any = require('!!raw-loader!bootstrap/dist/css/bootstrap.min.css').default;
const style : any = require('!!raw-loader!../../styles/v1/auth.css').default;


function Layout({ children }: any) {
  return <>
    <Head>
      <style>
        {bootstrap_style}
        {style}
      </style>
    </Head>
    {children}
  </>;
}

export default Layout;