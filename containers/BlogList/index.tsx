import { useQuery } from "@apollo/client";
import { Center, Flex, Spinner, useToast, Box } from "@chakra-ui/react";
import { BlogGrid } from "components/BlogGrid";
import { BLOG_REPOSITORY, BLOG_REPOSITORY_OWNER } from "config/source";
import { BlogModal } from "containers/BlogModal";
import { GetBlogListDocument } from "graphql/generated";
import { useGetListParams } from "hooks/useGetListParams";
import React, { memo } from "react";

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
      <Box overflow="auto" paddingRight="2">
        <BlogGrid data={data.repository.issues.nodes} />
      </Box>
      <BlogModal />
    </Flex>
  );
};

export const BlogList = memo(_BlogList);
