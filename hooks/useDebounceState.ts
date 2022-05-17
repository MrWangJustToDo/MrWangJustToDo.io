import { debounce } from "lodash-es";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

export const useDebounceState = <T extends any>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(initialState);
  const setDebounceState = useMemo(() => debounce(setState, 200), [setState]);

  return [state, setDebounceState];
};
