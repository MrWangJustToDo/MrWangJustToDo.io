import * as Babel from "@babel/standalone";
import { debounce } from "lodash-es";

const compiler = (tsxString: string) => Babel.transform(tsxString, { filename: "index.tsx", presets: ["env", "typescript", "react"] });

const response = debounce(({ data, id }) => postMessage({ js: data, id }), 200);

addEventListener("message", (event) => {
  const id = event.data.id;
  const tsxString = event.data.tsx;
  const js = compiler(tsxString);
  response({ data: js.code, id });
});
