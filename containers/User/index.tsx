import { useQuery } from "@apollo/client";
import { EmailIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Divider,
  Flex,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Chart } from "components/Chart";
import { Followers } from "components/Follower";
import { GetViewerDocument } from "graphql/generated";
import React, { memo } from "react";
import { calendar } from "utils/time";

const ITEM_FOLLOWER = 10;

const _User = () => {
  const open = useToast();

  const { data, loading, error } = useQuery(GetViewerDocument, {
    variables: {
      first: ITEM_FOLLOWER,
    },
  });

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    open({
      title: "Get Author Error",
      description: error.message,
      status: "error",
    });
    return <React.Fragment />;
  }

  return (
    <Flex flexDirection="column" padding="3">
      <Box padding="2">
        <Avatar name={data.viewer.name} src={data.viewer.avatarUrl} size="xl">
          <AvatarBadge bg="green.500" boxSize="0.8em" />
        </Avatar>
        <Chart marginTop="2" marginLeft="-2.5" marginRight="-2.5" />
      </Box>
      <Divider marginY="2" />
      <Text fontWeight="semibold">{data.viewer.login}</Text>
      <Flex alignItems="center" marginTop="1">
        <EmailIcon color="gray.600" />
        <Text fontSize="small" color="gray.600" marginLeft="2">
          {data.viewer.email}
        </Text>
      </Flex>
      <Text fontSize="x-small">Join At: {calendar(data.viewer.createdAt)}</Text>
      <Divider marginY="2" />
      <Flex justifyContent="space-between">
        <Flex flexDirection="column" alignItems="center">
          <Text textTransform="capitalize" fontSize="sm" marginBottom="2">
            top flowers
          </Text>
          <Followers data={data.viewer.followers.nodes} />
        </Flex>
        <Box borderLeft="1px" borderColor="gray.100" />
        <Flex flexDirection="column" alignItems="center">
          <Text textTransform="capitalize" fontSize="sm" marginBottom="2">
            top following
          </Text>
          <Followers data={data.viewer.following.nodes} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export const User = memo(_User);
