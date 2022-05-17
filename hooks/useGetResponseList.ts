import { useMemo } from "react";
import { Layout } from "react-grid-layout";

export const BLOG_GRID_HEIGHT = 10;

const _generateFunction =
  (width: number) =>
  (index: number, id: string, dataLength: number): Layout => {
    return {
      i: id + index,
      x: Math.floor(index % width),
      y: Math.floor(index / width),
      w: 1,
      h: BLOG_GRID_HEIGHT + Math.floor(dataLength / 60),
      minH: BLOG_GRID_HEIGHT,
    };
  };

const smGenerate = _generateFunction(1);
const mdGenerate = _generateFunction(2);
const lgGenerate = _generateFunction(3);

export const useGetResponseList = (
  items: { id: string; bodyText: string }[]
) => {
  return useMemo(() => {
    const sm = items.map(({ id, bodyText }, i) =>
      smGenerate(i, id, bodyText.length)
    );
    const md = items.map(({ id, bodyText }, i) =>
      mdGenerate(i, id, bodyText.length)
    );
    const lg = items.map(({ id, bodyText }, i) =>
      lgGenerate(i, id, bodyText.length)
    );
    return {
      lg,
      md,
      sm,
      xs: sm,
      xxs: sm,
    };
  }, [items]);
};
