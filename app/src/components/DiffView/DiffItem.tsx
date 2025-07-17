/* eslint-disable max-lines */
import { Box, Skeleton, Text, useColorModeValue, useOutsideClick } from "@chakra-ui/react";
import { DiffModeEnum } from "@git-diff-view/react";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

import { useDiffOpenedItems } from "@app/hooks/useDiffOpenedItems";
import { DiffViewSize, useDiffViewConfig } from "@app/hooks/useDiffViewConfig";
import { useDiffViewDiffFile } from "@app/hooks/useDiffViewDiffFile";
import { useGitHubCompareScrollContainer } from "@app/hooks/useGitHubCompareScrollContainer";
import { useGitHubCompareSourceSelect, type GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";

import { DiffItemContent } from "./DiffItemContent";
import { DiffItemHeader } from "./DiffItemHeader";

import type { DiffFile } from "@git-diff-view/core";
import type { RefObject } from "react";

const { toggle } = useDiffOpenedItems.getActions();

export const DiffItem = ({
  item,
  index,
  stickyHeight,
  scrollToIndex,
  autoSetCurrentInView,
}: {
  index: number;
  item: GitHubCompareFileListType;
  stickyHeight: number;
  autoSetCurrentInView: () => void;
  scrollToIndex: (index: number) => void;
}) => {
  const { diffMode, fullDiffFile, fullLoading, pureDiffFile, pureLoading, content, link, loadDiff } = useDiffViewDiffFile((s) => ({
    fullLoading: s.state[item.sha]?.fullLoading,
    fullDiffFile: s.state[item.sha]?.fullDiffFile,
    pureLoading: s.state[item.sha]?.pureLoading,
    pureDiffFile: s.state[item.sha]?.pureDiffFile,
    content: s.state[item.sha]?.content,
    link: s.state[item.sha]?.link,
    diffMode: s.state[item.sha]?.mode,
    loadDiff: s.loadDiff,
  }));

  const diffFile = ((diffMode === "full" ? fullDiffFile : pureDiffFile) || pureDiffFile) as DiffFile;

  const loading = diffMode === "full" ? fullLoading : pureLoading;

  const isOpen = useDiffOpenedItems.useShallowSelector((s) => s.keys[item.filename]);

  const _onToggle = useCallback(() => toggle(item.filename), [item.filename]);

  const { key, setKey } = useGitHubCompareSourceSelect();

  const autoLoad = useDiffViewConfig.useShallowStableSelector((s) => s.autoLoad);

  const ref = useRef<HTMLDivElement>();

  const boxRef = useRef<HTMLDivElement>();

  const containerRef = useGitHubCompareScrollContainer((s) => s.eleRef) as RefObject<HTMLElement>;

  const theme = useColorModeValue("light", "dark");

  const inView = useInView(boxRef, { root: containerRef, amount: "some", margin: `-${stickyHeight}px 0px 0px 0px` });

  const { height } = useDomSize({ ref, deps: [diffFile] });

  const scrollToCurrent = useCallback(() => {
    const ele = boxRef.current;

    const a = new Promise<void>((r) => {
      if (ele) {
        scrollToIndex(index);
        r();
      } else {
        r();
      }
    });
    return a;
  }, [index, scrollToIndex]);

  useEffect(() => {
    if (autoLoad && isOpen && !content && inView) {
      loadDiff(item.sha, "full", theme);
    }
  }, [isOpen, content, inView, autoLoad, item.sha, theme, loadDiff]);

  useOutsideClick({
    ref: boxRef,
    handler: () => {
      if (key === item.filename) {
        setKey("");
      }
    },
  });

  const { wrap, highlight, mode, size } = useDiffViewConfig();

  useEffect(() => {
    autoSetCurrentInView();
  }, [inView, autoSetCurrentInView]);

  const diffSize = size === DiffViewSize.Small ? 11.5 : size === DiffViewSize.Medium ? 13 : 15;

  return (
    <Box display="flow-root">
      <Box
        ref={boxRef}
        data-file={item.filename}
        data-in-view={inView}
        margin="2px"
        position="relative"
        borderRadius="md"
        _after={{
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: "sticky",
          pointerEvents: "none",
          borderRadius: "md",
          boxShadow: key === item.filename ? "0 0 3px rgb(70, 240, 240)" : undefined,
        }}
      >
        <Box
          position="sticky"
          top={"var(--sticky-top)"}
          zIndex="sticky"
          _before={{
            position: "absolute",
            width: "100%",
            height: "100%",
            content: '""',
            top: 0,
            left: 0,
            pointerEvents: "none",
            backgroundColor: "mobileCardBackgroundColor",
          }}
        >
          <DiffItemHeader
            isOpen={isOpen}
            item={item}
            diffFile={diffFile}
            loading={loading}
            autoLoad={autoLoad}
            content={content}
            link={link}
            _onToggle={_onToggle}
            loadFullContentDiff={() => loadDiff(item.sha, "full", theme)}
            scrollToCurrent={scrollToCurrent}
          />
        </Box>
        <Box
          height={isOpen ? `auto` : "0px"}
          visibility={isOpen ? "visible" : "hidden"}
          // transition="all 0.2s ease-in-out"
          borderBottomRadius="md"
          marginTop="-1px"
          border="1px"
          borderTop="none"
          borderColor="cardBorderColor"
          overflow="hidden"
          // onTransitionEndCapture={() => setDone(true)}
        >
          <Skeleton width="100%" isLoaded={!pureLoading}>
            <div ref={ref} data-height={height}>
              {diffFile ? (
                <DiffItemContent
                  diffFile={diffFile}
                  diffViewHighlight={highlight}
                  diffViewTheme={theme}
                  diffViewWrap={wrap}
                  diffViewMode={mode}
                  boxRef={boxRef}
                  diffViewFontSize={diffSize}
                />
              ) : (
                <Text textAlign="center" padding="2">
                  Empty
                </Text>
              )}
            </div>
          </Skeleton>
        </Box>
        <Box data-scroll-target position="sticky" bottom="0" marginTop="-6px" zIndex="sticky" display="flex" height="6px" width="full">
          {mode & DiffModeEnum.Split ? (
            <>
              <Box data-left position="relative" width="50%" />
              <Box data-right position="relative" width="50%" />
            </>
          ) : (
            <div data-full />
          )}
        </Box>
      </Box>
      <Box height="1em" />
    </Box>
  );
};
