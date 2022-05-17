import { useReducer } from "react";

export const useUpdate = () => {
  const [_, update] = useReducer((p) => p + 1, 0);

  return update;
};
