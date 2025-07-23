import { createState } from "reactivity-store";

export const useDiffViewSearch = createState(
  () => ({
    searchValue: "",
  }),
  {
    withActions: (s) => ({
      setSearchValue: (value: string) => {
        s.searchValue = value;
      },
      clearSearchValue: () => {
        s.searchValue = "";
      },
    }),
  },
);
