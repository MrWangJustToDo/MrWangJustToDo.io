import {
  Avatar,
  AvatarProps,
  Flex,
  FlexProps,
  forwardRef,
  Text,
} from "@chakra-ui/react";
import { momentTo } from "utils/time";

interface ActorProps extends Omit<FlexProps, "children"> {
  avatarUrl: string;
  login?: string;
  time: string;
  avatarProps?: Omit<AvatarProps, "avatarUrl">;
}

export const Actor = forwardRef<ActorProps, "div">(
  ({ avatarUrl, login, time, avatarProps, ...resProps }, ref) => {
    return (
      <Flex {...resProps}>
        <Avatar
          src={avatarUrl}
          title={login}
          name={login}
          size="sm"
          {...avatarProps}
        />
        <Text fontSize="small" color="lightTextColor" marginLeft="2">
          {momentTo(time)}
        </Text>
      </Flex>
    );
  }
);
