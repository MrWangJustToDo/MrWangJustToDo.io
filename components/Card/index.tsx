import { forwardRef, Flex, Divider } from "@chakra-ui/react";
import { Box, BoxProps } from "components/Box";
import {
  DISABLE_DRAG_HANDLER_SELECTOR,
  DRAG_HANDLER_SELECTOR,
} from "config/gridLayout";

interface CardProps extends BoxProps {
  disableOverflow?: boolean;
}

export const Card = forwardRef<CardProps, "div">(
  ({ children, disableOverflow, className, ...boxProps }, ref) => {
    return (
      <Box
        ref={ref}
        border="1px"
        boxShadow="md"
        borderRadius="md"
        borderColor="cardBorderColor"
        backgroundColor="cardBackgroundColor"
        {...boxProps}
        className={`${DRAG_HANDLER_SELECTOR} ${className ? className : ""}`}
      >
        <Flex justifyContent="center" cursor="move">
          <Box
            as="span"
            width="8"
            height="1"
            backgroundColor="gray.300"
            borderRadius="full"
            marginY="2"
          />
        </Flex>
        <Divider marginBottom="2" />
        <Box
          overflow={disableOverflow ? "initial" : "auto"}
          width="100%"
          height="calc(100% - var(--chakra-space-9))"
          paddingLeft="2"
          paddingRight={disableOverflow ? "2" : "4"}
          sx={{
            scrollbarWidth: "none",
            scrollbarColor: "transparent",
          }}
          className={DISABLE_DRAG_HANDLER_SELECTOR}
        >
          {children}
        </Box>
      </Box>
    );
  }
);
