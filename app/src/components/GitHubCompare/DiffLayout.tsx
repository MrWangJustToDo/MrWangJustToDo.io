import { Flex, Box } from "@chakra-ui/react";

import type { ReactNode } from "react";

export const DiffLayout = ({ aside, content }: { aside: ReactNode; content: ReactNode }) => {
  return (
    <Flex columnGap="2">
      <Box>{aside}</Box>
      <Box width="100%">{content}</Box>
    </Flex>
  );
};
