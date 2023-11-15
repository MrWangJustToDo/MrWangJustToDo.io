import { createState } from "reactivity-store";

export const useGridLayout = createState(() => ({ state: false }), { withActions: (s: { state: boolean; }) => ({ toggle: () => (s.state = !s.state) }), withNamespace: 'useGridLayout' });
