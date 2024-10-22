/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, IconButton, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { smoothScroll } from "@reactour/utils";
import { useEffect, useRef } from "react";
import { GoSearch } from "react-icons/go";

import {
  useGitHubCompareSourceInView,
  useGitHubCompareSourceList,
  useGitHubCompareSourceSelect,
  useGitHubCompareTreeSelect,
} from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";
import { useWindowSize } from "@app/hooks/useWindowSize";

import { Card } from "../Card";

import { DiffAsideTree } from "./DiffAsideTree";

import type { VirtuosoHandle } from "react-virtuoso";

const setSelectKey = useGitHubCompareSourceSelect.getActions().setKey;

export const DiffAside = () => {
  const list = useGitHubCompareSourceList((s) => s.flattenData);

  const id = useGitHubCompareSourceInView((s) => s.id);

  const key = useGitHubCompareTreeSelect((s) => s.key);

  const treeRef = useRef<VirtuosoHandle>();

  const ref = useRef<HTMLDivElement>();

  const groupRef = useRef<HTMLDivElement>();

  const { width } = useDomSize({ ref, delay: 16 });

  const { height: groupHeight } = useDomSize({ ref: groupRef, delay: 16 });

  const { height: windowHeight } = useWindowSize();

  useEffect(() => {
    if (key) {
      const ele = document.querySelector(`[data-file="${key}"]`) as HTMLElement;
      ele && smoothScroll(ele, { behavior: "instant", block: "start" });
      ele && setSelectKey(key);
    }
  }, [key]);

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
      <InputGroup ref={groupRef}>
        <Input placeholder="Search" marginY="2" disabled />
        <InputRightAddon as={IconButton} marginY="2" color="lightTextColor" fontSize="xl" variant="ghost" aria-label="Search" icon={<GoSearch />} />
      </InputGroup>
      <Card boxShadow="none" padding="2" className="group" overflow="hidden">
        <Box
          ref={ref}
          data-width={width}
          sx={{ [`& [data-id="${id}"]`]: { backgroundColor: "blackAlpha.200" } }}
          // @ts-ignore
          style={{ ["--tree-container-width"]: `${width}px` }}
        >
          <DiffAsideTree ref={treeRef} width={width || undefined} height={groupHeight && windowHeight ? windowHeight - groupHeight - 50 : undefined} />
        </Box>
      </Card>
    </Box>
  );
};
