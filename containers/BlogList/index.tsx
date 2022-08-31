import { NetworkStatus, useQuery } from "@apollo/client";
import {
  Flex,
  Box,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
  Portal,
  useCallbackRef,
  Center,
  Spinner,
  Button,
  ButtonGroup,
  useBreakpointValue,
} from "@chakra-ui/react";
import { throttle } from "lodash-es";
import { memo, useMemo, useRef, useState } from "react";

import { BlogGrid } from "components/BlogGrid";
import { ErrorCom } from "components/Error";
import { BLOG_REPOSITORY, BLOG_REPOSITORY_OWNER } from "config/source";
import { BlogModal } from "containers/BlogModal";
import { Pagination } from "containers/Pagination";
import { PlayGround } from "containers/PlayGround";
import { GetBlogListDocument, IssueOrderField, OrderDirection } from "graphql/generated";
import { useGetListParams } from "hooks/useGetListParams";
import { usePlayGround } from "hooks/usePlayGround";
import { isBrowser } from "utils/env";

const ITEM_PER_PAGE = 15;

const BlogListLoading = () => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} padding="6" height="100%" overflow="hidden">
    {[1, 2, 3, 4, 5].map((i) => (
      <Box key={i}>
        <SkeletonCircle marginY="2" />
        <SkeletonText noOfLines={6} marginY="2" />
      </Box>
    ))}
  </SimpleGrid>
);

const BASIC_VARIABLE = {
  name: isBrowser ? localStorage.getItem("blog_name") || BLOG_REPOSITORY : BLOG_REPOSITORY,
  owner: isBrowser ? localStorage.getItem("blog_owner") || BLOG_REPOSITORY_OWNER : BLOG_REPOSITORY_OWNER,
  orderBy: {
    field: IssueOrderField.CreatedAt,
    direction: OrderDirection.Desc,
  },
};

const _BlogList = () => {
  const { before, after, navDirection = "first" } = useGetListParams();
  const { data, loading, error } = useQuery(GetBlogListDocument, {
    variables: {
      ...BASIC_VARIABLE,
      first: navDirection === "first" ? ITEM_PER_PAGE : undefined,
      last: navDirection === "last" ? ITEM_PER_PAGE : undefined,
      after,
      before,
    },
  });

  if (loading) return <BlogListLoading />;

  if (error) return <ErrorCom error={error} />;

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

const _BlogListWithInfinityScroll = () => {
  const { onOpen } = usePlayGround();

  const ref = useRef<HTMLDivElement>();

  const [disableGridLayout, setDisableGridLayout] = useState(false);

  const isMobileWidth = useBreakpointValue({ base: true, md: false });

  const { data, loading, error, fetchMore, refetch, networkStatus } = useQuery(GetBlogListDocument, {
    variables: {
      ...BASIC_VARIABLE,
      first: ITEM_PER_PAGE,
    },
    notifyOnNetworkStatusChange: true,
  });

  const fetchMoreCallback = useCallbackRef(() => {
    if (data?.repository?.issues?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: data.repository.issues.pageInfo.endCursor },
      });
    }
  }, []);

  const onThrottleScroll = useMemo(
    () =>
      throttle(() => {
        const node = ref.current;
        if (node) {
          if (node.scrollTop + node.clientHeight >= node.scrollHeight * 0.85) {
            fetchMoreCallback();
          }
        }
      }, 200),
    [fetchMoreCallback]
  );

  if (loading && networkStatus !== NetworkStatus.fetchMore) return <BlogListLoading />;

  if (error) return <ErrorCom error={error} />;

  return (
    <Flex flexDirection="column" height="100%">
      <Box ref={ref} overflow="auto" paddingRight="4" onScroll={onThrottleScroll} className="tour_blogList">
        <BlogGrid data={data.repository.issues.nodes} disableGridLayout={disableGridLayout || isMobileWidth} />
        {loading && data.repository.issues.nodes.length && (
          <Center>
            <Spinner />
          </Center>
        )}
      </Box>
      <Portal>
        <ButtonGroup variant="solid" position="fixed" bottom="4" right="4" className="tour_buttons">
          <Button color="purple.500" textTransform="capitalize" onClick={() => refetch()} size={{ base: "sm", lg: "md" }}>
            refresh
          </Button>
          <Button color="red.500" textTransform="capitalize" onClick={onOpen} size={{ base: "sm", lg: "md" }}>
            playGround
          </Button>
          <Button color="purple.500" textTransform="capitalize" display={{ base: "none", lg: "block" }} onClick={() => setDisableGridLayout((last) => !last)}>
            {!disableGridLayout ? "disable gridLayout" : "enable gridLayout"}
          </Button>
        </ButtonGroup>
      </Portal>
      <BlogModal />
      <PlayGround />
    </Flex>
  );
};

export const BlogList = memo(_BlogList);

export const BlogGridWithInfinityScroll = memo(_BlogListWithInfinityScroll);
