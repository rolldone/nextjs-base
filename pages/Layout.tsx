import Head from 'next/head';
/* Tanda !!raw-loader biar benar benar string */
const bootstrap_style : any = require('!!raw-loader!bootstrap/dist/css/bootstrap.min.css').default;
const style : any = require('!!raw-loader!../styles/v1/base.css').default;

function Layout({ children }: any) {
  let components = ((parseChildren: Array<Object>) => {
    let coms: any = {
      'atas': null,
      'content': null,
      'samping': null
    };
    for (var a = 0; a < parseChildren.length; a++) {
      let compItem : any = parseChildren[a];
      coms[compItem.props['data-pos']] = compItem;
    }
    return coms;
  })(children);
  return <div>
    <Head>
      <style>
        {bootstrap_style}
        {style}
      </style>
    </Head>
    {components['atas']}
    <div className="container-fluid">
      <div className="row">
        {components['samping']}
        {components['content']}
      </div>
    </div>
  </div>;
}

export default Layout;