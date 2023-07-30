import { createState } from "reactivity-store";

export const useType = createState(() => ({ type: "" }), { withActions: (s) => ({ set: (type: string) => (s.type = type) }) });
