import { createState } from "reactivity-store";

export const useLeetCodeSelectId = createState(() => ({ state: undefined as string | undefined }), {
  withActions: (state: { state: string }) => ({ set: (id?: string) => (state.state = id) }),
  withNamespace: "useLeetCodeSelectId",
});
