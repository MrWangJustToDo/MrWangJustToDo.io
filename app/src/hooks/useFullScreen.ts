import { createState } from "reactivity-store";

export const useFullScreen = createState(() => ({ state: false }), {
  withActions: (state: { state: boolean; }) => ({ toggle: () => (state.state = !state.state) }),
  withNamespace: "useFullScreen",
});
