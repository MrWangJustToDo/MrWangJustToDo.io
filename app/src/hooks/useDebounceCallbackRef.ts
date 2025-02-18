import { useCallbackRef } from "@chakra-ui/react";
import { debounce } from "lodash-es";
import { useMemo } from "react";

export const useDebounceCallbackRef = <T extends (...args: any[]) => any>(fn: T, debounceTime = 100) => {
  const memoCb = useCallbackRef(fn);

  const debounceMemoCb = useMemo(() => debounce(memoCb, debounceTime), [memoCb, debounceTime]);

  return debounceMemoCb;
};
