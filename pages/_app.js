import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

import Router from "next/router";
import withGA from "../src/analytics/index";



class RKZBiosWebsiteApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    if ('scrollRestoration' in history) {
      // Back off, browser, I got this...
      //console.log( 'disable scroll Restauration');
      history.scrollRestoration = 'manual';
    }
    
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}

const RKZBIOS_TRACKING_ID = 'UA-153595055-1';

export default withGA(RKZBIOS_TRACKING_ID, Router)(RKZBiosWebsiteApp);
