import { createState } from "reactivity-store";

export const useDiffAsideCompose = createState(() => ({ state: false }) as { state: boolean }, {
  withActions: (s) => {
    return {
      setState: (state: boolean) => {
        s.state = state;
      },
    };
  },
  withDeepSelector: false,
  withStableSelector: true,
  withNamespace: "useDiffAsideCompose",
});
