import { PreviewProps } from "components/Preview/Preview";

const generateStyleElementsString = (styles: PreviewProps["styles"]) =>
  styles
    .filter((s) => s?.content)
    .map((s) => `<style id='${s.id}_style'>${s.content}</style>`)
    .join("");

const generateScriptElementsString = (scripts: PreviewProps["scripts"]) =>
  scripts
    .filter((s) => s?.content || s?.href)
    .map((s) => {
      if (s.href) {
        if (s.href.startsWith("http")) {
          return `<script id='${s.id}_script' type='${
            s.type ?? "text/javascript"
          }' charset='utf-8' crossorigin='anonymous' src='${s.href}'></script>`;
        } else {
          return `<script id='${s.id}_script' type='${
            s.type ?? "text/javascript"
          }' charset='utf-8' src='${s.href}'></script>`;
        }
      } else {
        return `<script id='${s.id}_script' type='${
          s.type ?? "text/javascript"
        }'>${s.content}</script>`;
      }
    })
    .join("");
const generateLinkElementsString = (links: PreviewProps["links"]) =>
  links
    .filter((s) => s?.href)
    .map((s) => `<link id='${s.id}_link' rel='stylesheet' href='${s.href}' />`)
    .join("");

const generateIframeDOC = ({
  links,
  styles,
  scripts,
  inlineHtml,
}: {
  links: string;
  styles: string;
  scripts: string;
  inlineHtml: string;
}) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style id='global'>
        html, body {
          width: 99.8%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      </style>
      <script>
        /* MyReact highlight */
        window.__highlight__ = true;
      </script>
      ${links}
      ${styles}
    </head>
    <body>
      ${inlineHtml}
      ${scripts}
    </body>
  </html>`;
};

export {
  generateIframeDOC,
  generateLinkElementsString,
  generateScriptElementsString,
  generateStyleElementsString,
};
