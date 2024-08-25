import { axiosClient } from "@blog/graphql";
import {
  Box,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  Skeleton,
  StatDownArrow,
  Text,
  useDisclosure,
  useOutsideClick,
  usePrevious,
  useSafeLayoutEffect,
  useToast,
} from "@chakra-ui/react";
import { DiffFile } from "@git-diff-view/core";
import { DiffView } from "@git-diff-view/react";
import { smoothScroll } from "@reactour/utils";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { PiArrowsInLineVerticalBold, PiArrowsOutLineVerticalBold, PiShareNetworkBold } from "react-icons/pi";

import { useGitHubCompareSourceSelect, type GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";

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
  autoSetCurrentInView,
}: {
  item: GitHubCompareFileListType;
  workRef: RefObject<Worker>;
  autoSetCurrentInView: () => void;
}) => {
  const [diffFile, setDiffFile] = useState<DiffFile>();

  const toast = useToast();

  const { isOpen, onToggle: _onToggle, onOpen: _onOpen } = useDisclosure({ defaultIsOpen: true });

  const { key, setKey } = useGitHubCompareSourceSelect();

  const [loading, setLoading] = useState(true);

  const [expandAll, setExpandAll] = useState(false);

  const previousExpand = usePrevious(expandAll);

  const [content, setContent] = useState<string>();

  const [link, setLink] = useState("");

  // const [done, setDone] = useState(false);

  const idRef = useRef<number>();

  const ref = useRef<HTMLDivElement>();

  const boxRef = useRef<HTMLDivElement>();

  const containerRef = useRef<HTMLDivElement>();

  useSafeLayoutEffect(() => {
    containerRef.current = document.querySelector("[data-id=diff-view-body]");
  }, []);

  const inView = useInView(boxRef, { root: containerRef, amount: "some" });

  const { height } = useDomSize({ ref, deps: [diffFile] });

  const currentIsSelect = key === item.filename;

  const scrollToCurrent = useCallback(() => {
    const ele = boxRef.current;
    const a = new Promise<void>((r) => {
      if (ele) {
        smoothScroll(ele, { behavior: "instant", block: "start" }).then(r);
      } else {
        r();
      }
    });
    return a;
  }, []);

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

  useEffect(() => {
    if (isOpen && !content && item.patch && inView) {
      loadContent(item.contents_url).then((res: { content: string; html_url: string; encoding: string }) => {
        if (res.encoding === "base64") {
          setContent(atob(res.content));
        } else {
          toast({ title: "Error", description: "Not support encoding", status: "error" });
        }
        setLink(res.html_url);
      });
    }
  }, [item.patch, item.contents_url, isOpen, content, toast, inView]);

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

    workRef.current.postMessage({ id, data });
  }, [item, workRef, content]);

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

  let Ele = null;

  if (item.patch && !diffFile) {
    Ele = <Skeleton height="50px" width="100%" />;
  } else {
    Ele = (
      <>
        <Box position="sticky" top="0" zIndex="sticky">
          <Flex
            paddingX="4"
            paddingY="1"
            backgroundColor="white"
            borderTopRadius="md"
            borderRadius={isOpen ? undefined : "md"}
            overflow="hidden"
            alignItems="center"
            border="1px"
            borderColor="gray.200"
          >
            <ButtonGroup variant="ghost" marginRight="3" spacing="1">
              <IconButton
                aria-label="open"
                icon={
                  <Icon
                    as={StatDownArrow}
                    color="gray.500"
                    transformOrigin="center"
                    transition="transform 0.2s ease-in-out"
                    transform={isOpen ? "rotate(0deg)" : "rotate(-90deg)"}
                  />
                }
                size="sm"
                onClick={onToggle}
              />
              {item.patch ? (
                loading ? (
                  <IconButton
                    icon={<Icon as={AiOutlineLoading} color="gray.500" animation="1s linear 0s infinite loading" />}
                    aria-label="loading"
                    as="div"
                    size="sm"
                  />
                ) : (
                  <IconButton
                    aria-label="expand"
                    icon={<Icon as={expandAll ? PiArrowsInLineVerticalBold : PiArrowsOutLineVerticalBold} color="gray.500" />}
                    size="sm"
                    display={diffFile.hasSomeLineCollapsed ? "flex" : "none"}
                    onClick={onExpandToggle}
                  />
                )
              ) : null}
              {link && (
                <IconButton aria-label="open" icon={<Icon as={PiShareNetworkBold} color="gray.500" />} size="sm" onClick={() => window.open(link, "_blank")} />
              )}
            </ButtonGroup>
            <Text as="span" color="gray.500">
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
          borderColor="gray.200"
          overflow="hidden"
          // onTransitionEndCapture={() => setDone(true)}
        >
          <div ref={ref} data-height={height}>
            {diffFile ? (
              <DiffView diffFile={diffFile} diffViewHighlight diffViewWrap diffViewFontSize={12} />
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
      borderRadius="md"
      boxShadow={key === item.filename ? "0 0 2px rgba(60, 200, 255, 1)" : undefined}
    >
      {Ele}
    </Box>
  );
};
