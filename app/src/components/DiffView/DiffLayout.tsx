import { Flex, Box } from "@chakra-ui/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import type { ReactNode } from "react";

const isLegacyBrowser = () => {
  if (typeof window !== "undefined") {
    if (navigator?.userAgent?.includes?.("Firefox")) {
      return true;
    }
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      return !CSS.supports("overflow", "clip");
    }
  }
  return true;
};

export const DiffLayout = ({ aside, content }: { aside: ReactNode; content: ReactNode }) => {
  if (isLegacyBrowser()) {
    return (
      <Flex columnGap="2">
        <Box width="300px">{aside}</Box>
        <Box width="calc(100% - 270px)">{content}</Box>
      </Flex>
    );
  }

  return (
    <PanelGroup direction="horizontal" style={{ overflow: "clip" }}>
      <Panel minSize={16} defaultSize={20} style={{ overflow: "clip" }}>
        {aside}
      </Panel>
      <PanelResizeHandle style={{ overflow: "clip" }}>
        <Box marginX="1" width="2" height="100%">
          <Box
            position="sticky"
            height="96vh"
            width="100%"
            borderRadius="md"
            backgroundColor="rgba(100,100,100, 0.1)"
            transition="backgroundColor 0.3s ease-in-out"
            _hover={{ backgroundColor: "rgba(100,100,100, 0.2)" }}
            _active={{ backgroundColor: "rgba(100,100,100, 0.3)" }}
            zIndex="sticky"
            top="2"
          />
        </Box>
      </PanelResizeHandle>
      <Panel minSize={50} style={{ overflow: "clip" }}>
        {content}
      </Panel>
    </PanelGroup>
  );
};
