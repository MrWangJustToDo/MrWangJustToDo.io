import { useMemo } from "react";
import { createState } from "reactivity-store";

import type { Layout, Layouts } from "react-grid-layout";

export const BLOG_GRID_HEIGHT = 10;

export const useListLayoutStore = createState(() => ({ data: {} as Layouts }), {
  withActions: (s) => ({
    updateLayout: (newLayout: Layouts) => {
      s.data = newLayout;
    },
    mergeLayout: (newLayout: Layouts) => {
      const oldData = s.data
      Object.keys(newLayout).forEach((key) => {
        const oldValue = oldData[key];
        const newValue = newLayout[key];
        const newAdded = newValue.filter((item) => oldValue?.every((i) => i.i !== item.i));
        if (newAdded.length) {
          s.data[key].push(...newAdded);
        }
      })
    }
  }),
});

const _generateFunction =
  (width: number) =>
  (index: number, id: string, dataLength: number): Layout => {
    const i = id + index;
    const h = BLOG_GRID_HEIGHT + dataLength;
    const layout = {
      i,
      x: Math.floor(index % width),
      y: Math.floor(index / width),
      w: 1,
      maxW: width,
      h: h,
      minH: BLOG_GRID_HEIGHT,
    };
    return layout;
  };

const xsGenerate = _generateFunction(1);
const smGenerate = _generateFunction(2);
const mdGenerate = _generateFunction(3);
const lgGenerate = _generateFunction(4);

export const useGetResponseListLayout = (items: { id: string; bodyText: string }[]) => {
  return useMemo(() => {
    const xs = items.map(({ id }, i) => xsGenerate(i, id, 4));
    const sm = items.map(({ id }, i) => smGenerate(i, id, 6));
    const md = items.map(({ id }, i) => mdGenerate(i, id, 10));
    const lg = items.map(({ id }, i) => lgGenerate(i, id, 14));
    return {
      lg,
      md,
      sm,
      xs,
      xxs: xs,
    };
  }, [items]);
};
