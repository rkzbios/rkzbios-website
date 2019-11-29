import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';
import theme from '../src/theme';

class RKZBiosDocument extends Document {
  render() {

    //console.log(this.props.lang);

    // <meta name="google-site-verification" content="" />
    return (
      <html lang={this.props.lang} dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="icon" type="image/png" href="/static/img/favicon.png" />
         
 
          <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet"/>


    <link
      rel="stylesheet"
      href="/static/css/leaflet-1.5.1.css"
    />
      
        <script src="/static/js/delayed-scroll-restoration-polyfill@0.1.1.js"></script>

          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

RKZBiosDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;




  
  ctx.renderPage = () => 
    originalRenderPage({
      
      enhanceApp: App => props => 
        sheets.collect(<App {...props} />)
      ,
    });

    

  const initialProps = await Document.getInitialProps(ctx);

  const lang = ctx.req && ctx.req.query && ctx.req.query.lang ? ctx.req.query.lang : "nl-NL"; 
 
  return {
    ...initialProps,
    lang: lang,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        {sheets.getStyleElement()}
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default RKZBiosDocument;
