import { debounce } from "lodash-es";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

import { INITIAL_EDITOR, EDITOR_STORE_KEY } from "config/editor";

// SEE https://github.com/pmndrs/zustand/blob/main/docs/typescript.md#using-middlewares
export const useEditor = create<{
  file: keyof typeof INITIAL_EDITOR;
  files: typeof INITIAL_EDITOR;
  reset: () => void;
  setFile: (newKey: string) => void;
  setContent: (newContent: string) => void;
}>()(
  devtools(
    persist(
      (set, get) => ({
        file: "script.tsx",
        files: INITIAL_EDITOR,
        reset: () => set({ files: INITIAL_EDITOR, file: "script.tsx" }),
        setFile: (newFile) => {
          const { files, file } = get();
          const keys = Object.keys(files);
          if (newFile !== file && keys.includes(newFile)) {
            set({ file: newFile as keyof typeof INITIAL_EDITOR });
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
        name: EDITOR_STORE_KEY + '_2022-7-30.1',
      }
    )
  )
);
