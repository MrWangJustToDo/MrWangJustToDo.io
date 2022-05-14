import { Box, Text, Link, Icon, Button } from "@chakra-ui/react";
import { ColorMode } from "components/ColorMode";
import { Source } from "config/source";
import { memo } from "react";
import { AiFillHeart } from "react-icons/ai";

const _Header = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="2"
    >
      <Text
        as="h1"
        fontSize={{ base: "3xl", md: "6xl" }}
        fontWeight={{ base: "bold", md: "extrabold" }}
      >
        Blog.
      </Text>
      <ColorMode />
    </Box>
  );
};

export const Header = memo(_Header);
