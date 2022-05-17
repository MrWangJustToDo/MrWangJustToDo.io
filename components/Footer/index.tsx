import { Text, Icon, Link, Flex, Box } from "@chakra-ui/react";
import { BLOG_SOURCE } from "config/source";
import { AiFillHeart } from "react-icons/ai";

export const Footer = () => {
  return (
    <Box textAlign="center">
      <Flex
        marginTop="6"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          fontSize={{ base: "medium", md: "xl" }}
          fontWeight="semibold"
          isTruncated
          display="flex"
          alignItems="center"
        >
          <Text as="span">source from</Text>
          <Icon as={AiFillHeart} color="red.600" paddingLeft="0.2em" />
          <Link
            href={BLOG_SOURCE}
            target="_blank"
            color="blue.500"
            textDecoration="none"
            paddingLeft="0.2em"
          >
            github
          </Link>
        </Text>
      </Flex>
      <Text
        fontSize="sm"
        marginTop="2.5"
        marginBottom="4"
        color="lightTextColor"
      >
        {new Date().getFullYear()}
      </Text>
    </Box>
  );
};
