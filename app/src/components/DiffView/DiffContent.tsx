/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Flex, HStack, useCallbackRef } from "@chakra-ui/react";
import { debounce } from "lodash";
import { memo, useEffect, useMemo, useRef } from "react";
import { Virtuoso } from "react-virtuoso";

import { useDiffLoadedItems } from "@app/hooks/useDiffLoadedItems";
import { useDiffOpenedItems } from "@app/hooks/useDiffOpenedItems";
import { useAutoLoadDiffFile } from "@app/hooks/useDiffViewDiffFile";
import { useGitHubCompareScrollContainer } from "@app/hooks/useGitHubCompareScrollContainer";
import {
  useGitHubCompareSourceInView,
  useGitHubCompareSourceList,
  useGitHubCompareSourceSelect,
  useGitHubCompareTreeSelect,
} from "@app/hooks/useGitHubCompareSource";
import { useKeywordHighlight } from "@app/hooks/useKeywordHighlight";
import { useDomSize } from "@app/hooks/useSize";

import { DiffAsideCompose } from "./DiffAsideCompose";
import { DiffFileCount } from "./DiffFileCount";
import { DiffItem } from "./DiffItem";
import { DiffViewSearch } from "./DiffViewSearch";
import { DiffViewSetting } from "./DiffViewSetting";

import type { GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import type { VirtuosoHandle } from "react-virtuoso";

const { setId } = useGitHubCompareSourceInView.getActions();

const { openAll, open } = useDiffOpenedItems.getActions();

const setSelectKey = useGitHubCompareSourceSelect.getActions().setKey;

const _DiffContent = memo(() => {
  const list = useGitHubCompareSourceList((s) => s.list);

  const virtuosoRef = useRef<VirtuosoHandle>();

  const ref = useRef<HTMLDivElement>();

  const listRef = useRef<HTMLDivElement>();

  const { height } = useDomSize({ ref });

  const autoSetCurrent = useCallbackRef(() => {
    const allElement = list.map((i) => ({ item: i, node: document.querySelector(`[data-file="${i.filename}"]`) }));
    const allInViewElement = allElement.filter((i) => i.node?.getAttribute("data-in-view") === "true");
    //  最近接近上边缘的元素作为当前选中
    let minTop = Infinity;
    let item: GitHubCompareFileListType | null = null;
    allInViewElement.forEach((i) => {
      const { top } = i.node?.getBoundingClientRect() || {};
      if (top < minTop) {
        minTop = top;
        item = i.item;
      }
    });
    if (item) {
      if (item.filename !== useGitHubCompareSourceInView.getReadonlyState().id) {
        setId(item.filename);
      }
    } else {
      setId("");
    }
  });

  const autoSetCurrentInView = useMemo(() => debounce(autoSetCurrent, 60), [autoSetCurrent]);

  const ele = useGitHubCompareScrollContainer((s) => s.ele);

  useAutoLoadDiffFile();

  useKeywordHighlight(listRef);

  const scrollToIndex = useCallbackRef((index: number) => virtuosoRef.current?.scrollToIndex({ index, align: "start", offset: -height }));

  useEffect(() => {
    const unSubscribe = useGitHubCompareTreeSelect.subscribe(
      (s) => s.key,
      () => {
        const key = useGitHubCompareTreeSelect.getReadonlyState().key;

        const index = list.findIndex((i) => i.filename === key);

        if (index !== -1) {
          const currentLoadedKeys = useDiffLoadedItems.getReadonlyState().keys;

          openAll({ ...currentLoadedKeys });

          scrollToIndex(index);

          open(key);

          setSelectKey(key);
        }
      },
    );

    return unSubscribe;
  }, [list, scrollToIndex]);

  return (
    <>
      <Flex
        position="sticky"
        top="0"
        justifyContent="space-between"
        ref={ref}
        paddingY="2"
        paddingX="2px"
        alignItems="center"
        zIndex="banner"
        backgroundColor="mobileCardBackgroundColor"
      >
        <HStack spacing="2" flexGrow={1}>
          <DiffAsideCompose />
          <DiffFileCount />
          <small>(virtual scroll support)</small>
        </HStack>
        <DiffViewSearch />
        <DiffViewSetting />
      </Flex>
      {/* @ts-ignore */}
      <Box style={{ ["--sticky-top"]: `${height}px` }} ref={listRef}>
        <Virtuoso
          totalCount={list.length}
          useWindowScroll
          ref={virtuosoRef}
          increaseViewportBy={2000}
          customScrollParent={ele as HTMLElement}
          itemContent={(index) => {
            const item = list[index];
            return (
              <DiffItem
                key={item.filename}
                item={item}
                index={index}
                stickyHeight={height}
                scrollToIndex={scrollToIndex}
                autoSetCurrentInView={autoSetCurrentInView}
              />
            );
          }}
        />
      </Box>
    </>
  );
});

_DiffContent.displayName = "_DiffContent";

export const DiffContent = _DiffContent;
