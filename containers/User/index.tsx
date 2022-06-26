import { useQuery } from "@apollo/client";
import { AiOutlineGithub, AiOutlineMail } from "react-icons/ai";
import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Icon,
  Link,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { Chart } from "components/Chart";
import { Followers } from "components/Follower";
import { GetViewerDocument } from "graphql/generated";
import React, { memo } from "react";
import { momentTo } from "utils/time";
import { ErrorCom } from "components/Error";

const ITEM_FOLLOWER = 10;

const UserLoading = () => (
  <Box padding="3">
    <SkeletonCircle />
    <Skeleton marginY="2" />
    <SkeletonText noOfLines={6} marginY="2" />
  </Box>
);

const _User = () => {
  const { data, loading, error } = useQuery(GetViewerDocument, {
    variables: {
      first: ITEM_FOLLOWER,
    },
  });

  if (loading) return <UserLoading />;

  if (error) return <ErrorCom error={error} />;

  return (
    <Flex flexDirection="column" padding="3" height="100%">
      <Box padding="2">
        <Avatar name={data.viewer.name} src={data.viewer.avatarUrl} size="xl">
          <AvatarBadge bg="green.500" boxSize="0.8em" />
        </Avatar>
      </Box>
      <Chart marginY="2" />
      <Divider marginY="2" />
      <Icon as={AiOutlineGithub} fontSize="xl" />
      <Text fontWeight="semibold">{data.viewer.login}</Text>
      <Box fontSize="sm" marginY="2">
        <Text fontWeight="semibold">Recommend:</Text>
        <Link
          target="_blank"
          color="red.400"
          href="https://github.com/MrWangJustToDo/MyReact"
          title="https://github.com/MrWangJustToDo/MyReact"
        >
          MyReact & MyReact-SSR
        </Link>
      </Box>
      <Flex alignItems="center" marginTop="1" color="lightTextColor">
        <Icon as={AiOutlineMail} />
        <Text fontSize="small" marginLeft="2">
          {data.viewer.email}
        </Text>
      </Flex>
      <Text fontSize="x-small" marginY="1">
        {momentTo(data.viewer.createdAt)}
      </Text>
      <Divider marginY="2" />
      <Flex overflow="auto" flexDirection="column">
        <Flex justifyContent="space-between" marginBottom="2">
          <Flex flexDirection="column" alignItems="center">
            <Flex alignItems="center" marginBottom="3">
              <Text textTransform="capitalize" fontSize="sm">
                followers :
              </Text>
            </Flex>
            <Followers data={data.viewer.followers.nodes} />
          </Flex>
          <Flex flexDirection="column" alignItems="center">
            <Flex alignItems="center" marginBottom="3">
              <Text textTransform="capitalize" fontSize="sm">
                following :
              </Text>
            </Flex>
            <Followers data={data.viewer.following.nodes} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const User = memo(_User);
