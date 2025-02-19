/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Flex, HStack, useCallbackRef } from "@chakra-ui/react";
import { debounce } from "lodash";
import { memo, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Virtuoso } from "react-virtuoso";

import { useDiffLoadedItems } from "@app/hooks/useDiffLoadedItems";
import { useDiffOpenedItems } from "@app/hooks/useDiffOpenedItems";
import { HighlightEngine, useDiffViewConfig } from "@app/hooks/useDiffViewConfig";
import { useGitHubCompareScrollContainer } from "@app/hooks/useGitHubCompareScrollContainer";
import {
  useGitHubCompareSourceInView,
  useGitHubCompareSourceList,
  useGitHubCompareSourceSelect,
  useGitHubCompareTreeSelect,
} from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";

import { DiffAsideCompose } from "./DiffAsideCompose";
import { DiffFileCount } from "./DiffFileCount";
import { DiffItem } from "./DiffItem";
import { DiffViewSetting } from "./DIffViewSetting";

import type { GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import type { VirtuosoHandle } from "react-virtuoso";

const { setId } = useGitHubCompareSourceInView.getActions();

const { openAll } = useDiffOpenedItems.getActions();

const setSelectKey = useGitHubCompareSourceSelect.getActions().setKey;

const _DiffContent = memo(() => {
  const list = useGitHubCompareSourceList((s) => s.list);

  const workRef = useRef<Worker>();

  const virtuosoRef = useRef<VirtuosoHandle>();

  const ref = useRef<HTMLDivElement>();

  const { height } = useDomSize({ ref });

  useLayoutEffect(() => {
    const engine = useDiffViewConfig.getReadonlyState().engine;

    if (engine === HighlightEngine.shiki) {
      workRef.current = new Worker(new URL("@app/worker/diffView.shiki.worker", import.meta.url));
    } else {
      workRef.current = new Worker(new URL("@app/worker/diffView.default.worker", import.meta.url));
    }

    return () => workRef.current.terminate();
  }, []);

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

  useEffect(() => {
    const unSubscribe = useGitHubCompareTreeSelect.subscribe(
      (s) => s.key,
      () => {
        const key = useGitHubCompareTreeSelect.getReadonlyState().key;

        const index = list.findIndex((i) => i.filename === key);

        if (index !== -1) {
          const currentLoadedKeys = useDiffLoadedItems.getReadonlyState().keys;

          openAll({ ...currentLoadedKeys });

          virtuosoRef.current?.scrollToIndex({ index, align: "start" });

          setSelectKey(key);
        }
      },
    );

    return unSubscribe;
  }, [list]);

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
        <HStack spacing="2">
          <DiffAsideCompose />
          <DiffFileCount />
          <small>(virtual scroll support)</small>
        </HStack>
        <DiffViewSetting />
      </Flex>
      {/* @ts-ignore */}
      <Flex display="flex" flexDirection="column" rowGap="4" style={{ ["--sticky-top"]: `${height}px` }}>
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
                workRef={workRef}
                virtualRef={virtuosoRef}
                autoSetCurrentInView={autoSetCurrentInView}
                stickyHeight={height}
              />
            );
          }}
        />
      </Flex>
    </>
  );
});

_DiffContent.displayName = "_DiffContent";

export const DiffContent = _DiffContent;
