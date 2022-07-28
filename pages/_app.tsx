import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";


import { Layout } from "components/Layout";
import { useApollo } from "graphql/client";
import { theme } from "theme";

import type { AppProps } from "next/app";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo();
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
