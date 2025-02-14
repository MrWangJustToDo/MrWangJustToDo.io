import { createState } from "reactivity-store";

import type { MutableRefObject } from "react";

export const useGitHubCompareScrollContainer = createState(
  () => ({ ele: null, eleRef: { current: null } }) as { ele: HTMLElement | null; eleRef: MutableRefObject<HTMLElement> },
  {
    withDeepSelector: false,
    withStableSelector: true,
    withActions: (s) => ({
      setEle: (ele: HTMLElement | null) => {
        s.ele = ele;
        s.eleRef.current = ele;
      },
      clearEle: () => {
        s.ele = null;
        s.eleRef.current = null;
      },
    }),
  },
);
