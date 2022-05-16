import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  useToast,
  Text,
  Flex,
  Avatar,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import { mark } from "utils/markdown";
import { BLOG_REPOSITORY, BLOG_REPOSITORY_OWNER } from "config/source";
import { GetSingleBlogDocument, GetSingleBlogQuery } from "graphql/generated";
import { momentTo } from "utils/time";
import { Comment } from "components/Comment";

const RenderWrapper = ({
  data,
  Render,
}: {
  data: GetSingleBlogQuery;
  Render: ({ data }: { data: GetSingleBlogQuery }) => JSX.Element;
}) => {
  return Render({ data });
};

export const DetailModal = ({
  id,
  Render,
  RenderLoading,
}: {
  id: string;
  RenderLoading: JSX.Element;
  Render: ({ data }: { data: GetSingleBlogQuery }) => JSX.Element;
}) => {
  const open = useToast();

  const { data, loading, error } = useQuery(GetSingleBlogDocument, {
    variables: {
      name: BLOG_REPOSITORY,
      owner: BLOG_REPOSITORY_OWNER,
      number: Number(id),
    },
    skip: id === undefined,
  });

  if (loading && RenderLoading) {
    return RenderLoading;
  }

  if (error) {
    open({
      title: "Get Detail Error",
      description: error.message,
      status: "error",
    });

    return <React.Fragment />;
  }

  return <RenderWrapper data={data} Render={Render} />;
};

const DetailModalBodyLoading = (
  <Box padding="2">
    <SkeletonText marginTop="4" noOfLines={8} />
  </Box>
);

export const DetailModalBody = ({ id }: { id: string }) => (
  <DetailModal
    id={id}
    RenderLoading={DetailModalBodyLoading}
    Render={({ data }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const rendered = useMemo(
        () => mark.render(data?.repository?.issue?.body || ""),
        [data]
      );

      return (
        <>
          <Box
            className="typo"
            fontSize={{ base: "sm", lg: "md" }}
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
          <Comment data={data.repository.issue.comments.nodes} />
        </>
      );
    }}
  />
);

const DetailModalHeaderLoading = (
  <Box padding="2">
    <SkeletonText noOfLines={1} />
    <SkeletonCircle marginY="3" />
    <SkeletonText noOfLines={1} spacing="4" />
  </Box>
);

export const DetailModalHeader = ({ id }: { id: string }) => (
  <DetailModal
    id={id}
    RenderLoading={DetailModalHeaderLoading}
    Render={({ data }) => {
      return (
        <Box paddingRight="3em">
          <Text as="h1" fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            {data?.repository?.issue?.title}
          </Text>
          <Flex marginTop="2" alignItems="center">
            <Avatar
              src={data?.repository?.issue?.author?.avatarUrl}
              title={data?.repository?.issue?.author?.login}
              name={data?.repository?.issue?.author?.login}
              width="6"
              height="6"
            />
            <Text fontSize="small" color="lightTextColor" marginLeft="2">
              {momentTo(data?.repository?.issue?.publishedAt)}
            </Text>
          </Flex>
        </Box>
      );
    }}
  />
);
