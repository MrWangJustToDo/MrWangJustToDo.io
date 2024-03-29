import { useQuery } from "@apollo/client";
import { GetViewerDocument } from "@blog/graphql";
import {
  Avatar,
  AvatarBadge,
  Box,
  // Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { AiOutlineGithub, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { SiLeetcode } from "react-icons/si";

import { AboutMe } from "@app/components/AboutMe";
import { Chart } from "@app/components/Chart";
import { ErrorCom } from "@app/components/Error";
import { Followers } from "@app/components/Follower";
import { Project } from "@app/components/Project";
import { Recommend } from "@app/components/Recommend";
import { momentTo } from "@app/utils/time";

const ITEM_FOLLOWER = 15;

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
    <Flex flexDirection="column" padding="3" height={{ md: "100%" }} className="tour_about">
      <Flex padding="2" alignItems="flex-end">
        <Avatar name={data.viewer.name} src={data.viewer.avatarUrl} size="xl">
          <AvatarBadge bg="green.500" boxSize="0.8em" />
        </Avatar>
      </Flex>
      <Chart marginY="2" className="tour_commit" />
      <Divider marginY="2" />
      <HStack divider={<StackDivider />} spacing="2">
        <IconButton
          as="a"
          color="gray"
          variant="outline"
          aria-label="github"
          href="https://github.com/MrWangJustToDo/"
          icon={<Icon as={AiOutlineGithub} fontSize="xl" />}
        />
        <IconButton
          as="a"
          color="gray"
          variant="outline"
          aria-label="leetcode"
          href="https://leetcode.com/MrWangSay/"
          icon={<Icon as={SiLeetcode} fontSize="xl" />}
        />
        <AboutMe />
        <Project />
      </HStack>
      <Box fontSize="sm" marginY="2">
        <Text fontWeight="semibold">Recommend:</Text>
        <Recommend />
      </Box>
      <Flex alignItems="center" marginTop="1">
        <Icon as={AiOutlineUser} />
        <Text fontSize="small" marginLeft="2">
          {data.viewer.login}
        </Text>
      </Flex>
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
      <Flex overflow={{ md: "auto" }} flexDirection="column">
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
