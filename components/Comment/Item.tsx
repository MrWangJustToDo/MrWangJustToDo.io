import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { Hover } from "components/Hover";
import { GetSingleBlogQuery } from "graphql/generated";
import { useMemo } from "react";
import { mark } from "utils/markdown";
import { momentTo } from "utils/time";

export const Item = (
  props: GetSingleBlogQuery["repository"]["issue"]["comments"]["nodes"][0]
) => {
  const {
    body,
    author: { login, avatarUrl },
    updatedAt,
  } = props;
  const rendered = useMemo(() => mark.render(body), [body]);
  return (
    <Box
      marginY="2"
      padding="2"
      border="1px"
      boxShadow="md"
      borderRadius="md"
      borderColor="cardBorderColor"
    >
      <Flex alignItems="flex-end">
        <Avatar src={avatarUrl} name={login} title={login} size="sm" />
        <Text marginLeft="2" fontSize="small" color="lightTextColor">
          {momentTo(updatedAt)}
        </Text>
      </Flex>
      <Box
        marginTop="3.5"
        className="typo"
        fontSize="small"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    </Box>
  );
};
