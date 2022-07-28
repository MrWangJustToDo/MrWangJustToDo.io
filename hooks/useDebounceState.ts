import { debounce } from "lodash-es";
import { useMemo, useState } from "react";

import type { Dispatch, SetStateAction} from "react";

export const useDebounceState = <T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(initialState);
  const setDebounceState = useMemo(() => debounce(setState, 200), [setState]);

  return [state, setDebounceState];
};
