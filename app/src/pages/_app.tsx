/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@blog/graphql";
import { ChakraProvider } from "@chakra-ui/react";
import { IntlProvider } from "next-intl";
import NextNProgress from "nextjs-progressbar";

import { Layout } from "@app/components/Layout";
import { ENABLE_INFINITY_SCROLL } from "@app/config/gridLayout";
import { theme } from "@app/theme";

import type { NormalizedCacheObject } from "@apollo/client";
import type { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import type { AbstractIntlMessages, IntlError } from "next-intl";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "@app/styles/global.scss";
import "@git-diff-view/react/styles/diff-view.css";

type PageProps = {
  _i18nMessage: AbstractIntlMessages;
  _apolloState: NormalizedCacheObject;
  [k: string]: unknown;
};

const onError = (error: IntlError) => {
  if (__DEV__) {
    console.log(error.message);
  } else {
    void 0;
  }
};

export type NextPageComponent = NextComponentType<NextPageContext, Record<string, unknown>, Record<string, unknown>> & { disableLayout?: boolean };

interface NextAppProps extends AppProps {
  Component: NextPageComponent;
  pageProps: PageProps;
}

function MyApp({ Component, pageProps }: NextAppProps) {
  const { _apolloState = {}, _i18nMessage = {}, ...restProps } = pageProps;

  const apolloClient = useApollo(_apolloState, ENABLE_INFINITY_SCROLL);
  return (
    <ChakraProvider resetCSS theme={theme}>
      {/* <NextIntlProvider messages={_i18nMessage} onError={onError}> */}
      <ApolloProvider client={apolloClient}>
        <NextNProgress />
        {Component.disableLayout ? (
          <Component {...restProps} />
        ) : (
          <Layout>
            <Component {...restProps} />
          </Layout>
        )}
      </ApolloProvider>
      {/* </NextIntlProvider> */}
    </ChakraProvider>
  );
}

export default MyApp;
