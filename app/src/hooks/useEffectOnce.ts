import { useEffect } from "react";

export const useEffectOnce = (action: () => void | (() => void)) => {
  useEffect(() => {
    return action();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
