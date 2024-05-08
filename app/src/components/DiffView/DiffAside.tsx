import { Box, Flex, Icon, SkeletonText, Text, Tooltip } from "@chakra-ui/react";
import { smoothScroll } from "@reactour/utils";
import { Children, useCallback, useEffect, useRef, useState } from "react";
import { Tree } from "react-arborist";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa";
import { VscDiffAdded, VscDiffModified, VscDiffRemoved, VscDiffRenamed } from "react-icons/vsc";

import { useGitHubCompareSourceList, useGitHubCompareSourceSelect } from "@app/hooks/useGitHubCompareSource";
import { useDomSize } from "@app/hooks/useSize";
import { useTruncateText } from "@app/hooks/useTruncateText";

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

  const container = useDomSize({ ref });

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
      <Flex alignItems="center" height="100%" paddingX="2" width="100%">
        {node.id === select?.id && <RenderSelect />}
        <RenderIndent node={node} tree={node.tree as TreeApi<TreeViewData>} />
        <Icon as={FaFile} color="gray.400" />
        <Box marginLeft="2" width="100%" ref={ref} data-width={container.width} data-max-width={maxWidth}>
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
        <Box marginLeft="2" width="100%" ref={ref} data-width={container.width} data-max-width={maxWidth}>
          {maxWidth === Infinity ? <SkeletonText noOfLines={1} /> : Ele}
        </Box>
      </Flex>
    );
  }
};

export const DiffAside = () => {
  const data = useGitHubCompareSourceList((s) => s.data);

  const [select, setSelect] = useState<NodeApi<TreeViewData>>();

  const selectRef = useRef(select);

  const ref = useRef<HTMLDivElement>();

  const { width } = useDomSize({ ref });

  selectRef.current = select;

  useEffect(() => {
    if (select) {
      const ele = document.querySelector(`[data-file="${select.data.id}"]`) as HTMLElement;
      ele && smoothScroll(ele, { behavior: "smooth" });
      ele && setSelectKey(select.data.id);
    }
  }, [select]);

  const render = useCallback(({ node, style }: { node: NodeApi; style: CSSProperties }) => {
    if (node.data.isLeaf) {
      return (
        <Box
          id={node.data.id}
          style={style}
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
          style={style}
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
    <Card boxShadow="none" padding="2" className="group" position="sticky" top="2" overflow="hidden">
      <div ref={ref} data-width={width}>
        <Tree
          initialData={data}
          disableDrag
          disableDrop
          disableEdit
          indent={16}
          overscanCount={20}
          width={width || undefined}
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
      </div>
    </Card>
  );
};
