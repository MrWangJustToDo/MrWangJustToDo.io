import { axiosClient } from "@blog/graphql";
import {
  Box,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  Skeleton,
  Text,
  Tooltip,
  useCallbackRef,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
  usePrevious,
  useSafeLayoutEffect,
  useToast,
} from "@chakra-ui/react";
import { DiffFile } from "@git-diff-view/core";
import { DiffView } from "@git-diff-view/react";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { GoChevronDown, GoFold, GoLinkExternal, GoPulse, GoUnfold } from "react-icons/go";

import { DiffViewSize, useDiffViewConfig } from "@app/hooks/useDiffViewConfig";
import { useInComparePage } from "@app/hooks/useExample";
import { useGitHubCompareSourceSelect, type GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";
import { base64ToString } from "@app/utils/text";

import type { MessageData } from "@app/worker/diffView.worker";
import type { DiffViewProps } from "@git-diff-view/react";
import type { RefObject } from "react";

const loadContent = async (url: string) => {
  const res = await axiosClient.get(url);
  return res?.data;
};

export const DiffItem = ({
  item,
  workRef,
  stickyHeight,
  autoSetCurrentInView,
}: {
  item: GitHubCompareFileListType;
  workRef: RefObject<Worker>;
  stickyHeight: number;
  autoSetCurrentInView: () => void;
}) => {
  const [diffFile, setDiffFile] = useState<DiffFile>();

  const toast = useToast();

  const { isOpen, onToggle: _onToggle, onOpen: _onOpen } = useDisclosure({ defaultIsOpen: true });

  const { key, setKey } = useGitHubCompareSourceSelect();

  const autoLoad = useDiffViewConfig.useShallowStableSelector((s) => s.autoLoad);

  const [loading, setLoading] = useState(true);

  const [expandAll, setExpandAll] = useState(false);

  const previousExpand = usePrevious(expandAll);

  const [content, setContent] = useState<string>();

  const [link, setLink] = useState("");

  const inCompare = useInComparePage();

  // const [done, setDone] = useState(false);

  const idRef = useRef<number>();

  const ref = useRef<HTMLDivElement>();

  const boxRef = useRef<HTMLDivElement>();

  const containerRef = useRef<HTMLElement>();

  const theme = useColorModeValue("light", "dark");

  useSafeLayoutEffect(() => {
    containerRef.current = !inCompare ? document.querySelector("[data-id=diff-view-body]") : document.querySelector("#diff-view-body");
  }, [inCompare]);

  const inView = useInView(boxRef, { root: containerRef, amount: "some", margin: `-${stickyHeight}px 0px 0px 0px` });

  const { height } = useDomSize({ ref, deps: [diffFile] });

  const currentIsSelect = key === item.filename;

  const scrollToCurrent = useCallback(() => {
    const ele = boxRef.current;
    const a = new Promise<void>((r) => {
      if (ele) {
        containerRef.current.scrollTo({ top: ele.offsetTop - stickyHeight - 2 });
        r();
      } else {
        r();
      }
    });
    return a;
  }, [stickyHeight]);

  const onToggle = useCallback(() => {
    // setDone(false);
    scrollToCurrent().then(() => _onToggle());
  }, [_onToggle, scrollToCurrent]);

  const onOpen = useCallback(() => {
    // setDone(false);
    scrollToCurrent().then(() => _onOpen());
  }, [_onOpen, scrollToCurrent]);

  const onExpandToggle = useCallback(() => {
    scrollToCurrent().then(() => setExpandAll((l) => !l));
  }, [scrollToCurrent]);

  const loadFullContentDiff = useCallbackRef(() => {
    if (item.patch && item.contents_url && !content) {
      loadContent(item.contents_url).then((res: { content: string; html_url: string; encoding: string }) => {
        if (res.encoding === "base64") {
          setContent(base64ToString(res.content));
        } else {
          toast({ title: "Error", description: "Not support encoding", status: "error" });
        }
        setLink(res.html_url);
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

    const data: DiffViewProps<unknown>["data"] = {
      newFile: {
        fileName: item.filename,
        content: item.status !== "removed" ? content : "",
      },
      hunks: [`--- a \n+++ b \n` + (item.patch.endsWith("\n") ? item.patch : item.patch + "\n")],
    };

    setLoading(true);

    workRef.current.postMessage({ id, data, theme });
  }, [item, workRef, content, theme]);

  useEffect(() => {
    const cb = (event: MessageEvent<MessageData>) => {
      if (event.data.id === idRef.current) {
        setLoading(false);

        setDiffFile(DiffFile.createInstance(event.data.data, event.data.bundle));
      }
    };

    const i = workRef.current;

    i.addEventListener("message", cb);

    return () => i.removeEventListener("message", cb);
  }, [workRef]);

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

  useEffect(() => {
    if (previousExpand !== expandAll && diffFile) {
      if (expandAll) {
        diffFile.onAllExpand("split");
      } else {
        diffFile.onAllCollapse("split");
      }
    }
  }, [previousExpand, expandAll, diffFile]);

  useEffect(() => {
    autoSetCurrentInView();
  }, [inView, autoSetCurrentInView]);

  const { wrap, highlight, mode, size } = useDiffViewConfig();

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
          <Flex
            paddingX="4"
            paddingY="1"
            borderTopRadius="md"
            borderRadius={isOpen ? undefined : "md"}
            overflow="hidden"
            alignItems="center"
            border="1px"
            position="relative"
            zIndex="1"
            borderColor="cardBorderColor"
            backgroundColor="mobileCardBackgroundColor"
          >
            <ButtonGroup variant="ghost" marginRight="3" spacing="1">
              <IconButton
                aria-label="open"
                icon={
                  <Icon
                    as={GoChevronDown}
                    color="lightTextColor"
                    transformOrigin="center"
                    transition="transform 0.2s ease-in-out"
                    transform={isOpen ? "rotate(0deg)" : "rotate(-90deg)"}
                  />
                }
                fontSize="larger"
                size="sm"
                onClick={onToggle}
              />
              {item.patch ? (
                loading ? (
                  <IconButton
                    icon={<Icon as={AiOutlineLoading} color="lightTextColor" animation="1s linear 0s infinite loading" />}
                    aria-label="loading"
                    as="div"
                    size="sm"
                  />
                ) : (
                  <Tooltip label={!expandAll ? "Expand all diff" : "UnExpand all diff"}>
                    <IconButton
                      aria-label="expand"
                      icon={<Icon as={expandAll ? GoFold : GoUnfold} color="lightTextColor" />}
                      size="sm"
                      display={diffFile.hasSomeLineCollapsed ? "flex" : "none"}
                      onClick={onExpandToggle}
                    />
                  </Tooltip>
                )
              ) : null}
              {!autoLoad && !content && !loading && item.contents_url && (
                <Tooltip label="Load full diff">
                  <IconButton aria-label="load" icon={<Icon as={GoPulse} color="lightTextColor" />} size="sm" onClick={loadFullContentDiff} />
                </Tooltip>
              )}
              {link && (
                <Tooltip label="Goto github link">
                  <IconButton
                    aria-label="open"
                    icon={<Icon as={GoLinkExternal} color="lightTextColor" />}
                    size="sm"
                    onClick={() => window.open(link, "_blank")}
                  />
                </Tooltip>
              )}
            </ButtonGroup>
            <Text as="span" color="lightTextColor">
              {item.status === "renamed" ? `${item.previous_filename} -> ${item.filename}` : item.filename}
            </Text>
          </Flex>
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
              <DiffView
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
