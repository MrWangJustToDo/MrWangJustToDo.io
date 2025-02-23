/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Flex, Icon, SkeletonText, Text, Tooltip, type BoxProps } from "@chakra-ui/react";
import { Children, forwardRef, memo, useRef, type ReactNode } from "react";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa";
import { VscDiffAdded, VscDiffModified, VscDiffRemoved, VscDiffRenamed } from "react-icons/vsc";
import { Virtuoso } from "react-virtuoso";
import { toRaw } from "reactivity-store";

import { useGitHubCompareSourceList, useGitHubCompareTreeSelect } from "@app/hooks/useGitHubCompareSource";
import { useStaticDomSize } from "@app/hooks/useSize";
import { useTruncateText } from "@app/hooks/useTruncateText";

import type { TreeViewData } from "@app/utils/generateDir";
import type { VirtuosoHandle } from "react-virtuoso";

const setSelectKey = useGitHubCompareTreeSelect.getActions().setKey;

const refreshList = useGitHubCompareSourceList.getActions().refreshList;

const Indent = 18;

const RenderSelect = () => {
  return <Box position="absolute" top="0" left="1px" height="100%" borderLeft="2px" borderColor="blue.500" borderRadius="md" pointerEvents="none" />;
};

const RenderIndent = ({ item }: { item: TreeViewData }) => {
  const ele: ReactNode[] = [];
  let p = item.parent;
  while (p && p.deep >= 0) {
    p.hasNextDir &&
      ele.unshift(
        <Box
          data-indent
          position="absolute"
          opacity={0}
          top="0"
          left={`calc(${Indent * p.deep}px + 10px)`}
          height="100%"
          borderLeft="1px"
          borderColor="gray.400"
          _groupHover={{ opacity: 1 }}
        />,
      );
    p = p.parent;
  }

  return <>{Children.map(ele, (v) => v)}</>;
};

const RenderIcon = ({ item }: { item: TreeViewData }) => {
  if (item.isDir) {
    return <Icon as={item.isOpen ? FaFolderOpen : FaFolder} color="blue.500" />;
  } else {
    return <Icon as={FaFile} color="gray.400" />;
  }
};

const RenderStatusIcon = ({ item }: { item: TreeViewData }) => {
  if (!item.status) return null;
  if (item.status === "added") {
    return <Icon as={VscDiffAdded} color="green.500" />;
  }
  if (item.status === "modified") {
    return <Icon as={VscDiffModified} color="yellow.500" />;
  }
  if (item.status === "removed") {
    return <Icon as={VscDiffRemoved} color="red.500" />;
  }
  if (item.status === "renamed") {
    return <Icon as={VscDiffRenamed} color="gray.500" />;
  }
};

const RenderName = ({ item, parentWidth }: { item: TreeViewData; parentWidth?: any }) => {
  const ref = useRef<HTMLDivElement>();

  const container = useStaticDomSize({ ref, deps: [parentWidth] });

  const { textToDisplay, maxWidth } = useTruncateText({ text: item.name, container, fontSize: "16px" });

  const Ele =
    textToDisplay !== item.name ? (
      <Tooltip label={item.name}>
        <Text>{textToDisplay}</Text>
      </Tooltip>
    ) : (
      <Text>{textToDisplay}</Text>
    );

  return (
    <Box marginLeft="2" flexGrow={1} ref={ref} data-width={container.width} data-content-width={maxWidth}>
      {maxWidth === Infinity ? <SkeletonText noOfLines={1} /> : Ele}
    </Box>
  );
};

const RenderItem = ({ index, item, width: parentWidth }: { index: number; item: TreeViewData; width?: any }) => {
  const selectKey = useGitHubCompareTreeSelect((s) => s.key);

  const currentIsSelect = item?.id === selectKey;

  const left = `${Indent * item.deep}px`;

  return (
    <Box
      id={item.id}
      data-id={item.id}
      data-index={index}
      data-deep={item.deep}
      whiteSpace="nowrap"
      height="26px"
      cursor="pointer"
      borderRadius="md"
      userSelect="none"
      onDoubleClick={() => {
        if (item.isDir) {
          toRaw(item).isOpen = !item.isOpen;
          refreshList();
        }
      }}
      onClick={() => {
        if (item.isLeaf) {
          setSelectKey(item.id);
        }
      }}
      transition="background 0.3s ease-out"
      backgroundColor={currentIsSelect ? "blackAlpha.200" : undefined}
      _hover={{ backgroundColor: "blackAlpha.200" }}
    >
      <Flex alignItems="center" height="100%" paddingLeft={`calc(${left})`} width="full" data-aside-item position="relative">
        <Box width="2" color="transparent" flexShrink="0" flexGrow="0">
          .
        </Box>
        {currentIsSelect && <RenderSelect />}
        <RenderIndent item={item} />
        <RenderIcon item={item} />
        <RenderName item={item} parentWidth={parentWidth} />
        <RenderStatusIcon item={item} />
        <Box width="2" color="transparent" flexShrink="0" flexGrow="0">
          .
        </Box>
      </Flex>
    </Box>
  );
};

// const render = (index: number, item: TreeViewData) => <RenderItem index={index} item={item} />;

export const DiffAsideTree = memo(
  forwardRef<VirtuosoHandle, BoxProps & { containerWidth: number }>((props, ref) => {
    const data = useGitHubCompareSourceList.useShallowStableSelector((s) => s.flattenData);

    const { onScroll, containerWidth, ...last } = props;

    if (!data || !data.length)
      return (
        <Text textAlign="center" marginY="4" lineHeight="4em">
          Empty
        </Text>
      );

    return (
      <Box className="group" {...last}>
        <Virtuoso<TreeViewData, null>
          ref={ref}
          increaseViewportBy={200}
          fixedItemHeight={26}
          onScroll={onScroll}
          data={data as TreeViewData[]}
          itemContent={(index: number, item: TreeViewData) => <RenderItem index={index} item={item} width={containerWidth} />}
        />
      </Box>
    );
  }),
);

DiffAsideTree.displayName = "DiffAsideTree";
