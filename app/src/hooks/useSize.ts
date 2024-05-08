import { useCallbackRef } from "@chakra-ui/react";
import { getRect, inView, smoothScroll } from "@reactour/utils";
import { debounce } from "lodash-es";
import { useEffect, useRef, useState, useMemo } from "react";

import { useDebouncedState } from "./useDebouncedState";

import type { RefObject } from "react";

const temp = [];

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

export function useDomSize({ ref, cssSelector }: { ref: RefObject<HTMLElement> | null; cssSelector?: string }): DOMRectType;
export function useDomSize({ ref, cssSelector }: { ref?: RefObject<HTMLElement>; cssSelector: string }): DOMRectType;
export function useDomSize({ ref, cssSelector }: { ref?: RefObject<HTMLElement> | null; cssSelector?: string }) {
  const [rect, setRect] = useDebouncedState<DOMRectType>(INITIAL_RECT, 100);

  useEffect(() => {
    const domElement = ref ? ref.current : cssSelector ? document.querySelector(cssSelector) : null;
    if (domElement) {
      if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {
          setRect(domElement.getBoundingClientRect());
        });

        resizeObserver.observe(domElement);

        return () => resizeObserver.disconnect();
      } else {
        const handleResize = () => setRect(domElement.getBoundingClientRect());

        handleResize();

        window.addEventListener("resize", handleResize, { passive: true });

        return () => window.removeEventListener("resize", handleResize);
      }
    }
  }, [ref, cssSelector, setRect]);

  return rect;
}

export const useStaticDomSize = ({ ref, cssSelector, deps }: { ref?: RefObject<HTMLElement>; cssSelector?: string; deps?: any[] }) => {
  const [rect, setRect] = useState<DOMRectType>(INITIAL_RECT);

  useEffect(() => {
    const domElement = ref ? ref.current : cssSelector ? document.querySelector(cssSelector) : null;
    if (domElement) {
      setRect(domElement.getBoundingClientRect());
    }
    return () => {
      setRect(INITIAL_RECT);
    };
  }, [ref, cssSelector, setRect, ...(deps || temp)]);

  return rect;
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
        setSizes({ ...INITIAL_RECT });
      }
    };
    update(updateCountRef.current);
  });

  const debouncedRefresh = useMemo(() => debounce(refreshSizes, 200, { leading: true }), [refreshSizes]);

  useEffect(() => {
    debouncedRefresh();
    window.addEventListener("resize", debouncedRefresh, { passive: true });
    return () => window.removeEventListener("resize", debouncedRefresh);
  }, [debouncedRefresh, highlightSelectors, setSizes, target]);

  return { sizes, debouncedRefresh };
};
