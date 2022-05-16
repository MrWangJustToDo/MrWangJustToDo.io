import { Container, Flex, Text } from "@chakra-ui/react";
import { ColorMode } from "components/ColorMode";
import { CONTAINER_WIDTH } from "config/container";
import { memo } from "react";
import { GlobalStyle } from "./GlobalStyle";

const _Header = () => {
  return (
    <Container maxWidth={CONTAINER_WIDTH}>
      <GlobalStyle />
      <Flex paddingY="2" justifyContent="space-between" alignItems="center">
        <Text
          as="h1"
          fontSize={{ base: "3xl", md: "6xl" }}
          fontWeight={{ base: "bold", md: "extrabold" }}
        >
          Blog.
        </Text>
        <ColorMode />
      </Flex>
    </Container>
  );
};

export const Header = memo(_Header);
