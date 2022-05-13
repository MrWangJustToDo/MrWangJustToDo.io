import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "components/Layout";
import { useApollo } from "graphql/client";
import { AppProps } from "next/app";

import "react-grid-layout/css/styles.css";
import "react-grid-layout/node_modules/react-resizable/css/styles.css";
import "styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo();
  return (
    <ChakraProvider resetCSS>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
