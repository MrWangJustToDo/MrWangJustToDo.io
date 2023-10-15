import { createState } from "reactivity-store";

export const useFullScreen = createState(() => ({ state: false }), { withActions: (state) => ({ toggle: () => (state.state = !state.state) }) });
