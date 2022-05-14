import { useQuery } from "@apollo/client";
import { EmailIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { GetViewerDocument } from "graphql/generated";
import React from "react";

export const User = () => {
  const { data, loading, error } = useQuery(GetViewerDocument, {
    variables: {
      first: 10,
    },
  });

  const open = useToast();

  if (loading) return <Spinner />;

  if (error) {
    open({
      title: "Get Error",
      description: error.message,
      status: "error",
    });
    return <React.Fragment />;
  }

  return (
    <Flex flexDirection="column" padding="3">
      <Box padding="2">
        <Avatar name={data.viewer.name} src={data.viewer.avatarUrl} size="2xl">
          <AvatarBadge bg="green.500" boxSize="0.8em" />
        </Avatar>
      </Box>
      <Divider marginY="2" />
      <Text fontWeight="semibold">{data.viewer.login}</Text>
      <Flex alignItems="center" marginTop="1">
        <EmailIcon color="gray.600" />
        <Text fontSize="small" color="gray.600" marginLeft="2">
          {data.viewer.email}
        </Text>
      </Flex>
      <Divider marginY="2" />
      <Flex justifyContent="space-between">
        <Flex flexDirection="column" alignItems="center">
          <Text textTransform="capitalize" fontSize="sm" marginBottom="2">
            top flowers
          </Text>
          {data.viewer.followers.nodes.map(
            ({ login, name, avatarUrl, id }, index) => {
              return (
                <Avatar
                  key={id}
                  name={name || login}
                  src={avatarUrl}
                  border="2px solid white"
                  marginTop={index !== 0 ? "-1.5" : "0"}
                />
              );
            }
          )}
        </Flex>
        <Box borderLeft="1px" borderColor="gray.100" />
        <Flex flexDirection="column" alignItems="center">
          <Text textTransform="capitalize" fontSize="sm" marginBottom="2">
            top following
          </Text>
          {data.viewer.following.nodes.map(
            ({ login, name, avatarUrl, id }, index) => {
              return (
                <Avatar
                  key={id}
                  name={name || login}
                  src={avatarUrl}
                  border="2px solid white"
                  marginTop={index !== 0 ? "-1.5" : "0"}
                />
              );
            }
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
