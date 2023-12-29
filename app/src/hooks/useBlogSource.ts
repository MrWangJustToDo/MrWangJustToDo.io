import { createState } from "reactivity-store";

import { useListLayoutStore } from "./useGetResponseListLayout";

const Source = [
  {
    name: "Blog",
    url: "https://github.com/MrWangJustToDo/MrWangJustToDo.io/issues",
    repository: "MrWangJustToDo.io",
    owner: "MrWangJustToDo",
  },
  {
    name: "React",
    url: "https://github.com/facebook/react/issues",
    repository: "react",
    owner: "facebook",
  },
];

const { updateLayout } = useListLayoutStore.getActions();

export const useBlogSource = createState(() => ({ sources: Source, source: Source[0], sourceName: Source[0].name }), {
  withActions: (state: { sourceName: string; sources: typeof Source; source: (typeof Source)[number] }) => ({
    setSource: (newSource: string) => {
      if (newSource !== state.sourceName && state.sources.some((v) => v.name === newSource)) {
        state.sourceName = newSource;
        state.source = state.sources.find((v) => v.name === newSource);
      }
      updateLayout({});
    },
  }),
  withNamespace: "useBlogSource",
});
