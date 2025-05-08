import { NetworkStatus, useQuery } from "@apollo/client";
import { GetBlogListDocument, IssueOrderField, IssueState, OrderDirection } from "@blog/graphql";
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
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { throttle } from "lodash-es";
import { ChevronLeftIcon as GoChevronLeft, ChevronRightIcon as GoChevronRight, ChevronDownIcon as GoChevronDown, CheckIcon as GoCheck } from "lucide-react";
import { memo, useEffect, useMemo, useRef } from "react";

import { BlogGrid } from "@app/components/BlogGrid";
import { ErrorCom } from "@app/components/Error";
import { GridLayoutButton } from "@app/components/GridLayoutButton";
import { useBlogSource } from "@app/hooks/useBlogSource";
import { useCollapse } from "@app/hooks/useCollapse";
import { useFullScreen } from "@app/hooks/useFullScreen";
import { useGetListParams } from "@app/hooks/useGetListParams";
import { useGridLayout } from "@app/hooks/useGridLayout";
import { useDomSize } from "@app/hooks/useSize";

import { BlogModal } from "../BlogModal";
import { Pagination } from "../Pagination";

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
  orderBy: {
    field: IssueOrderField.CreatedAt,
    direction: OrderDirection.Desc,
  },
};

const BlogListButton = (props: { onRefresh: () => void }) => {
  const { state: collapse, toggle } = useCollapse();

  const ref = useRef<HTMLDivElement>();

  const { width } = useDomSize({ ref });

  const { sources, setSource, sourceName } = useBlogSource();

  return (
    <ButtonGroup position="fixed" bottom="4" right="4" className="tour_buttons" variant="solid">
      <IconButton
        icon={<Icon as={collapse ? GoChevronLeft : GoChevronRight} fontSize="larger" />}
        aria-label="collapse"
        onClick={toggle}
        size={{ base: "sm", lg: "md" }}
      />
      <Box transitionProperty="width" transitionDuration="0.3s" width={collapse ? "0px" : width} overflow="hidden">
        <ButtonGroup ref={ref}>
          <Button colorScheme="teal" textTransform="capitalize" onClick={() => props.onRefresh()} size={{ base: "sm", lg: "md" }}>
            refresh
          </Button>
          <GridLayoutButton />
          <Box>
            <Menu>
              <MenuButton
                colorScheme="blue"
                textTransform="capitalize"
                as={Button}
                minWidth="14em"
                title="Change source"
                rightIcon={<Icon as={GoChevronDown} fontSize="large" />}
                size={{ base: "sm", lg: "md" }}
              >
                {sourceName}
              </MenuButton>
              <MenuList>
                {sources.map((item) => (
                  <MenuItem key={item.name} onClick={() => setSource(item.name)} justifyContent="space-between">
                    {item.name} {item.name === sourceName && <Icon as={GoCheck} fontSize="lg" />}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </ButtonGroup>
      </Box>
    </ButtonGroup>
  );
};

const BlogList_ = () => {
  const { before, after, navDirection = "first" } = useGetListParams();

  const source = useBlogSource((s) => s.source);

  const { data, loading, error } = useQuery(GetBlogListDocument, {
    variables: {
      ...BASIC_VARIABLE,
      name: source.repository,
      owner: source.owner,
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
      <Box overflow="auto" paddingRight="4" className="tour_blogList">
        {loading && <BlogListLoading />}
        {error && <ErrorCom error={error} />}
        {!loading && !error && <BlogGrid data={data.repository.issues.nodes} disableGridLayout={false} />}
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

const BlogListWithInfinityScroll_ = ({ isMobileWidth }: { isMobileWidth: boolean }) => {
  const disableGridLayout = useGridLayout((s) => s.state);

  const state = useFullScreen((s) => s.state);

  const source = useBlogSource((s) => s.source);

  const { data, loading, error, fetchMore, refetch, networkStatus } = useQuery(GetBlogListDocument, {
    variables: {
      ...BASIC_VARIABLE,
      name: source?.repository,
      owner: source?.owner,
      first: ITEM_PER_PAGE,
      states: IssueState.Open,
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
      throttle((e) => {
        const node = e.target as HTMLDivElement;
        if (node) {
          if (node.scrollTop + node.clientHeight >= node.scrollHeight * 0.85) {
            fetchMoreCallback();
          }
        }
        const html = document.scrollingElement;
        if (html.scrollTop + html.clientHeight >= html.scrollHeight * 0.85) {
          fetchMoreCallback();
        }
      }, 200),
    [fetchMoreCallback],
  );

  useEffect(() => {
    if (state) {
      window.addEventListener("scroll", onThrottleScroll, { passive: true });
      return () => window.removeEventListener("scroll", onThrottleScroll);
    }
  }, [onThrottleScroll, state]);

  const Com =
    loading && networkStatus !== NetworkStatus.fetchMore ? (
      <BlogListLoading />
    ) : error ? (
      <ErrorCom error={error} />
    ) : (
      <BlogGrid data={data.repository.issues.nodes} disableGridLayout={disableGridLayout || isMobileWidth} />
    );

  return (
    <Flex flexDirection="column" height="100%">
      <Box overflow="auto" paddingRight="4" onScroll={onThrottleScroll} className="tour_blogList">
        {Com}
        {loading && data?.repository?.issues?.nodes?.length && (
          <Center height="60px">
            <Spinner />
          </Center>
        )}
      </Box>
      <Portal>
        <BlogListButton onRefresh={() => refetch()} />
      </Portal>
      <BlogModal />
    </Flex>
  );
};

export const BlogList = memo(BlogList_);

export const BlogGridWithInfinityScroll = memo(({ isMobileWidth }: { isMobileWidth: boolean }) => {
  return <BlogListWithInfinityScroll_ isMobileWidth={isMobileWidth} />;
});

BlogGridWithInfinityScroll.displayName = "BlogGridWithInfinityScroll";
