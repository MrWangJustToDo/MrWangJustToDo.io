import { useEffect } from "react";

export const useEffectOnce = (action: Function) => {
  useEffect(() => {
    return action();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
