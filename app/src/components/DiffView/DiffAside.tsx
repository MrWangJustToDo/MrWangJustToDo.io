/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, useUpdateEffect } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

import { useDebounceCallbackRef } from "@app/hooks/useDebounceCallbackRef";
import { useDiffLayoutSize } from "@app/hooks/useDiffLayoutSize";
import { useGitHubCompareSourceInView, useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";
import { useDomSize, useStaticDomSize } from "@app/hooks/useSize";
import { useWindowSize } from "@app/hooks/useWindowSize";

import { Card } from "../Card";

import { DiffAsideFilter } from "./DiffAsideFilter";
import { DiffAsideTree } from "./DiffAsideTree";

import type { VirtuosoHandle } from "react-virtuoso";

export const DiffAside = () => {
  const list = useGitHubCompareSourceList((s) => s.flattenData);

  const id = useGitHubCompareSourceInView((s) => s.id);

  const data = useDiffLayoutSize((s) => s.data);

  const maxWidthRef = useRef(0);

  const treeRef = useRef<VirtuosoHandle>();

  const ref = useRef<HTMLDivElement>();

  const groupRef = useRef<HTMLDivElement>();

  const { width } = useStaticDomSize({ ref, deps: [data] });

  const { height: groupHeight } = useDomSize({ ref: groupRef, delay: 20 });

  const { height: windowHeight } = useWindowSize();

  const onScroll = useDebounceCallbackRef(() => {
    const eleList = ref.current?.querySelectorAll("[data-aside-item]");

    const maxWidth = eleList ? Math.max(...Array.from(eleList).map((ele) => Math.max(ele.clientWidth, ele.scrollWidth))) : 0;

    if (maxWidth <= width) {
      return;
    }

    if (maxWidthRef.current < maxWidth) {
      maxWidthRef.current = maxWidth;

      ref.current.style.width = `${maxWidth}px`;
    }
  });

  useEffect(() => {
    if (id) {
      const index = list.findIndex((i) => i.id === id);
      if (index !== -1) {
        treeRef.current?.scrollIntoView({ index: Number(index) });
      }
    }
  }, [id, list]);

  useUpdateEffect(() => {
    maxWidthRef.current = 0;

    const id = setTimeout(() => {
      onScroll();
    }, 200);

    return () => clearTimeout(id);
  }, [width, onScroll]);

  return (
    <Box position="sticky" top="0">
      <Box ref={groupRef} display="flow-root">
        <DiffAsideFilter marginY="2" />
      </Box>
      <Card boxShadow="none" padding="2" className="group" overflowX="auto">
        <Box ref={ref} data-width={width} sx={{ [`& [data-id="${id}"]`]: { backgroundColor: "blackAlpha.200" } }}>
          <DiffAsideTree
            ref={treeRef}
            containerWidth={width}
            onScroll={onScroll}
            width="full"
            height={groupHeight && windowHeight ? windowHeight - groupHeight - 50 : undefined}
          />
        </Box>
      </Card>
    </Box>
  );
};
