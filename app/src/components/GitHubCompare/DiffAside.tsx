import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Children, useState } from "react";
import { Tree } from "react-arborist";
import { FaFile, FaFolder } from "react-icons/fa";

import { useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";

import { Card } from "../Card";

import type { TreeViewData } from "@app/utils/generateDir";
import type { ReactNode } from "react";
import type { NodeApi, TreeApi } from "react-arborist";

const RenderIndent = ({ tree, node }: { tree: TreeApi<TreeViewData>; node: NodeApi }) => {
  const ele: ReactNode[] = [];
  let p = node.parent;
  while (p && p.level >= 0) {
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

export const DiffAside = () => {
  const data = useGitHubCompareSourceList((s) => s.data);

  const [select, setSelect] = useState<NodeApi<TreeViewData>>();

  return (
    <Card boxShadow="none" padding="2" className="group" position="sticky" top="0">
      <Tree
        initialData={data}
        disableDrag
        disableDrop
        disableEdit
        disableMultiSelection
        width="300px"
        rowHeight={26}
        onSelect={(s) => setSelect(s[0] as NodeApi<TreeViewData>)}
      >
        {({ node, style }) => {
          if (node.data.isLeaf) {
            return (
              <Box
                id={node.data.id}
                style={style}
                whiteSpace="nowrap"
                height="100%"
                cursor="pointer"
                borderRadius="md"
                onDoubleClick={() => node.toggle()}
                transition="background 0.3s ease-out"
                backgroundColor={node.id === select?.id ? "blackAlpha.200" : undefined}
                _hover={{ backgroundColor: "blackAlpha.200" }}
              >
                <Flex alignItems="center" height="100%" paddingX="2">
                  {node.id === select?.id && <RenderSelect />}
                  <RenderIndent node={node} tree={node.tree as TreeApi<TreeViewData>} />
                  <Icon as={FaFile} color="gray.500" />
                  <Text marginLeft="2" width="100%" noOfLines={1}>
                    {node.data.name}
                  </Text>
                </Flex>
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
                onDoubleClick={() => node.toggle()}
                transition="background 0.3s ease-out"
                backgroundColor={node.id === select?.id ? "blackAlpha.200" : undefined}
                _hover={{ backgroundColor: "blackAlpha.200" }}
              >
                <Flex alignItems="center" height="100%" paddingX="2">
                  {node.id === select?.id && <RenderSelect />}
                  <RenderIndent node={node} tree={node.tree as TreeApi<TreeViewData>} />
                  <Icon as={FaFolder} color="blue.500" />
                  <Text marginLeft="2" width="100%" noOfLines={1}>
                    {node.data.name}
                  </Text>
                </Flex>
              </Box>
            );
          }
        }}
      </Tree>
    </Card>
  );
};
