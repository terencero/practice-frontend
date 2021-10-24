/* eslint-disable react/prop-types */
import { ApolloProvider } from '@apollo/client';
import PropTypes, { any } from 'prop-types';
import NProgress from 'nprogress';
// import '../components/styles/nprogress.css';
import Router from 'next/router';
import Page from '../components/Page';
import withData from '../lib/withData';

import 'nprogress/nprogress.css';
// import { Component } from 'react';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};

  console.log('get initial props has props?', Component.getInitialProps)
  console.log('get initial props ctx', ctx)
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;

  return { pageProps };
};

// MyApp.propTypes = {
//   Component: PropTypes.func,
//   pageProps: PropTypes.any,
//   apollo: PropTypes.instanceOf(any),
// };
// console.log('my app', MyApp)
export default withData(MyApp);
