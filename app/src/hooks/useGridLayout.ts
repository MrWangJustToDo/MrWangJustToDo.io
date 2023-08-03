import { createState } from "reactivity-store";

export const useGridLayout = createState(() => ({ state: false }), { withActions: (s) => ({ toggle: () => (s.state = !s.state) }) });
