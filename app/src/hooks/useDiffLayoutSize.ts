import { createState } from "reactivity-store";

export const useDiffLayoutSize = createState(() => ({ data: [22, 78] }) as { data: number[] }, {
  withActions: (s) => ({
    set: (data: number[]) => {
      s.data = data;
    },
  }),
  withDeepSelector: false,
  withStableSelector: true,
  withNamespace: "useDiffLayoutSize",
  withPersist: "useDiffLayoutSize",
});
