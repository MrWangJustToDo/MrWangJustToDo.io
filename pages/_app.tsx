import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "components/Layout";
import { AppProps } from "next/app";

import "react-grid-layout/css/styles.css";
import "react-grid-layout/node_modules/react-resizable/css/styles.css";
import "styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
