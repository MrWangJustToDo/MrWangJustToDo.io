import { EmailIcon } from "@chakra-ui/icons";
import { Tooltip, Box, Text, Divider, Flex, Avatar } from "@chakra-ui/react";
import { Hover } from "components/Hover";

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
          <Box>
            <Text as="h4" fontWeight="semibold">
              {name}
            </Text>
            {email && (
              <>
                <Divider />
                <Flex alignItems="center">
                  <EmailIcon /> <Text marginLeft="1">{email}</Text>
                </Flex>
              </>
            )}
            {bioHTML && (
              <>
                <Divider />
                <Box dangerouslySetInnerHTML={{ __html: bioHTML }} />
              </>
            )}
          </Box>
        }
        backgroundColor="gray.700"
        borderRadius="4"
        placement="right"
        offset={[0, 8]}
        hasArrow
      >
        <Avatar
          src={avatarUrl}
          border="2px solid white"
          marginTop={!isFirst ? "-1.5" : "0"}
        />
      </Tooltip>
    </Hover>
  );
};
