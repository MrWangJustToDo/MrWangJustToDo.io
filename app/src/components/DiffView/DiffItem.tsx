/* eslint-disable max-lines */
import { axiosClient } from "@blog/graphql";
import { Box, Skeleton, Text, useCallbackRef, useColorModeValue, useOutsideClick, useSafeLayoutEffect, useToast } from "@chakra-ui/react";
import { DiffFile } from "@git-diff-view/core";
import { DiffModeEnum, type DiffViewProps } from "@git-diff-view/react";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { useDiffLoadedItems } from "@app/hooks/useDiffLoadedItems";
import { useDiffOpenedItems } from "@app/hooks/useDiffOpenedItems";
import { DiffViewSize, useDiffViewConfig } from "@app/hooks/useDiffViewConfig";
import { useGitHubCompareScrollContainer } from "@app/hooks/useGitHubCompareScrollContainer";
import { useGitHubCompareSourceSelect, type GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";
import { base64ToString } from "@app/utils/text";

import { DiffItemContent } from "./DiffItemContent";
import { DiffItemHeader } from "./DiffItemHeader";

import type { MessageData } from "@app/worker/diffView.worker";
import type { RefObject } from "react";

const loadContent = async (url: string) => {
  const res = await axiosClient.get(url);
  return res?.data;
};

const fileMap = new Map<string, DiffFile>();

const resMap = new Map<string, { link: string; content: string }>();

const { toggle } = useDiffOpenedItems.getActions();

const { open: load } = useDiffLoadedItems.getActions();

export const DiffItem = ({
  item,
  index,
  workRef,
  stickyHeight,
  scrollToIndex,
  autoSetCurrentInView,
}: {
  index: number;
  item: GitHubCompareFileListType;
  workRef: RefObject<Worker>;
  stickyHeight: number;
  autoSetCurrentInView: () => void;
  scrollToIndex: (index: number) => void;
}) => {
  const [diffFile, setDiffFile] = useState<DiffFile>(() => fileMap.get(item.sha));

  const toast = useToast();

  const isOpen = useDiffOpenedItems.useShallowSelector((s) => s.keys[item.filename]);

  const _onToggle = useCallback(() => toggle(item.filename), [item.filename]);

  const { key, setKey } = useGitHubCompareSourceSelect();

  const autoLoad = useDiffViewConfig.useShallowStableSelector((s) => s.autoLoad);

  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState<string>(() => resMap.get(item.sha)?.content);

  const [link, setLink] = useState(() => resMap.get(item.sha)?.link);

  // const [done, setDone] = useState(false);

  const idRef = useRef<number>();

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

  const loadFullContentDiff = useCallbackRef(() => {
    if (item.patch && item.contents_url && !content) {
      loadContent(item.contents_url).then((res: { content: string; html_url: string; encoding: string }) => {
        let c = "";
        if (res.encoding === "base64") {
          c = base64ToString(res.content);
          setContent(c);
        } else {
          toast({ title: "Error", description: "Not support encoding", status: "error" });
        }
        setLink(res.html_url);
        resMap.set(item.sha, { link: res.html_url, content: c });
      });
    }
  });

  useEffect(() => {
    if (autoLoad && isOpen && !content && inView) {
      loadFullContentDiff();
    }
  }, [isOpen, content, inView, autoLoad, loadFullContentDiff]);

  useSafeLayoutEffect(() => {
    if (!isOpen) return;

    const id = Math.random();

    idRef.current = id;

    if (!item.patch) {
      setLoading(false);

      return;
    }

    if (diffFile && !content) {
      load(item.filename);

      setLoading(false);

      return;
    }

    if (diffFile && content && diffFile._newFileContent?.trim() === content?.trim()) {
      load(item.filename);

      setLoading(false);

      return;
    }

    const data: DiffViewProps<unknown>["data"] = {
      newFile: {
        fileName: item.filename,
        content: item.status !== "removed" ? content : "",
      },
      hunks: [`--- a \n+++ b \n` + (item.patch.endsWith("\n") ? item.patch : item.patch + "\n")],
    };

    setLoading(true);

    workRef.current.postMessage({ id, data, theme, engine: useDiffViewConfig.getReadonlyState().engine, uuid: item.sha + (content ? "f" : "c") });
  }, [item, workRef, content, theme, diffFile, isOpen]);

  useEffect(() => {
    const cb = (event: MessageEvent<MessageData>) => {
      if (event.data.id === idRef.current) {
        const d = DiffFile.createInstance(event.data.data, event.data.bundle);

        setDiffFile(d);

        fileMap.set(item.sha, d);

        setLoading(false);
      }
    };

    const i = workRef.current;

    i.addEventListener("message", cb);

    return () => i.removeEventListener("message", cb);
  }, [item.sha, workRef]);

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
            loadFullContentDiff={loadFullContentDiff}
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
          <Skeleton width="100%" isLoaded={!loading}>
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
