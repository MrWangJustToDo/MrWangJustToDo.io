import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

import { useGitHubCompareSourceInView, useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";
import { useWindowSize } from "@app/hooks/useWindowSize";

import { Card } from "../Card";

import { DiffAsideFilter } from "./DiffAsideFilter";
import { DiffAsideTree } from "./DiffAsideTree";

import type { VirtuosoHandle } from "react-virtuoso";

export const DiffAside = () => {
  const list = useGitHubCompareSourceList((s) => s.flattenData);

  const id = useGitHubCompareSourceInView((s) => s.id);

  const treeRef = useRef<VirtuosoHandle>();

  const ref = useRef<HTMLDivElement>();

  const groupRef = useRef<HTMLDivElement>();

  const { height: groupHeight } = useDomSize({ ref: groupRef, delay: 20 });

  const { height: windowHeight } = useWindowSize();

  useEffect(() => {
    if (id) {
      const index = list.findIndex((i) => i.id === id);
      if (index !== -1) {
        treeRef.current?.scrollIntoView({ index: Number(index) });
      }
    }
  }, [id, list]);

  return (
    <Box position="sticky" top="0">
      <Box ref={groupRef} display="flow-root">
        <DiffAsideFilter marginY="2" />
      </Box>
      <Card boxShadow="none" backgroundColor="initial" padding="2" className="group" overflowX="auto">
        <Box ref={ref} sx={{ [`& [data-id="${id}"]`]: { backgroundColor: "blackAlpha.200" } }}>
          <DiffAsideTree ref={treeRef} width="full" height={groupHeight && windowHeight ? windowHeight - groupHeight - 50 : undefined} />
        </Box>
      </Card>
    </Box>
  );
};
