import { createStore, ref } from "reactivity-store";

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

export const useBlogSource = createStore(() => {
  const sources = ref(Source);

  const sourceName = ref(Source[0].name);

  const source = ref(Source[0]);

  const setSource = (newSource: string) => {
    if (newSource !== sourceName.value && sources.value.some((v) => v.name === newSource)) {
      sourceName.value = newSource;
      source.value = sources.value.find((v) => v.name === newSource);
    }
  };

  return { sources, source, setSource, sourceName };
});
