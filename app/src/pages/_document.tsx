import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/google-sans"></link>
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
          {/* <!-- Google Tag Manager --> */}
          <Script
            id="google_track"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WMHQGMDL');
          `,
            }}
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript type="localStorage" />
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WMHQGMDL" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
