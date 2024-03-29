import { Container, Flex, HStack, Link, Text, Tooltip } from "@chakra-ui/react";
import { version } from "@my-react/react";
import { memo } from "react";

import { CONTAINER_WIDTH } from "@app/config/container";
import { POWER_BY } from "@app/config/source";

import { ColorMode } from "../ColorMode";
import { FullScreen } from "../FullScreen";

import { GlobalStyle } from "./GlobalStyle";

const _Header = () => {
  return (
    <Container maxWidth={CONTAINER_WIDTH}>
      <GlobalStyle />
      <Flex paddingY="2" justifyContent="space-between" alignItems="center">
        <Flex direction="row" alignItems="baseline" columnGap="2">
          <Text as="h1" fontSize={{ base: "3xl", md: "6xl" }} fontWeight={{ base: "bold", md: "extrabold" }} title="power by @my-react">
            Blog.
          </Text>
          <small>
            power by{" "}
            <Tooltip label={`Go to @my-react project, version: ${version}`} placement="top" hasArrow>
              <Link color="purple.500" href={POWER_BY} target="_blank" _hover={{ textDecoration: "none" }}>
                @my-react
              </Link>
            </Tooltip>
          </small>
        </Flex>
        <HStack spacing={4}>
          <FullScreen />
          <ColorMode />
        </HStack>
      </Flex>
    </Container>
  );
};

export const Header = memo(_Header);
