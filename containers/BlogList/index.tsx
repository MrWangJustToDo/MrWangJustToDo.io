import { useQuery } from "@apollo/client";
import {
  Flex,
  useToast,
  Box,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
  Portal,
} from "@chakra-ui/react";
import { BlogGrid } from "components/BlogGrid";
import { BLOG_REPOSITORY, BLOG_REPOSITORY_OWNER } from "config/source";
import { BlogModal } from "containers/BlogModal";
import {
  GetBlogListDocument,
  IssueOrderField,
  OrderDirection,
} from "graphql/generated";
import { isBrowser } from "utils/env";
import { useGetListParams } from "hooks/useGetListParams";
import React, { memo } from "react";
import { Pagination } from "containers/Pagination";

const ITEM_PER_PAGE = 5;

const _BlogList = () => {
  const open = useToast();
  const { before, after, navDirection = "first" } = useGetListParams();
  const { data, loading, error } = useQuery(GetBlogListDocument, {
    variables: {
      name: isBrowser
        ? localStorage.getItem("blog_name") || BLOG_REPOSITORY
        : BLOG_REPOSITORY,
      owner: isBrowser
        ? localStorage.getItem("blog_owner") || BLOG_REPOSITORY_OWNER
        : BLOG_REPOSITORY_OWNER,
      first: navDirection === "first" ? ITEM_PER_PAGE : undefined,
      last: navDirection === "last" ? ITEM_PER_PAGE : undefined,
      after,
      before,
      orderBy: {
        field: IssueOrderField.CreatedAt,
        direction: OrderDirection.Desc,
      },
    },
  });

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} padding="6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Box key={i}>
            <SkeletonCircle marginY="2" />
            <SkeletonText noOfLines={6} marginY="2" />
          </Box>
        ))}
      </SimpleGrid>
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
      <Box overflow="auto" paddingRight="4">
        <BlogGrid data={data.repository.issues.nodes} />
      </Box>
      <BlogModal />
      <Portal>
        <Pagination
          paginationProps={data.repository.issues.pageInfo}
          containerProps={{
            right: "4",
            bottom: "4",
            position: "fixed",
          }}
        />
      </Portal>
    </Flex>
  );
};

export const BlogList = memo(_BlogList);
