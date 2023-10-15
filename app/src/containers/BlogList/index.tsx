import { NetworkStatus, useQuery } from "@apollo/client";
import { GetBlogListDocument, IssueOrderField, OrderDirection } from "@blog/graphql";
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
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { throttle } from "lodash-es";
import { memo, useEffect, useMemo, useRef } from "react";
import { BsCheck } from "react-icons/bs";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { BlogGrid } from "@app/components/BlogGrid";
import { ErrorCom } from "@app/components/Error";
import { GridLayoutButton } from "@app/components/GridLayoutButton";
import { useBlogSource } from "@app/hooks/useBlogSource";
import { useCollapse } from "@app/hooks/useCollapse";
import { useFullScreen } from "@app/hooks/useFullScreen";
import { useGetListParams } from "@app/hooks/useGetListParams";
import { useGridLayout } from "@app/hooks/useGridLayout";
import { useLeetCode } from "@app/hooks/useLeetCode";
import { usePlayGround } from "@app/hooks/usePlayGround";
import { useDomSize } from "@app/hooks/useSize";

import { BlogModal } from "../BlogModal";
import { LeetCode } from "../LeetCode";
import { Pagination } from "../Pagination";
import { PlayGround } from "../PlayGround";

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
  const { onOpen } = usePlayGround();

  const { onOpen: onOpenLeetCode } = useLeetCode();

  const { state: collapse, toggle } = useCollapse();

  const ref = useRef<HTMLDivElement>();

  const { width } = useDomSize({ ref });

  const { sources, setSource, sourceName } = useBlogSource();

  return (
    <ButtonGroup position="fixed" bottom="4" right="4" className="tour_buttons" variant="solid">
      <IconButton icon={collapse ? <FaChevronLeft /> : <FaChevronRight />} aria-label="collapse" onClick={toggle} size={{ base: "sm", lg: "md" }} />
      <Box transitionProperty="width" transitionDuration="0.3s" width={collapse ? "0px" : width} overflow="hidden">
        <ButtonGroup ref={ref}>
          <Button colorScheme="facebook" textTransform="capitalize" onClick={() => props.onRefresh()} size={{ base: "sm", lg: "md" }}>
            refresh
          </Button>
          <Button colorScheme="facebook" textTransform="capitalize" onClick={onOpen} size={{ base: "sm", lg: "md" }}>
            playGround
          </Button>
          <Button
            colorScheme="facebook"
            textTransform="capitalize"
            onClick={onOpenLeetCode}
            display={{ base: "none", lg: "block" }}
            size={{ base: "sm", lg: "md" }}
          >
            leetCode
          </Button>
          <GridLayoutButton />
          <Box>
            <Menu>
              <MenuButton
                colorScheme="facebook"
                textTransform="capitalize"
                as={Button}
                minWidth="14em"
                title="Change source"
                rightIcon={<Icon as={FaChevronDown} fontSize="small" />}
                size={{ base: "sm", lg: "md" }}
              >
                {sourceName}
              </MenuButton>
              <MenuList>
                {sources.map((item) => (
                  <MenuItem key={item.name} onClick={() => setSource(item.name)} justifyContent="space-between">
                    {item.name} {item.name === sourceName && <Icon as={BsCheck} fontSize="lg" />}
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

const _BlogList = () => {
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
        <BlogGrid data={data.repository.issues.nodes} disableGridLayout={false} />
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
  const disableGridLayout = useGridLayout((s) => s.state);

  const state = useFullScreen((s) => s.state);

  const isMobileWidth = useBreakpointValue({ base: true, md: false });

  const source = useBlogSource((s) => s.source);

  const { data, loading, error, fetchMore, refetch, networkStatus } = useQuery(GetBlogListDocument, {
    variables: {
      ...BASIC_VARIABLE,
      name: source?.repository,
      owner: source?.owner,
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
      window.addEventListener("scroll", onThrottleScroll);
      return () => window.removeEventListener("scroll", onThrottleScroll);
    }
  }, [onThrottleScroll, state]);

  if (loading && networkStatus !== NetworkStatus.fetchMore) return <BlogListLoading />;

  if (error)
    return (
      <>
        <ErrorCom error={error} />
        <Portal>
          <BlogListButton onRefresh={() => refetch()} />
        </Portal>
        <PlayGround />
        <LeetCode />
      </>
    );

  return (
    <Flex flexDirection="column" height="100%">
      <Box overflow="auto" paddingRight="4" onScroll={onThrottleScroll} className="tour_blogList">
        <BlogGrid data={data.repository.issues.nodes} disableGridLayout={disableGridLayout || isMobileWidth} />
        {loading && data.repository.issues.nodes.length && (
          <Center height="60px">
            <Spinner />
          </Center>
        )}
      </Box>
      <Portal>
        <BlogListButton onRefresh={() => refetch()} />
      </Portal>
      <BlogModal />
      <PlayGround />
      <LeetCode />
    </Flex>
  );
};

export const BlogList = memo(_BlogList);

export const BlogGridWithInfinityScroll = memo(_BlogListWithInfinityScroll);
