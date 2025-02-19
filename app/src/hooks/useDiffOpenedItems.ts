import { createState } from "reactivity-store";

export const useDiffOpenedItems = createState(() => ({ keys: {} }) as { keys: Record<string, boolean> }, {
  withActions: (state) => ({
    toggle: (key: string) => {
      state.keys[key] = !state.keys[key];
      state.keys = { ...state.keys };
    },
    openAll: (keys: Record<string, boolean>) => {
      state.keys = keys;
    },
    open: (key: string) => {
      state.keys[key] = true;
      state.keys = { ...state.keys };
    },
    close: (key: string) => {
      state.keys[key] = false;
      state.keys = { ...state.keys };
    },
    set: (key: string, value: boolean) => {
      state.keys[key] = value;
      state.keys = { ...state.keys };
    },
    reset: () => {
      state.keys = {};
    },
  }),
  withDeepSelector: false,
  withStableSelector: true,
});
