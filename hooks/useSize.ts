import { useSafeLayoutEffect } from "@chakra-ui/react";
import { debounce } from "lodash-es";
import { RefObject, useState } from "react";

export const useSize = ({ ref }: { ref: RefObject<HTMLElement> }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useSafeLayoutEffect(() => {
    const calculate = () => {
      if (ref.current) {
        const element = ref.current;
        const rect = element.getBoundingClientRect();
        setSize(rect);
      }
    };

    const debounceCalculate = debounce(calculate, 20, { leading: true });

    debounceCalculate();

    window.addEventListener("resize", debounceCalculate);

    return () => window.removeEventListener("resize", debounceCalculate);
  }, [ref]);

  return size;
};
