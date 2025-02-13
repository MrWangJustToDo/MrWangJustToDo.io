import { createState } from "reactivity-store";

export const useGitHubCompareScrollContainer = createState(() => ({ ele: null }) as { ele: HTMLElement | null }, {
  withDeepSelector: false,
  withStableSelector: true,
  withActions: (s) => ({
    setEle: (ele: HTMLElement | null) => {
      s.ele = ele;
    },
    clearEle: () => (s.ele = null),
  }),
});
