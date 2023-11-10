import { createState } from "reactivity-store";

export const useLeetCodeSelectId = createState(() => ({ state: undefined }), { withActions: (state) => ({ set: (id?: string) => (state.state = id) }) });
