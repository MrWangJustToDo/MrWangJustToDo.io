import { cssTemplate, htmlTemplate, tsxTemplate } from "./template";

export const EDITOR_STORE_KEY = "MyReact_playGround";

export const INITIAL_EDITOR = {
  "script.tsx": {
    id: "main",
    type: "text/babel",
    name: "script.tsx",
    language: "typescript",
    content: tsxTemplate["script.tsx"],
  },
  "main.css": {
    id: "main",
    name: "main.css",
    language: "css",
    content: cssTemplate["main.css"],
  },
  "style.css": {
    id: "style",
    name: "style.css",
    language: "css",
    content: cssTemplate["style.css"],
  },
  "index.html": {
    id: "main",
    name: "index.html",
    language: "html",
    content: htmlTemplate["index.html"],
  },
};
