import type { PreviewProps } from "@app/components/Preview/Preview";
import type { INITIAL_EDITOR } from "@app/config/editor";

const getAllFiles = (files: typeof INITIAL_EDITOR, type: "tsx" | "css" | "html") => {
  return Object.keys(files)
    .filter((name) => name.endsWith(type))
    .map((key) => files[key]);
};

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
          return `<script id='${s.id}_script' type='${s.type ?? "text/javascript"}' charset='utf-8' crossorigin='anonymous' src='${s.href}'></script>`;
        } else {
          return `<script id='${s.id}_script' type='${s.type ?? "text/javascript"}' charset='utf-8' src='${s.href}'></script>`;
        }
      } else {
        return `<script id='${s.id}_script' type='text/javascript'>${s.content}</script>`;
      }
    })
    .join("");

const generateLinkElementsString = (links: PreviewProps["links"]) =>
  links
    .filter((s) => s?.href)
    .map((s) => `<link id='${s.id}_link' rel='stylesheet' href='${s.href}' />`)
    .join("");

const generateIframeDOC = ({ links, styles, scripts, inlineHtml }: { links: string; styles: string; scripts: string; inlineHtml: string }) => {
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
      ${links}
      ${styles}
    </head>
    <body>
      ${inlineHtml}
      ${scripts}
      <script>
        window.addEventListener('message', (e) => {
          const js = e.data.js;
          const css = e.data.css;
          const jsId = 'dynamic_js';
          const cssId = 'dynamic_css';
          const jsElement = document.querySelector('#' + jsId);
          const cssElement = document.querySelector('#' + cssId);
          if (js) {
            const element = document.createElement('script');
            element.id = jsId;
            element.innerHTML = js;
            if (jsElement) {
              jsElement.parentNode.replaceChild(element, jsElement);
            } else {
              document.body.appendChild(element);
            }
          }
          if (css) {
            const element = document.createElement('style');
            element.id = cssId;
            element.innerHTML = css;
            if (cssElement) {
              cssElement.parentNode.replaceChild(element, cssElement);
            } else {
              document.head.appendChild(element);
            }
          }
          top.postMessage(e.data, '*');
        })
      </script>
    </body>
  </html>`;
};

export { getAllFiles, generateIframeDOC, generateLinkElementsString, generateScriptElementsString, generateStyleElementsString };
