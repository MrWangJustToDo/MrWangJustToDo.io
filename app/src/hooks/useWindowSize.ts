import { isBrowser } from "framer-motion";
import { useEffect } from "react";

import { useDebounceState } from "./useDebounceState";

export const useWindowSize = () => {
  const [state, setState] = useDebounceState({
    height: isBrowser ? window.innerHeight : 0,
    width: isBrowser ? window.innerHeight : 0,
  });

  useEffect(() => {
    const resize = () => setState({ height: window.innerHeight, width: window.innerWidth });

    window.addEventListener("resize", resize);

    return window.removeEventListener("reset", resize);
  }, [setState]);

  return state;
};
