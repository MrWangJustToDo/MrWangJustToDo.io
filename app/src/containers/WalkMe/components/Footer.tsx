import { Button, Flex, Text } from "@chakra-ui/react";

import type { CompProps } from "../types";

export const Footer = ({ actions, stepIndex, stepLen }: CompProps) => {
  const { next } = actions;

  return (
    <Flex alignItems="center" justifyContent="space-between" fontSize="small" marginTop={{ base: "1", lg: "2" }}>
      <Text>
        {stepIndex + 1} / {stepLen}
      </Text>
      <Button colorScheme="blue" size="sm" onClick={next}>
        Next
      </Button>
    </Flex>
  );
};
