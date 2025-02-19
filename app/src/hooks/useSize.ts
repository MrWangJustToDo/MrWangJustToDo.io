import { useCallbackRef, useSafeLayoutEffect } from "@chakra-ui/react";
import { getRect, inView, smoothScroll } from "@reactour/utils";
import { debounce } from "lodash-es";
import { useEffect, useRef, useState, useMemo } from "react";

import { useDebouncedState } from "./useDebouncedState";

import type { RefObject } from "react";

const temp = [];

export type DOMRectType = {
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

export function useDomSize({
  ref,
  cssSelector,
  getEle,
  delay = 100,
  deps,
}: {
  ref?: RefObject<HTMLElement> | null;
  cssSelector?: string;
  getEle?: () => HTMLElement;
  delay?: number;
  deps?: any[];
}): DOMRectType {
  const getEleRef = useRef(getEle);

  getEleRef.current = getEle;

  const [rect, setRect] = useDebouncedState<DOMRectType>(INITIAL_RECT, delay);

  useEffect(() => {
    const domElement = ref ? ref.current : cssSelector ? document.querySelector(cssSelector) : getEleRef.current?.() || null;
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
  }, [ref, cssSelector, setRect, ...(deps || temp)]);

  return rect;
}

export const useStaticDomSize = ({
  ref,
  getEle,
  cssSelector,
  deps,
}: {
  ref?: RefObject<HTMLElement>;
  getEle?: () => HTMLElement | null;
  cssSelector?: string;
  deps?: any[];
}) => {
  const [rect, setRect] = useState<DOMRectType>(INITIAL_RECT);

  const getElementRef = useRef(getEle);

  getElementRef.current = getEle;

  useEffect(() => {
    const domElement = ref
      ? ref.current
      : cssSelector
        ? document.querySelector(cssSelector)
        : getElementRef.current
          ? getElementRef.current()
          : null;
    if (domElement) {
      (domElement as HTMLElement).style.width = "auto";
      
      setRect(domElement.getBoundingClientRect());
    }
    return () => {
      setRect(INITIAL_RECT);
    };
  }, [ref, cssSelector, setRect, ...(deps || [])]);

  return rect;
};

export function useSyncDomSize({
  ref,
  cssSelector,
  getEle,
  deps,
}: {
  ref?: RefObject<HTMLElement> | null;
  cssSelector?: string;
  getEle?: () => HTMLElement;
  deps?: any[];
}): DOMRectType {
  const getEleRef = useRef(getEle);

  getEleRef.current = getEle;

  const [rect, setRect] = useState(INITIAL_RECT);

  useSafeLayoutEffect(() => {
    const domElement = ref ? ref.current : cssSelector ? document.querySelector(cssSelector) : getEleRef.current?.() || null;
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
  }, [ref, cssSelector, setRect, ...(deps || temp)]);

  return rect;
}

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
