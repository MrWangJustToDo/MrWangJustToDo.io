import { Badge, Box, Icon, IconButton, List, ListItem, Skeleton, StatDownArrow, Text, useDisclosure } from "@chakra-ui/react";
import { DiffFile } from "@git-diff-view/core";
import { useEffect, useRef, useState } from "react";

import { useStaticDomSize } from "@app/hooks/useSize";

import type { GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import type { MessageData } from "@app/worker/diffView.worker";
import type { DiffView, DiffViewProps } from "@git-diff-view/react";
import type { RefObject } from "react";

export const DiffItem = ({ item, workRef }: { item: GitHubCompareFileListType; workRef: RefObject<Worker> }) => {
  const [diffFile, setDiffFile] = useState<DiffFile>();

  const { isOpen, onToggle: _onToggle } = useDisclosure({ defaultIsOpen: true });

  // const [content, setContent] = useState();

  const [done, setDone] = useState(false);

  const idRef = useRef<number>();

  const ref = useRef<HTMLDivElement>();

  const [Ele, setEle] = useState<typeof DiffView>();

  const { height } = useStaticDomSize({ ref, deps: [diffFile] });

  const onToggle = () => {
    setDone(false);
    _onToggle();
  };

  useEffect(() => {
    const load = async () => {
      const { DiffView } = await import("@git-diff-view/react");
      setEle(DiffView);
    };
    load();
  }, []);

  useEffect(() => {
    const id = Math.random();

    idRef.current = id;

    if (!item.patch) return;

    const data: DiffViewProps<unknown>["data"] = {
      newFile: {
        fileName: item.filename,
      },
      hunks: [`--- a \n+++ b \n` + (item.patch.endsWith("\n") ? item.patch : item.patch + "\n")],
    };

    workRef.current.postMessage({ id, data });
  }, [item, workRef]);

  useEffect(() => {
    const cb = (event: MessageEvent<MessageData>) => {
      if (event.data.id === idRef.current) {
        setDiffFile(DiffFile.createInstance(event.data.data, event.data.bundle));
      }
    };

    const i = workRef.current;

    i.addEventListener("message", cb);

    return () => i.removeEventListener("message", cb);
  }, [workRef]);

  if (item.status === "renamed") {
    return (
      <div data-file={item.filename} id={item.filename}>
        <Box position="sticky" top="0" zIndex="sticky">
          <Text
            paddingX="4"
            paddingY="2"
            backgroundColor="white"
            borderTopRadius="md"
            borderRadius={isOpen || !done ? undefined : "md"}
            overflow="hidden"
            border="1px"
            borderColor="gray.200"
          >
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
              variant="ghost"
              marginRight="2"
              onClick={onToggle}
            />
            <Text as="span" color="gray.500">
              {item.filename}
            </Text>
          </Text>
        </Box>
        <Box
          ref={ref}
          height={isOpen ? `${height ? height + "px" : "auto"}` : "0px"}
          visibility={isOpen ? "visible" : "hidden"}
          data-height={height}
          transition="all 0.2s ease-in-out"
          borderBottomRadius="md"
          border="1px"
          borderTop="none"
          borderColor="gray.200"
          overflow="hidden"
          onTransitionEndCapture={() => setDone(true)}
        >
          <Badge>Renamed</Badge>
          <List>
            <ListItem>{item.previous_filename}</ListItem>
            <ListItem>{item.filename}</ListItem>
          </List>
        </Box>
      </div>
    );
  }

  if (!diffFile || !Ele) {
    return <Skeleton height="50px" width="100%" />;
  }

  return (
    <div data-file={item.filename} id={item.filename}>
      <Box position="sticky" top="0" zIndex="sticky">
        <Text
          paddingX="4"
          paddingY="2"
          backgroundColor="white"
          borderTopRadius="md"
          borderRadius={isOpen || !done ? undefined : "md"}
          overflow="hidden"
          border="1px"
          borderColor="gray.200"
        >
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
            variant="ghost"
            marginRight="2"
            onClick={onToggle}
          />
          <Text as="span" color="gray.500">
            {item.filename}
          </Text>
        </Text>
      </Box>
      <Box
        ref={ref}
        height={isOpen ? `${height ? height + "px" : "auto"}` : "0px"}
        visibility={isOpen ? "visible" : "hidden"}
        data-height={height}
        transition="all 0.2s ease-in-out"
        borderBottomRadius="md"
        border="1px"
        borderTop="none"
        borderColor="gray.200"
        overflow="hidden"
        onTransitionEndCapture={() => setDone(true)}
      >
        <Ele diffFile={diffFile} diffViewHighlight diffViewWrap diffViewFontSize={12} />
      </Box>
    </div>
  );
};
