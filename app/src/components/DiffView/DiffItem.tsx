/* eslint-disable max-lines */
import { axiosClient } from "@blog/graphql";
import { Box, Skeleton, Text, useCallbackRef, useColorModeValue, useDisclosure, useOutsideClick, useToast } from "@chakra-ui/react";
import { DiffFile } from "@git-diff-view/core";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { DiffViewSize, useDiffViewConfig } from "@app/hooks/useDiffViewConfig";
import { useGitHubCompareScrollContainer } from "@app/hooks/useGitHubCompareScrollContainer";
import { useGitHubCompareSourceSelect, type GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";
import { base64ToString } from "@app/utils/text";

import { DiffItemContent } from "./DiffItemContent";
import { DiffItemHeader } from "./DiffItemHeader";

import type { MessageData } from "@app/worker/diffView.worker";
import type { DiffViewProps } from "@git-diff-view/react";
import type { RefObject } from "react";
import type { VirtuosoHandle } from "react-virtuoso";

const loadContent = async (url: string) => {
  const res = await axiosClient.get(url);
  return res?.data;
};

const fileMap = new Map<string, DiffFile>();

const resMap = new Map<string, { link: string; content: string }>();

export const DiffItem = ({
  item,
  index,
  workRef,
  virtualRef,
  stickyHeight,
  autoSetCurrentInView,
}: {
  index: number;
  item: GitHubCompareFileListType;
  workRef: RefObject<Worker>;
  virtualRef: RefObject<VirtuosoHandle>;
  stickyHeight: number;
  autoSetCurrentInView: () => void;
}) => {
  const [diffFile, setDiffFile] = useState<DiffFile>(() => fileMap.get(item.sha));

  const toast = useToast();

  const { isOpen, onToggle: _onToggle, onOpen: _onOpen } = useDisclosure({ defaultIsOpen: true });

  const { key, setKey } = useGitHubCompareSourceSelect();

  const autoLoad = useDiffViewConfig.useShallowStableSelector((s) => s.autoLoad);

  const [loading, setLoading] = useState(true);

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

  const currentIsSelect = key === item.filename;

  const scrollToCurrent = useCallback(() => {
    const ele = boxRef.current;

    const a = new Promise<void>((r) => {
      if (ele) {
        virtualRef.current?.scrollToIndex({ index, offset: -stickyHeight });
        r();
      } else {
        r();
      }
    });
    return a;
  }, [index, stickyHeight, virtualRef]);

  const onOpen = useCallback(() => {
    // setDone(false);
    scrollToCurrent().then(() => _onOpen());
  }, [_onOpen, scrollToCurrent]);

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

  useEffect(() => {
    const id = Math.random();

    idRef.current = id;

    if (!item.patch) {
      setLoading(false);

      return;
    }

    if (diffFile && !content) {
      setLoading(false);

      return;
    }

    if (diffFile && content && diffFile._newFileContent?.trim() === content?.trim()) {
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
  }, [item, workRef, content, theme, diffFile]);

  useEffect(() => {
    const cb = (event: MessageEvent<MessageData>) => {
      if (event.data.id === idRef.current) {
        setLoading(false);

        const d = DiffFile.createInstance(event.data.data, event.data.bundle);

        setDiffFile(d);

        fileMap.set(item.sha, d);
      }
    };

    const i = workRef.current;

    i.addEventListener("message", cb);

    return () => i.removeEventListener("message", cb);
  }, [item.sha, workRef]);

  useEffect(() => {
    if (currentIsSelect) {
      onOpen();
    }
  }, [currentIsSelect, onOpen]);

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

  let Ele = null;

  if (item.patch && !diffFile) {
    Ele = <Skeleton height="50px" width="100%" />;
  } else {
    Ele = (
      <>
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
            key={diffFile?.getId()}
            diffFile={diffFile}
            loading={loading}
            autoLoad={autoLoad}
            content={content}
            link={link}
            _onToggle={_onToggle}
            _onOpen={_onOpen}
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
          <div ref={ref} data-height={height}>
            {diffFile ? (
              <DiffItemContent
                diffFile={diffFile}
                diffViewHighlight={highlight}
                diffViewTheme={theme}
                diffViewWrap={wrap}
                diffViewMode={mode}
                diffViewFontSize={diffSize}
              />
            ) : (
              <Text textAlign="center" padding="2">
                Empty
              </Text>
            )}
          </div>
        </Box>
      </>
    );
  }

  return (
    <Box
      ref={boxRef}
      data-file={item.filename}
      data-in-view={inView}
      margin="2px"
      marginBottom="1em"
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
        boxShadow: key === item.filename ? "0 0 2px rgba(60, 200, 255, 1)" : undefined,
      }}
    >
      {Ele}
    </Box>
  );
};
