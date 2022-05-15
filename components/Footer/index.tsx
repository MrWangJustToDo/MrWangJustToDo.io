import { Text, Icon, Link, Flex } from "@chakra-ui/react";
import { Source } from "config/source";
import { AiFillHeart } from "react-icons/ai";

export const Footer = () => {
  return (
    <Flex marginY="6" marginBottom="9" justifyContent="center">
      <Text
        fontSize={{ base: "medium", md: "xl" }}
        fontWeight="semibold"
        isTruncated
        marginLeft="2"
        display="flex"
        alignItems="center"
      >
        <Text as="span">source from</Text>
        <Icon as={AiFillHeart} color="red.600" paddingLeft="0.2em" />
        <Link
          href={Source}
          target="_blank"
          color="blue.500"
          textDecoration="none"
          paddingLeft="0.2em"
        >
          github
        </Link>
      </Text>
    </Flex>
  );
};
