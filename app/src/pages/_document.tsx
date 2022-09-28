import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <Script
            id="baidu_track"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?4403c45987af8610ed1d78fea2a82baa";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
          `,
            }}
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript type="localStorage" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
