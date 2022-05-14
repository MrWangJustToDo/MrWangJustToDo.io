import { useQuery } from "@apollo/client";
import {
  Center,
  Flex,
  Spinner,
  useToast,
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";
import { BlogGrid } from "components/BlogGrid";
import { GetBlogListDocument } from "graphql/generated";
import { useGetListParams } from "hooks/useGetListParams";
import React, { memo } from "react";

const BLOG_REPOSITORY = "MrWangJustToDo.io";
const BLOG_REPOSITORY_OWNER = "mrwangjusttodo";
const ITEM_PER_PAGE = 5;

const _BlogList = () => {
  const open = useToast();
  const { before, after } = useGetListParams();
  const { data, loading, error } = useQuery(GetBlogListDocument, {
    variables: {
      name: BLOG_REPOSITORY,
      owner: BLOG_REPOSITORY_OWNER,
      first: ITEM_PER_PAGE,
      after,
      before,
    },
  });

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    open({
      title: "Get Blog Error",
      description: error.message,
      status: "error",
    });

    return <React.Fragment />;
  }

  return (
    <Flex flexDirection="column" height="100%">
      <Box textAlign="center">
        <Text fontSize="2xl" fontWeight="extrabold">
          All
        </Text>
      </Box>
      <Divider marginY="2" />
      <Box overflow="auto">
        <BlogGrid
          data={data.repository.issues.nodes.reduce(
            (p, c) => p.concat(c).concat(c).concat(c).concat(c).concat(c),
            []
          )}
        />
      </Box>
    </Flex>
  );
};

export const BlogList = memo(_BlogList);
