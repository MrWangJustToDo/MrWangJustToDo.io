import { useRouter } from "next/router";
import {
  Avatar,
  Text,
  Flex,
  Box,
  Icon,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { GetBlogListQuery } from "graphql/generated";
import { momentTo } from "utils/time";
import { Hover } from "components/Hover";
import { useMemo } from "react";
import { markNOLineNumber } from "utils/markdown";

export const Item = (
  props: GetBlogListQuery["repository"]["issues"]["nodes"][0]
) => {
  const {
    title,
    number,
    body,
    publishedAt,
    author: { avatarUrl, login },
  } = props;
  const { push, query } = useRouter();
  const renderedBody = useMemo(() => markNOLineNumber.render(body), [body]);
  return (
    <Flex flexDirection="column" height="100%">
      <Box padding="2">
        <Flex justifyContent="space-between" alignItems="baseline">
          <Text
            fontSize={{ base: "18", md: "20", lg: "22" }}
            width="85%"
            fontWeight="medium"
            title={title}
            isTruncated
          >
            {title}
          </Text>
          <Hover>
            <IconButton
              aria-label="detail"
              onClick={() => {
                push({
                  pathname: "/",
                  query: {
                    ...query,
                    overlay: "open",
                    detailId: number,
                  },
                });
              }}
              variant="link"
              size="sm"
              icon={<Icon as={AiOutlineRight} userSelect="none" />}
            />
          </Hover>
        </Flex>
        <Flex marginTop="2" alignItems="center">
          <Avatar
            src={avatarUrl}
            title={login}
            name={login}
            width="6"
            height="6"
          />
          <Text fontSize="small" color="lightTextColor" marginLeft="2">
            {momentTo(publishedAt)}
          </Text>
        </Flex>
      </Box>
      <Divider />
      <Box
        className="typo"
        overflow="auto"
        paddingX="2"
        fontSize="sm"
        dangerouslySetInnerHTML={{ __html: renderedBody }}
      />
    </Flex>
  );
};
