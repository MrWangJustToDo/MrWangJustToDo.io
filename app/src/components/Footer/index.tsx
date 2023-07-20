import { Text, Icon, Link, Flex, Box } from "@chakra-ui/react";
import { memo } from "react";
import { AiFillHeart } from "react-icons/ai";

import { BLOG_SOURCE, POWER_BY } from "@app/config/source";
import { useIsMounted } from "@app/hooks/useIsMounted";

const _Footer = () => {
  const isMounted = useIsMounted();
  return (
    <Box textAlign="center">
      <Flex marginTop="6" justifyContent="center" alignItems="center">
        <Text fontSize={{ base: "medium", md: "xl" }} fontWeight="semibold" noOfLines={1} display="flex" alignItems="center">
          {/* <Text as="span">source from</Text> */}
          <Link href={BLOG_SOURCE} target="_blank" color="blue.500" textDecoration="none" paddingLeft="0.2em">
            github
          </Link>

          <Icon as={AiFillHeart} color="red.600" mx="0.2em" />
          <Text as="span">Next.js</Text>
        </Text>
      </Flex>
      <Text marginTop="2.5" fontSize="sm">
        power by
        <Link href={POWER_BY} target="_blank" color="blue.500" textDecoration="none" paddingLeft="0.2em">
          @my-react
        </Link>
      </Text>
      <Text fontSize="small" marginTop="2.5" marginBottom="9" color="lightTextColor">
        {isMounted && new Date().getFullYear()}
      </Text>
    </Box>
  );
};

export const Footer = memo(_Footer);
