import {
  Tooltip,
  Box,
  Text,
  Flex,
  Avatar,
  Icon,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { Hover } from "components/Hover";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";

type FollowerProps = {
  id: string;
  name: string;
  email?: string;
  isFirst: boolean;
  bioHTML?: string;
  avatarUrl: string;
};

export const Follower = ({
  isFirst,
  name,
  email,
  avatarUrl,
  bioHTML,
}: FollowerProps) => {
  return (
    <Hover>
      <Tooltip
        label={
          <VStack
            divider={<StackDivider />}
            alignItems="flex-start"
            spacing="1"
          >
            <Flex alignItems="center">
              <Icon as={AiOutlineUser} />
              <Text fontWeight="semibold" marginLeft="1">
                {name}
              </Text>
            </Flex>
            {email && (
              <Flex alignItems="center">
                <Icon as={AiOutlineMail} />
                <Text marginLeft="1">{email}</Text>
              </Flex>
            )}
            {bioHTML && <Box dangerouslySetInnerHTML={{ __html: bioHTML }} />}
          </VStack>
        }
        borderRadius="4"
        placement="right"
        boxShadow="md"
        offset={[0, 8]}
        hasArrow
      >
        <Avatar
          src={avatarUrl}
          border="4px solid white"
          boxShadow="md"
          marginTop={!isFirst ? "-3" : "0"}
        />
      </Tooltip>
    </Hover>
  );
};
