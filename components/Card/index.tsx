import { forwardRef } from "@chakra-ui/react";
import { Box, BoxProps } from "components/Box";

export const Card = forwardRef<BoxProps, "div">(
  ({ children, ...boxProps }, ref) => {
    return (
      <Box
        borderRadius="md"
        border="1px"
        borderColor="gray.200"
        padding="2"
        ref={ref}
        backgroundColor="white"
        boxShadow="md"
        position="relative"
        zIndex="modal"
        {...boxProps}
      >
        {children}
      </Box>
    );
  }
);
