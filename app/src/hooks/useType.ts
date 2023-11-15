import { createState } from "reactivity-store";

export const useType = createState(() => ({ type: "" }), { withActions: (s: { type: string; }) => ({ set: (type: string) => (s.type = type) }), withNamespace: "useType" });
