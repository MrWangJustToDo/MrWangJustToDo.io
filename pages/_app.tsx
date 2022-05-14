import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Layout } from "components/Layout";
import { useApollo } from "graphql/client";
import { AppProps } from "next/app";

import "react-grid-layout/css/styles.css";
import "react-grid-layout/node_modules/react-resizable/css/styles.css";
import "styles/global.scss";

const theme = extendTheme({
  breakpoints: {
    sm: "480",
    md: "768",
    lg: "960",
    xl: "1200",
  },
});

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
