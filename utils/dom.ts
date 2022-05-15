import { GetClass, TransformArray } from "types/utils";
import { log } from "./log";

interface Point {
  clientX: number;
  clientY: number;
}

const transformArray: TransformArray = (arr) => {
  return arr.reduce<string[]>((pre, current) => {
    if (Array.isArray(current)) {
      return pre.concat(transformArray(current));
    }
    if (typeof current === "function") {
      let re = current();
      if (Array.isArray(re)) {
        return pre.concat(transformArray(re));
      } else {
        return pre.concat(transformArray([re]));
      }
    }
    if (typeof current === "string") {
      if (current.length > 0) {
        pre.push(current);
      }
      return pre;
    }
    log(`className type error, ${current}`, "error");
    return pre;
  }, []);
};

export const pinchHelper = {
  isPointerEvent: (event: any): event is PointerEvent =>
    self.PointerEvent && event instanceof PointerEvent,
  getDistance: (a: Point, b?: Point): number => {
    if (!b) return 0;
    return Math.sqrt(
      (b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2
    );
  },
  getMidpoint: (a: Point, b?: Point): Point => {
    if (!b) return a;
    return {
      clientX: (a.clientX + b.clientX) / 2,
      clientY: (a.clientY + b.clientY) / 2,
    };
  },
  getAbsoluteValue: (value: string | number, max: number): number => {
    if (typeof value === "number") return value;

    if (value.trimEnd().endsWith("%")) {
      return (max * parseFloat(value)) / 100;
    }
    return parseFloat(value);
  },
  createMatrix: () => new DOMMatrix(),
  createPoint: () => new DOMPoint(),
};

export const getClass: GetClass = (...res) => transformArray(res).join(" ");

const applyRootStyles = (rootId: string, p: number) => {
  const root = document.querySelector(`#${rootId}`) as HTMLDivElement;

  if (root) {
    const h = window.innerHeight;
    const s = (h - p) / h;
    root.style.overflow = "hidden";
    root.style.willChange = "transform";
    root.style.transition = "transform 200ms linear";
    root.style.transform = `translateY(calc(env(safe-area-inset-top) + ${
      p / 2
    }px)) scale(${s})`;
    root.style.filter = "blur(0.8px)";
  }
};

const cleanupRootStyles = (rootId: string) => {
  const root = document.getElementById(rootId) as HTMLDivElement;

  function onTransitionEnd() {
    root.style.removeProperty("overflow");
    root.style.removeProperty("will-change");
    root.style.removeProperty("transition");
  }

  if (root) {
    // Start animating back
    root.style.removeProperty("transform");
    root.style.removeProperty("filter");
    root.addEventListener("transitionend", onTransitionEnd, { once: true });
  }
};

export const applyOverlaysStyles = (ids: string[]) => {
  ids.reverse().forEach((id, index) => applyRootStyles(id, 12 + index * 2));
};

export const cleanupOverlaysStyles = (ids: string[]) => {
  ids.forEach(cleanupRootStyles);
};
