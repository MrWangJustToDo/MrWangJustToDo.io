import { useQuery } from "@apollo/client";
import { GetViewerDocument } from "@blog/graphql";
import {
  Avatar,
  AvatarBadge,
  Box,
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
import { HomeIcon as GoHome, BotIcon as GoHubot, MailIcon as GoMail } from "lucide-react";
import React, { memo } from "react";

import { AboutMe } from "@app/components/AboutMe";
import { Calendar } from "@app/components/Calendar";
import { Chart } from "@app/components/Chart";
import { Commit } from "@app/components/Commit";
import { ErrorCom } from "@app/components/Error";
import { Followers } from "@app/components/Follower";
import { GitHubCompare } from "@app/components/GitHubCompare";
import { LeetCode } from "@app/components/LeetCode";
import { PlayGround } from "@app/components/PlayGround";
import { Project } from "@app/components/Project";
import { Recommend } from "@app/components/Recommend";
import { useIsMobile } from "@app/hooks/useIsMobile";
import { dayjs, momentTo } from "@app/utils/time";

const ITEM_FOLLOWER = 15;

const UserLoading = () => (
  <Box padding="3">
    <SkeletonCircle />
    <Skeleton marginY="2" />
    <SkeletonText noOfLines={6} marginY="2" />
  </Box>
);

const from = dayjs().subtract(4, "day").toISOString();
const to = dayjs().toISOString();

const _User = memo(() => {
  const { data, loading, error } = useQuery(GetViewerDocument, {
    variables: {
      first: ITEM_FOLLOWER,
      from,
      to,
    },
  });

  const isMobile = useIsMobile();

  if (loading) return <UserLoading />;

  if (error) return <ErrorCom error={error} />;

  const commit: Array<{ repo: string; commit: number }> = [];

  data.viewer.contributionsCollection.commitContributionsByRepository.forEach((i) => {
    const validCommit = i.contributions.nodes?.filter((_i) => dayjs(_i.occurredAt).isAfter(dayjs(to).subtract(1, "day")));
    validCommit?.forEach((i) => {
      commit.push({ repo: i.repository.name, commit: i.commitCount });
    });
  });

  return (
    <Flex flexDirection="column" padding="3" height={{ md: "100%" }} className="tour_about">
      <Flex paddingY="2" justifyContent="space-between" alignItems="center">
        <Avatar name={data.viewer.name} src={data.viewer.avatarUrl} size="xl" boxShadow="md">
          <AvatarBadge bg="green.500" boxSize="0.8em" />
        </Avatar>
        <Commit data={commit} />
      </Flex>
      <Chart marginY="2" className="tour_commit" />
      <Divider marginY="2" />
      <HStack divider={<StackDivider />} spacing="2" rowGap="2" wrap="wrap">
        <IconButton
          as="a"
          color="gray"
          variant="outline"
          size="sm"
          target="_blank"
          aria-label="github"
          href="https://github.com/MrWangJustToDo/"
          icon={<Icon as={GoHome} fontSize="xl" />}
        />
        <LeetCode />
        <PlayGround />
        {!isMobile && <GitHubCompare />}
        <AboutMe />
        <Project />
        {!isMobile && <Calendar />}
      </HStack>
      <Box fontSize="sm" marginY="2">
        <Text fontWeight="semibold">Recommend:</Text>
        <Recommend />
      </Box>
      <Flex alignItems="center" marginTop="1">
        <Icon as={GoHubot} />
        <Text fontSize="small" marginLeft="2">
          {data.viewer.login}
        </Text>
      </Flex>
      <Flex alignItems="center" marginTop="1" color="lightTextColor">
        <Icon as={GoMail} />
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
});

_User.displayName = "_User";

export const User = _User;
