import { SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";

import { DISABLE_DRAG_HANDLER_SELECTOR, DRAG_HANDLER_SELECTOR, GRID_ROW_HEIGHT } from "@app/config/gridLayout";
import { useFullScreen } from "@app/hooks/useFullScreen";
import { useGetResponseListLayout, useListLayoutStore } from "@app/hooks/useGetResponseListLayout";
import { useDomSize } from "@app/hooks/useSize";

import { Card } from "../Card";
import { GridCard } from "../GridCard";
import { ReactGridLayout } from "../GridLayout";

import { Item } from "./Item";

import type { GetBlogListQuery } from "@blog/graphql";

const BLOG_GRID_COLS = { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 };

const MotionCard = motion(Card);

const Item_ = ({
  number,
  data,
  col,
  state,
  layoutId,
}: {
  number: number;
  data: GetBlogListQuery["repository"]["issues"]["nodes"][number];
  col: number;
  state: boolean;
  layoutId?: string;
}) => {
  const ref = useRef();
  const containerRef = useRef();

  useLayoutEffect(() => {
    containerRef.current = document.querySelector(".tour_blogList");
  }, [state]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end start"], container: state ? undefined : containerRef });
  const x_1 = useTransform(scrollYProgress, [0.2, 1], [0, 45]);
  const x_2 = useTransform(scrollYProgress, [0.2, 1], [0, -45]);
  const x_3 = useTransform(scrollYProgress, [0.3, 1], [0, 25]);
  const x_4 = useTransform(scrollYProgress, [0.3, 1], [0, -25]);
  const skew_1 = useTransform(scrollYProgress, [0.2, 1], [0, -6]);
  const skew_2 = useTransform(scrollYProgress, [0.2, 1], [0, 6]);
  const skew_3 = useTransform(scrollYProgress, [0.3, 1], [0, -3]);
  const skew_4 = useTransform(scrollYProgress, [0.3, 1], [0, 3]);
  const plain = useMotionValue(0);
  const x =
    col === 4
      ? number % 4 === 0
        ? x_1
        : number % 4 === 1
          ? x_2
          : number % 4 === 2
            ? x_4
            : x_3
      : col === 3
        ? number % 3 === 0
          ? x_1
          : number % 3 === 1
            ? x_2
            : plain
        : col === 2
          ? number % 2 === 0
            ? x_1
            : x_2
          : plain;
  const skew =
    col === 4
      ? number % 4 === 0
        ? skew_1
        : number % 4 === 1
          ? skew_2
          : number % 4 === 2
            ? skew_4
            : skew_3
      : col === 3
        ? number % 3 === 0
          ? skew_1
          : number % 3 === 1
            ? skew_2
            : plain
        : col === 2
          ? number % 2 === 0
            ? skew_1
            : skew_2
          : plain;
  return (
    <MotionCard maxHeight="96" ref={ref} style={{ x, skew }} layoutId={layoutId}>
      <Item {...data} />
    </MotionCard>
  );
};

const { updateLayout, mergeLayout } = useListLayoutStore.getActions();

const BlogGridWithGridLayout_ = ({ data, state }: { data: GetBlogListQuery["repository"]["issues"]["nodes"]; state: boolean }) => {
  const newLayout = useGetResponseListLayout(data);

  const layouts = useListLayoutStore(useCallback((s) => s.data, []))

  const { width } = useDomSize({ cssSelector: ".grid-card-list", delay: 800 });

  const { width: bodyWidth } = useDomSize({ cssSelector: ".tour_blogList", delay: 800 });

  useEffect(() => {
    mergeLayout(newLayout);
  }, [newLayout]);

  const mergedLayout = useMemo(() => {
    const obj = {};

    Object.keys(newLayout).forEach((key) => {
      const hasItem = layouts[key]?.length > 0;
      obj[key] = [];
      const oldValue = layouts[key] || [];
      const newValue = newLayout[key];
      newValue.forEach((item) => {
        const lastItem = oldValue.find((_i) => _i.i === item.i);
        if (lastItem) {
          obj[key].push(lastItem);
        } else {
          if (hasItem) {
            obj[key].push({ ...item, y: Infinity });
          } else {
            obj[key].push(item);
          }
        }
      });
    });
    return obj;
  }, [newLayout, layouts]);

  if (width === 0 && !state) return null;

  return (
    <ReactGridLayout
      width={width || bodyWidth}
      layouts={mergedLayout}
      cols={BLOG_GRID_COLS}
      onLayoutChange={(_, layouts) => {
        updateLayout(layouts);
      }}
      rowHeight={GRID_ROW_HEIGHT}
      draggableHandle={`.${DRAG_HANDLER_SELECTOR}`}
      draggableCancel={`.${DISABLE_DRAG_HANDLER_SELECTOR}`}
    >
      {data.map((p, index) => {
        return (
          <GridCard key={p.id + index}>
            <Item {...p} />
          </GridCard>
        );
      })}
    </ReactGridLayout>
  );
};

const BlogGrid_ = ({ data, disableGridLayout = true }: { data: GetBlogListQuery["repository"]["issues"]["nodes"]; disableGridLayout?: boolean }) => {
  const col = useBreakpointValue({ base: 1, md: 2, lg: 3, "2xl": 4 });

  const state = useFullScreen((s) => s.state);

  if (disableGridLayout) {
    return (
      <SimpleGrid width="100%" padding="2" columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }} spacing={3}>
        {data.map((p, index) => (
          <Item_ data={p} number={index + 1} key={p.id + index} col={col} state={state} />
        ))}
      </SimpleGrid>
    );
  }
  return <BlogGridWithGridLayout_ data={data} state={state} />;
};

export const BlogGrid = memo(BlogGrid_);
