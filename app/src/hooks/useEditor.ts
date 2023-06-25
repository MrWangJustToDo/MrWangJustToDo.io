import { debounce } from "lodash-es";
import { createState, withActions, withPersist } from "reactivity-store";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

import { INITIAL_EDITOR, EDITOR_STORE_KEY } from "@app/config/editor";

// SEE https://github.com/pmndrs/zustand/blob/main/docs/typescript.md#using-middlewares
export const useEditor = create<{
  file: keyof typeof INITIAL_EDITOR;
  files: typeof INITIAL_EDITOR;
  reset: () => void;
  setFile: (newKey: string) => void;
  setContent: (newContent: string) => void;
}>()(
  devtools(
    !__DEV__
      ? persist(
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
              { leading: true },
            ),
          }),
          {
            name: EDITOR_STORE_KEY + "_2023-6-1",
          },
        )
      : (set, get) => ({
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
            { leading: true },
          ),
        }),
  ),
);

const setup = __DEV__
  ? withActions(() => ({ file: "script.tsx", files: INITIAL_EDITOR }), {
      generateActions: (state) => ({
        reset: () => {
          state.file = "script.tsx";
          state.files = INITIAL_EDITOR;
        },
        setFile: (newFile: string) => {
          const keys = Object.keys(state.files);
          if (newFile !== state.file && keys.includes(newFile)) {
            state.file = newFile;
          }
        },
        setContent: debounce(
          (content: string) => {
            state.files[state.file as keyof typeof INITIAL_EDITOR].content = content;
          },
          200,
          { leading: true },
        ),
      }),
    })
  : withActions(
      withPersist(() => ({ file: "script.tsx", files: INITIAL_EDITOR }), { key: EDITOR_STORE_KEY + "_2023-6-25" + "_new" }),
      {
        generateActions: (state) => ({
          reset: () => {
            state.file = "script.tsx";
            state.files = INITIAL_EDITOR;
          },
          setFile: (newFile: string) => {
            const keys = Object.keys(state.files);
            if (newFile !== state.file && keys.includes(newFile)) {
              state.file = newFile;
            }
          },
          setContent: debounce(
            (content: string) => {
              state.files[state.file as keyof typeof INITIAL_EDITOR].content = content;
            },
            200,
            { leading: true },
          ),
        }),
      },
    );

export const useEditor_v2 = createState(setup)
