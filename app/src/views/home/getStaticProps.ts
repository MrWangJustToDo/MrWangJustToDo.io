import { readFile } from "fs/promises";
import { resolve } from "path";

import type { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const _ReactType = await readFile(resolve(process.cwd(), "node_modules/@types/react/index.d.ts"), "utf-8");
  const ReactType = _ReactType
    .split("\n")
    .map((i) => i.replace(/ +/g, " "))
    .join("\n");
  const _ReactDOMType = await readFile(resolve(process.cwd(), "node_modules/@types/react-dom/index.d.ts"), "utf-8");
  const ReactDOMType = _ReactDOMType
    .split("\n")
    .map((i) => i.replace(/ +/g, " "))
    .join("\n");
  return { props: { ReactType, ReactDOMType } };
};
