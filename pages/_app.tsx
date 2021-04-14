import App from "next/app";
import '../global';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx } : any) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    global.masterData.saveData('test',{
      form_data : {
        name : 'donny',
        email : 'donny.rolanda'
      },
      id : 1
    });
    return (
      <Component {...pageProps} />
    );
  }
}
