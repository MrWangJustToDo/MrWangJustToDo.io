import { useCallbackRef, useSafeLayoutEffect } from "@chakra-ui/react";
import { getRect, inView, smoothScroll } from "@reactour/utils";
import { debounce } from "lodash-es";
import { useEffect, useRef, useState, useMemo } from "react";

import type { RefObject } from "react";

type DOMRectType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
  x: number;
  y: number;
};

const INITIAL_RECT: DOMRectType = {
  width: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  x: 0,
  y: 0,
};

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

export const useTourTargetSize = (target: string, highlightSelectors: string[], action?: () => void) => {
  const [sizes, setSizes] = useState(INITIAL_RECT);
  const updateCountRef = useRef(0);

  const refreshSizes = useCallbackRef(() => {
    updateCountRef.current++;
    const update = (count: number) => {
      action?.();
      const targetElement = document.querySelector(target);
      let highlightElement = highlightSelectors.map((selector) => document.querySelector(selector)).filter(Boolean) as Element[];
      if (targetElement) {
        let rest = getRect(targetElement);
        if (inView(rest)) {
          highlightElement.forEach((dom) => {
            const rect = dom.getBoundingClientRect();
            if (rect.top < rest.top) {
              rest.top = rect.top;
            }
            if (rect.bottom > rest.bottom) {
              rest.bottom = rect.bottom;
            }
            if (rect.left < rest.left) {
              rest.left = rect.left;
            }
            if (rect.right > rest.right) {
              rest.right = rect.right;
            }
            rest.width = rest.right - rest.left;
            rest.height = rest.bottom - rest.top;
          });
          highlightElement = [];
          setSizes(rest);
        } else {
          smoothScroll(targetElement, {
            block: "center",
            behavior: "auto",
          }).then(() => {
            rest = getRect(targetElement);
            highlightElement.forEach((dom) => {
              const rect = dom.getBoundingClientRect();
              if (rect.top < rest.top) {
                rest.top = rect.top;
              }
              if (rect.bottom > rest.bottom) {
                rest.bottom = rect.bottom;
              }
              if (rect.left < rest.left) {
                rest.left = rect.left;
              }
              if (rect.right > rest.right) {
                rest.right = rect.right;
              }
              rest.width = rest.right - rest.left;
              rest.height = rest.bottom - rest.top;
            });
            highlightElement = [];
            if (updateCountRef.current === count) {
              setSizes(rest);
            }
          });
        }
      } else {
        setSizes(INITIAL_RECT);
      }
    };
    update(updateCountRef.current);
  });

  const debouncedRefresh = useMemo(() => debounce(refreshSizes, 200, { leading: true }), [refreshSizes]);

  useEffect(() => {
    debouncedRefresh();
    window.addEventListener("resize", debouncedRefresh);
    return () => window.removeEventListener("resize", debouncedRefresh);
  }, [debouncedRefresh, highlightSelectors, setSizes, target]);

  return { sizes, debouncedRefresh };
};
