/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Flex, HStack, useCallbackRef } from "@chakra-ui/react";
import { debounce } from "lodash";
import { memo, useLayoutEffect, useMemo, useRef } from "react";

import { HighlightEngine, useDiffViewConfig } from "@app/hooks/useDiffViewConfig";
import { useGitHubCompareSourceInView, useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";

import { DiffAsideCompose } from "./DiffAsideCompose";
import { DiffFileCount } from "./DiffFileCount";
import { DiffItem } from "./DiffItem";
import { DiffViewSetting } from "./DIffViewSetting";

import type { GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";

const { setId } = useGitHubCompareSourceInView.getActions();

const _DiffContent = memo(() => {
  const list = useGitHubCompareSourceList((s) => s.list);

  const workRef = useRef<Worker>();

  const ref = useRef<HTMLDivElement>();

  const { height } = useDomSize({ ref });

  useLayoutEffect(() => {
    const engine = useDiffViewConfig.getReadonlyState().engine

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
        </HStack>
        <DiffViewSetting />
      </Flex>
      {/* @ts-ignore */}
      <Flex display="flex" flexDirection="column" rowGap="4" style={{ ["--sticky-top"]: `${height}px` }}>
        {list.map((item) => (
          <DiffItem key={item.filename} item={item} workRef={workRef} autoSetCurrentInView={autoSetCurrentInView} stickyHeight={height} />
        ))}
      </Flex>
    </>
  );
});

_DiffContent.displayName = "_DiffContent";

export const DiffContent = _DiffContent;
