import { NetworkStatus, useApolloClient, useQuery } from "@apollo/client";
import { GetSingleBlogDocument } from "@blog/graphql";
import { Box, Text, SkeletonText, SkeletonCircle, useCallbackRef, Icon, IconButton, useColorModeValue, HStack, Spacer } from "@chakra-ui/react";
import { countBy, throttle } from "lodash-es";
import { useEffect, useMemo } from "react";
import { AiOutlineReload } from "react-icons/ai";

import { Actor } from "@app/components/Actor";
import { Card } from "@app/components/Card";
import { Comment } from "@app/components/Comment";
import { ErrorCom } from "@app/components/Error";
import { useBlogSource } from "@app/hooks/useBlogSource";
import { getTargetEmoji } from "@app/utils/emoji";
import { mark } from "@app/utils/markdown";

import { DetailProgressBar } from "./DetailProgressBar";

import type { GetSingleBlogQuery, ReactionContent } from "@blog/graphql";

const COMMENT_LENGTH = 15;

const RenderWrapper = ({ data, Render }: { data: GetSingleBlogQuery; Render: ({ data }: { data: GetSingleBlogQuery }) => JSX.Element }) => {
  return Render({ data });
};

export const DetailModal = ({
  id,
  Render,
  needAutoLoad,
  RenderLoading,
}: {
  id: string;
  needAutoLoad?: boolean;
  RenderLoading: JSX.Element;
  Render: ({ data }: { data: GetSingleBlogQuery }) => JSX.Element;
}) => {
  const { repository, owner } = useBlogSource((s) => s.source);

  const { data, loading, error, fetchMore, networkStatus } = useQuery(GetSingleBlogDocument, {
    variables: {
      name: repository,
      owner: owner,
      number: Number(id),
      first: COMMENT_LENGTH,
    },
    skip: id === undefined,
    notifyOnNetworkStatusChange: true,
  });

  const fetchMoreCallback = useCallbackRef(() => {
    if (data?.repository?.issue?.comments?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: data.repository.issue.comments.pageInfo.endCursor },
      });
    }
  }, []);

  const onThrottleScroll = useMemo(
    () =>
      throttle((e: Event) => {
        const node = e.target as HTMLDivElement;
        if (node) {
          if (node.scrollTop + node.clientHeight >= node.scrollHeight * 0.85) {
            fetchMoreCallback();
          }
        }
      }, 500),
    [fetchMoreCallback],
  );

  useEffect(() => {
    const scrollElement = document.querySelector("#modal-scroll-box") as HTMLDivElement;
    if (scrollElement && needAutoLoad) {
      scrollElement.addEventListener("scroll", onThrottleScroll);
      return () => {
        scrollElement.removeEventListener("scroll", onThrottleScroll);
      };
    }
  }, [onThrottleScroll, needAutoLoad]);

  if (loading && networkStatus !== NetworkStatus.fetchMore) return RenderLoading;

  if (error) return <ErrorCom error={error} />;

  return <RenderWrapper data={data} Render={Render} />;
};

export const DetailModalBody = ({ id }: { id: string }) => (
  <DetailModal
    id={id}
    needAutoLoad
    RenderLoading={
      <Box padding="2">
        <SkeletonText marginTop="4" noOfLines={8} />
      </Box>
    }
    Render={({ data }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const rendered = useMemo(() => mark.render(data?.repository?.issue?.body || ""), [data]);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const reactions = useMemo(() => countBy(data?.repository?.issue?.reactions?.nodes, (i) => i.content), [data]);
      if (data?.repository?.issue) {
        return (
          <>
            <Card padding="2" borderColor="Highlight" backgroundColor="initial">
              <Actor
                marginTop="2"
                alignItems="center"
                time={data?.repository?.issue?.publishedAt}
                login={data?.repository?.issue?.author?.login}
                avatarUrl={data?.repository?.issue?.author?.avatarUrl}
                avatarProps={{
                  width: 6,
                  height: 6,
                }}
              />
              <Box className="typo" marginTop="3.5" fontSize={{ base: "sm", lg: "md" }} dangerouslySetInnerHTML={{ __html: rendered }} />
              <HStack gap={2}>
                {Object.keys(reactions)
                  .filter((i) => reactions[i])
                  .map((i: ReactionContent) => (
                    <HStack key={i} fontSize="14px" color="gray" borderRadius="full" border="1px" paddingX="8px" paddingY="2px" borderColor="Highlight">
                      <Text>{getTargetEmoji(i)}</Text>
                      <Spacer />
                      <Text>{reactions[i]}</Text>
                    </HStack>
                  ))}
              </HStack>
            </Card>
            <Comment data={data.repository.issue.comments.nodes} />
          </>
        );
      } else {
        return (
          <Card padding="6" backgroundColor="initial" boxShadow="none" borderColor="transparent" textAlign="center">
            <Text>404 Not Found</Text>
          </Card>
        );
      }
    }}
  />
);

export const DetailModalHeader = ({ id }: { id: string }) => (
  <DetailModal
    id={id}
    RenderLoading={
      <Box padding="2">
        <SkeletonText noOfLines={1} paddingRight="6" />
        <SkeletonCircle marginY="3" />
        <SkeletonText noOfLines={1} spacing="4" />
      </Box>
    }
    Render={({ data }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const client = useApolloClient();

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const colorScheme = useColorModeValue("blackAlpha", "gray");

      const refetch = () =>
        client.refetchQueries({
          include: [GetSingleBlogDocument],
        });

      return (
        <>
          <Box paddingRight="3em" marginBottom="-1.5">
            <Text as="h1" fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
              {data?.repository?.issue?.title}
              <IconButton
                size="sm"
                marginLeft="4"
                variant="ghost"
                colorScheme={colorScheme}
                aria-label="reload"
                onClick={() => refetch()}
                icon={<Icon as={AiOutlineReload} />}
              />
            </Text>
          </Box>
          <DetailProgressBar />
        </>
      );
    }}
  />
);
