/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Flex, Icon, IconButton, Input, InputGroup, InputRightAddon, SkeletonText, Text, Tooltip } from "@chakra-ui/react";
import { smoothScroll } from "@reactour/utils";
import { Children, useCallback, useEffect, useRef, useState } from "react";
import { Tree } from "react-arborist";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { VscDiffAdded, VscDiffModified, VscDiffRemoved, VscDiffRenamed } from "react-icons/vsc";

import { useGitHubCompareSourceInView, useGitHubCompareSourceList, useGitHubCompareSourceSelect } from "@app/hooks/useGitHubCompareSource";
import { useDomSize, useSyncDomSize } from "@app/hooks/useSize";
import { useTruncateText } from "@app/hooks/useTruncateText";
import { useWindowSize } from "@app/hooks/useWindowSize";

import { Card } from "../Card";

import type { GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";
import type { TreeViewData } from "@app/utils/generateDir";
import type { CSSProperties, ReactNode } from "react";
import type { NodeApi, TreeApi } from "react-arborist";

const setSelectKey = useGitHubCompareSourceSelect.getActions().setKey;

const RenderIndent = ({ tree, node }: { tree: TreeApi<TreeViewData>; node: NodeApi<TreeViewData> }) => {
  const ele: ReactNode[] = [];
  let p = node.parent;
  while (p && p.level >= 0) {
    p.nextSibling &&
      ele.unshift(
        <Box
          data-indent
          position="absolute"
          opacity={0}
          top="0"
          left={`calc(${tree.indent * p.level}px + 0.75em)`}
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

const RenderSelect = () => {
  return <Box position="absolute" top="0" left="1px" height="100%" borderLeft="2px" borderColor="blue.500" borderRadius="md" pointerEvents="none" />;
};

const RenderStateIcon = ({ data }: { data: GitHubCompareFileListType }) => {
  if (data.status === "added") {
    return <Icon as={VscDiffAdded} color="green.500" />;
  }
  if (data.status === "modified") {
    return <Icon as={VscDiffModified} color="yellow.500" />;
  }
  if (data.status === "removed") {
    return <Icon as={VscDiffRemoved} color="red.500" />;
  }
  if (data.status === "renamed") {
    return <Icon as={VscDiffRenamed} color="gray.500" />;
  }
};

const RenderItem = ({ node, select }: { node: NodeApi<TreeViewData>; select?: NodeApi<TreeViewData> }) => {
  const ref = useRef<HTMLDivElement>();

  const container = useSyncDomSize({ ref });

  const { textToDisplay, maxWidth } = useTruncateText({ text: node.data.name, container });

  const Ele =
    textToDisplay !== node.data.name ? (
      <Tooltip label={node.data.name}>
        <Text>{textToDisplay}</Text>
      </Tooltip>
    ) : (
      <Text>{textToDisplay}</Text>
    );

  if (node.data.isLeaf) {
    return (
      <Flex alignItems="center" height="100%" paddingX="2">
        {node.id === select?.id && <RenderSelect />}
        <RenderIndent node={node} tree={node.tree as TreeApi<TreeViewData>} />
        <Icon as={FaFile} color="gray.400" />
        <Box marginLeft="2" width="calc(var(--tree-item-width) - 2.5em)" ref={ref} data-width={container.width} data-max-width={maxWidth}>
          {maxWidth === Infinity ? <SkeletonText noOfLines={1} /> : Ele}
        </Box>
        <RenderStateIcon data={node.data as unknown as GitHubCompareFileListType} />
      </Flex>
    );
  } else {
    return (
      <Flex alignItems="center" height="100%" paddingX="2">
        {node.id === select?.id && <RenderSelect />}
        <RenderIndent node={node} tree={node.tree as TreeApi<TreeViewData>} />
        <Icon as={node.isOpen ? FaFolderOpen : FaFolder} color="blue.500" />
        <Box marginLeft="2" width="calc(var(--tree-item-width) - 2.5em)" ref={ref} data-width={container.width} data-max-width={maxWidth}>
          {maxWidth === Infinity ? <SkeletonText noOfLines={1} /> : Ele}
        </Box>
      </Flex>
    );
  }
};

export const DiffAside = () => {
  const data = useGitHubCompareSourceList((s) => s.data) as TreeViewData[];

  const id = useGitHubCompareSourceInView((s) => s.id);

  const [select, setSelect] = useState<NodeApi<TreeViewData>>();

  const selectRef = useRef(select);

  const treeRef = useRef<TreeApi<TreeViewData>>();

  const ref = useRef<HTMLDivElement>();

  const groupRef = useRef<HTMLDivElement>();

  const { width } = useDomSize({ ref, delay: 16 });

  const { height: groupHeight } = useDomSize({ ref: groupRef, delay: 16 });

  const { height: windowHeight } = useWindowSize();

  selectRef.current = select;

  useEffect(() => {
    if (select) {
      const ele = document.querySelector(`[data-file="${select.data.id}"]`) as HTMLElement;
      ele && smoothScroll(ele, { behavior: "instant", block: "start" });
      ele && setSelectKey(select.data.id);
    }
  }, [select]);

  useEffect(() => {
    if (id) {
      treeRef.current?.scrollTo(id);
    }
  }, [id]);

  const render = useCallback(({ node, style }: { node: NodeApi; style: CSSProperties }) => {
    if (node.data.isLeaf) {
      return (
        <Box
          id={node.data.id}
          data-id={node.data.id}
          // @ts-ignore
          style={{ ...style, ["--tree-item-width"]: `calc(var(--tree-container-width) - ${style.paddingLeft}px)` }}
          whiteSpace="nowrap"
          height="100%"
          cursor="pointer"
          borderRadius="md"
          transition="background 0.3s ease-out"
          backgroundColor={node.id === selectRef.current?.id ? "blackAlpha.200" : undefined}
          _hover={{ backgroundColor: "blackAlpha.200" }}
        >
          <RenderItem node={node} select={selectRef.current} />
        </Box>
      );
    } else {
      return (
        <Box
          id={node.data.id}
          data-id={node.data.id}
          // @ts-ignore
          style={{ ...style, ["--tree-item-width"]: `calc(var(--tree-container-width) - ${style.paddingLeft}px)` }}
          whiteSpace="nowrap"
          height="100%"
          cursor="pointer"
          borderRadius="md"
          userSelect="none"
          onDoubleClick={() => node.toggle()}
          transition="background 0.3s ease-out"
          backgroundColor={node.id === selectRef.current?.id ? "blackAlpha.200" : undefined}
          _hover={{ backgroundColor: "blackAlpha.200" }}
        >
          <RenderItem node={node} select={selectRef.current} />
        </Box>
      );
    }
  }, []);

  return (
    <Box position="sticky" top="0">
      <InputGroup ref={groupRef}>
        <Input placeholder="Search" marginY="2" disabled />
        <InputRightAddon as={IconButton} marginY="2" color="lightTextColor" fontSize="xl" variant="ghost" aria-label="Search" icon={<GoSearch />} />
      </InputGroup>
      <Card boxShadow="none" padding="2" className="group" overflow="hidden">
        <Box
          ref={ref}
          data-width={width}
          sx={{ [`& [data-id="${id}"]`]: { backgroundColor: "blackAlpha.200" } }}
          // @ts-ignore
          style={{ ["--tree-container-width"]: `${width}px` }}
        >
          <Tree<TreeViewData>
            ref={treeRef}
            initialData={data}
            disableDrag
            disableDrop
            disableEdit
            indent={16}
            overscanCount={40}
            width={width || undefined}
            height={groupHeight && windowHeight ? windowHeight - groupHeight - 50 : undefined}
            disableMultiSelection
            rowHeight={26}
            onSelect={(s) => {
              const item = s[0];
              if (item?.data?.isLeaf) {
                setSelect(item as NodeApi<TreeViewData>);
              }
            }}
          >
            {render}
          </Tree>
        </Box>
      </Card>
    </Box>
  );
};
