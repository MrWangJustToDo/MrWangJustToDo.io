import { axiosClient } from "@blog/graphql";
import { Box, ButtonGroup, Flex, Icon, IconButton, Skeleton, StatDownArrow, Text, useDisclosure, useOutsideClick, usePrevious } from "@chakra-ui/react";
import { DiffFile } from "@git-diff-view/core";
import { smoothScroll } from "@reactour/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { PiArrowsInLineVerticalBold, PiArrowsOutLineVerticalBold } from "react-icons/pi";

import { useGitHubCompareSourceSelect, type GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";

import type { MessageData } from "@app/worker/diffView.worker";
import type { DiffView, DiffViewProps } from "@git-diff-view/react";
import type { RefObject } from "react";

const loadContent = async (url: string) => {
  const res = await axiosClient.get(url);
  return res?.data?.content;
};

export const DiffItem = ({ item, workRef }: { item: GitHubCompareFileListType; workRef: RefObject<Worker> }) => {
  const [diffFile, setDiffFile] = useState<DiffFile>();

  const { isOpen, onToggle: _onToggle, onOpen: _onOpen } = useDisclosure({ defaultIsOpen: true });

  const { key, setKey } = useGitHubCompareSourceSelect();

  const [loading, setLoading] = useState(true);

  const [expandAll, setExpandAll] = useState(false);

  const previousExpand = usePrevious(expandAll);

  const [content, setContent] = useState<string>();

  // const [done, setDone] = useState(false);

  const idRef = useRef<number>();

  const ref = useRef<HTMLDivElement>();

  const boxRef = useRef<HTMLDivElement>();

  const [Ele, setEle] = useState<typeof DiffView>();

  const { height } = useDomSize({ ref, deps: [diffFile] });

  const currentIsSelect = key === item.filename;

  const scrollToCurrent = useCallback(() => {
    const ele = boxRef.current;
    ele && smoothScroll(boxRef.current, { behavior: "smooth" });
  }, []);

  const onToggle = useCallback(() => {
    // setDone(false);
    _onToggle();
    scrollToCurrent();
  }, [_onToggle, scrollToCurrent]);

  const onOpen = useCallback(() => {
    // setDone(false);
    _onOpen();
    scrollToCurrent();
  }, [_onOpen, scrollToCurrent]);

  useEffect(() => {
    // TODO! fix this import error
    const load = async () => {
      const { DiffView } = await import("@git-diff-view/react");
      setEle(DiffView);
    };
    load();
  }, []);

  useEffect(() => {
    if (isOpen && !content && item.patch) {
      loadContent(item.contents_url).then((res: string) => setContent(atob(res)));
    }
  }, [item, isOpen, content]);

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
        content: content,
      },
      hunks: [`--- a \n+++ b \n` + (item.patch.endsWith("\n") ? item.patch : item.patch + "\n")],
    };

    workRef.current.postMessage({ id, data });
  }, [item, workRef, content]);

  useEffect(() => {
    const cb = (event: MessageEvent<MessageData>) => {
      if (event.data.id === idRef.current) {
        setDiffFile(DiffFile.createInstance(event.data.data, event.data.bundle));
        if (event.data.data.newFile.content) {
          setLoading(false);
        }
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

  if (item.patch && (!diffFile || !Ele)) {
    return <Skeleton height="50px" width="100%" />;
  }

  return (
    <Box ref={boxRef} data-file={item.filename} margin="2px" borderRadius="md" boxShadow={key === item.filename ? "0 0 2px rgba(60, 200, 255, 1)" : undefined}>
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
                  onClick={() => setExpandAll((l) => !l)}
                />
              )
            ) : null}
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
            <Ele diffFile={diffFile} diffViewHighlight diffViewWrap diffViewFontSize={12} />
          ) : (
            <Text textAlign="center" padding="2">
              Empty
            </Text>
          )}
        </div>
      </Box>
    </Box>
  );
};
