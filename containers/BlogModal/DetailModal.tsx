import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Spinner,
  useToast,
  Text,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { mark } from "utils/markdown";
import { BLOG_REPOSITORY, BLOG_REPOSITORY_OWNER } from "config/source";
import { GetSingleBlogDocument, GetSingleBlogQuery } from "graphql/generated";
import { momentTo } from "utils/time";
import { useOverlaysClose } from "hooks/useOverlay";

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
  showLoading = false,
}: {
  id: string;
  showLoading?: boolean;
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

  if (loading && showLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
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

export const DetailModalBody = ({ id }: { id: string }) => (
  <DetailModal
    id={id}
    showLoading
    Render={({ data }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const rendered = useMemo(
        () => mark.render(data?.repository?.issue?.body),
        [data]
      );

      return (
        <Box
          className="typo"
          fontSize={{ base: "sm", lg: "md" }}
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      );
    }}
  />
);

export const DetailModalHeader = ({ id }: { id: string }) => (
  <DetailModal
    id={id}
    Render={({ data }) => {
      return (
        <Box>
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
