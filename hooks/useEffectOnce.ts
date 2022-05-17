import { useEffect } from "react";

export const useEffectOnce = (action: Function) => {
  useEffect(() => {
    return action();
  }, []);
};
