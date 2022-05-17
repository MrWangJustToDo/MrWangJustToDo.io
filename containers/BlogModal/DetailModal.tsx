import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Box, Text, SkeletonText, SkeletonCircle } from "@chakra-ui/react";
import { mark } from "utils/markdown";
import { BLOG_REPOSITORY, BLOG_REPOSITORY_OWNER } from "config/source";
import { GetSingleBlogDocument, GetSingleBlogQuery } from "graphql/generated";
import { Comment } from "components/Comment";
import { ErrorCom } from "components/Error";
import { Actor } from "components/Actor";

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
  RenderLoading: () => JSX.Element;
  Render: ({ data }: { data: GetSingleBlogQuery }) => JSX.Element;
}) => {
  const { data, loading, error } = useQuery(GetSingleBlogDocument, {
    variables: {
      name: BLOG_REPOSITORY,
      owner: BLOG_REPOSITORY_OWNER,
      number: Number(id),
    },
    skip: id === undefined,
  });

  if (loading) return <RenderLoading />;

  if (error) return <ErrorCom error={error} />;

  return <RenderWrapper data={data} Render={Render} />;
};

export const DetailModalBody = ({ id }: { id: string }) => (
  <DetailModal
    id={id}
    RenderLoading={() => (
      <Box padding="2">
        <SkeletonText marginTop="4" noOfLines={8} />
      </Box>
    )}
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

export const DetailModalHeader = ({ id }: { id: string }) => (
  <DetailModal
    id={id}
    RenderLoading={() => (
      <Box padding="2">
        <SkeletonText noOfLines={1} paddingRight="6" />
        <SkeletonCircle marginY="3" />
        <SkeletonText noOfLines={1} spacing="4" />
      </Box>
    )}
    Render={({ data }) => {
      return (
        <Box paddingRight="3em">
          <Text as="h1" fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            {data?.repository?.issue?.title}
          </Text>
          <Actor
            marginTop="2"
            alignItems="center"
            time={data?.repository?.issue?.publishedAt}
            login={data?.repository?.issue?.author?.login}
            avatarUrl={data?.repository?.issue?.author?.avatarUrl}
          />
        </Box>
      );
    }}
  />
);
