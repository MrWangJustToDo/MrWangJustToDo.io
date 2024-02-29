import { debounce } from "lodash-es";

importScripts("https://unpkg.com/@babel/standalone/babel.min.js");

const compiler = (tsxString: string) => Babel.transform(tsxString, { filename: "index.tsx", presets: ["env", "typescript", "react"] });

const response = debounce(({ data, id }) => postMessage({ js: data, id }), 200);

const error = debounce(({ error, id }) => postMessage({ error, id }), 200);

addEventListener("message", (event) => {
  const id = event.data.id;
  const tsxString = event.data.tsx;
  try {
    const js = compiler(tsxString);
    response({ data: js.code, id });
  } catch (e) {
    error({ error: e.message, id });
  }
});
