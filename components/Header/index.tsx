import { Box, Text, Link } from "@chakra-ui/react";
import { Source } from "config/source";
import { memo } from "react";

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
      <Text
        fontSize={{ base: "medium", md: "xl" }}
        fontWeight="semibold"
        isTruncated
        marginLeft="2"
      >
        source from
        <Link
          href={Source}
          target="_blank"
          color="blue.500"
          paddingLeft="0.2em"
        >
          github
        </Link>
      </Text>
    </Box>
  );
};

export const Header = memo(_Header);
