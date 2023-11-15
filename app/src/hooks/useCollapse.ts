import { createState } from "reactivity-store";

export const useCollapse = createState(() => ({ state: true }), { withActions: (s: { state: boolean; }) => ({ toggle: () => (s.state = !s.state) }), withNamespace: 'useCollapse' });
