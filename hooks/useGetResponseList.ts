import { useBreakpointValue } from "@chakra-ui/react";
import { useMemo } from "react";
import { Layout } from "react-grid-layout";

export const BLOG_GRID_HEIGHT = 16;

const _generateFunction =
  (width: number) =>
  (index: number, id: string): Layout => {
    return {
      i: id + index,
      x: Math.floor(index % width),
      y: Math.floor(index / width) * BLOG_GRID_HEIGHT,
      w: 1,
      h: BLOG_GRID_HEIGHT + index * 10,
    };
  };

const smGenerate = _generateFunction(1);
const mdGenerate = _generateFunction(2);
const lgGenerate = _generateFunction(3);

export const useGetResponseList = (items: { id: string }[]) => {
  return useMemo(() => {
    const sm = items.map(({ id }, i) => smGenerate(i, id));
    const md = items.map(({ id }, i) => mdGenerate(i, id));
    const lg = items.map(({ id }, i) => lgGenerate(i, id));
    return {
      lg,
      md,
      sm,
      xs: sm,
      xxs: sm,
    };
  }, [items]);
};
