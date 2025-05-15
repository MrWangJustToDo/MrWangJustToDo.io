import { Box, Flex, Icon, Text, type BoxProps } from "@chakra-ui/react";
import {
  FileIcon as FaFile,
  FolderIcon as FaFolder,
  FolderOpenIcon as FaFolderOpen,
  SquarePlusIcon as VscDiffAdded,
  SquareDotIcon as VscDiffModified,
  SquareMinusIcon as VscDiffRemoved,
  SquareArrowRightIcon as VscDiffRenamed,
} from "lucide-react";
import { Children, forwardRef, memo, type ReactNode } from "react";
import { Virtuoso } from "react-virtuoso";
import { toRaw } from "reactivity-store";

import { useGitHubCompareSourceList, useGitHubCompareTreeSelect } from "@app/hooks/useGitHubCompareSource";

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
    return <Icon flexShrink={0} as={item.isOpen ? FaFolderOpen : FaFolder} color="blue.500" />;
  } else {
    return <Icon flexShrink={0} as={FaFile} color="gray.400" />;
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

const RenderName = ({ item, left }: { item: TreeViewData; left: string }) => {
  const middleLength = Math.floor(item.name.length / 2);

  const leftStr = item.name.slice(0, middleLength);

  const rightStr = item.name.slice(middleLength);

  return (
    <Flex maxWidth="full" alignItems="center" style={{ paddingLeft: left }}>
      <RenderIcon item={item} />
      <Text whiteSpace="nowrap" marginLeft={2} textOverflow="ellipsis" overflow="hidden" flexShrink={1}>
        {leftStr}
      </Text>
      <Text textAlign="left" marginRight={2} style={{ direction: "rtl" }} whiteSpace="nowrap" overflow="hidden" flexShrink={1}>
        &lrm;
        {rightStr}
        &lrm;
      </Text>
    </Flex>
  );
};

const RenderItem = ({ index, item }: { index: number; item: TreeViewData }) => {
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
      <Flex alignItems="center" height="100%" paddingX="2" width="full" data-aside-item position="relative">
        {currentIsSelect && <RenderSelect />}
        <RenderIndent item={item} />
        <Box width="calc(100% - 4em)" flexGrow={1} overflow="hidden">
          <RenderName item={item} left={left} />
        </Box>
        <RenderStatusIcon item={item} />
      </Flex>
    </Box>
  );
};

export const DiffAsideTree = memo(
  forwardRef<VirtuosoHandle, BoxProps>((props, ref) => {
    const data = useGitHubCompareSourceList.useShallowStableSelector((s) => s.flattenData);

    const { onScroll, ...last } = props;

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
          className="overflow-x-hidden"
          itemContent={(index: number, item: TreeViewData) => <RenderItem index={index} item={item} />}
        />
      </Box>
    );
  }),
);

DiffAsideTree.displayName = "DiffAsideTree";
