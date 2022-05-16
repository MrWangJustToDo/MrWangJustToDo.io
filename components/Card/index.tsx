import { forwardRef, Flex, Divider } from "@chakra-ui/react";
import { Box, BoxProps } from "components/Box";
import {
  DISABLE_DRAG_HANDLER_SELECTOR,
  DRAG_HANDLER_SELECTOR,
} from "config/gridLayout";

export const Card = forwardRef<BoxProps, "div">(
  ({ children, className, ...boxProps }, ref) => {
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
          width="100%"
          overflow="hidden"
          height="calc(100% - var(--chakra-space-9))"
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
