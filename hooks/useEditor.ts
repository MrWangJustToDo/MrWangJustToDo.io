import { debounce } from "lodash-es";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

const initialFiles = {
  "script.jsx": {
    id: "main",
    type: "text/babel",
    name: "script.jsx",
    language: "javascript",
    content: "",
  },
  "style.css": {
    id: "main",
    name: "style.css",
    language: "css",
    content: "",
  },
  "index.html": {
    id: "main",
    name: "index.html",
    language: "html",
    content: "",
  },
};

// SEE https://github.com/pmndrs/zustand/blob/main/docs/typescript.md#using-middlewares
export const useEditor = create<{
  file: keyof typeof initialFiles;
  files: typeof initialFiles;
  setFile: (newKey: string) => void;
  setContent: (newContent: string) => void;
}>()(
  devtools(
    persist(
      (set, get) => ({
        file: "script.jsx",
        files: initialFiles,
        setFile: (newFile) => {
          const { files, file } = get();
          const keys = Object.keys(files);
          if (newFile !== file && keys.includes(newFile)) {
            set({ file: newFile as keyof typeof initialFiles });
          }
        },
        setContent: debounce(
          (content) => {
            const state = get();
            const { file, files } = state;
            set({
              files: {
                ...files,
                [file]: {
                  ...files[file],
                  content,
                },
              },
            });
          },
          200,
          { leading: true }
        ),
      }),
      {
        name: "playGround",
      }
    )
  )
);
