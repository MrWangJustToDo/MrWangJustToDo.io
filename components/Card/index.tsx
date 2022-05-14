import { forwardRef } from "@chakra-ui/react";
import { Box, BoxProps } from "components/Box";

export const Card = forwardRef<BoxProps, "div">(
  ({ children, ...boxProps }, ref) => (
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
      <Box
        overflow="auto"
        width="100%"
        height="100%"
        sx={{
          scrollbarWidth: "none",
          scrollbarColor: "transparent",
        }}
      >
        {children}
      </Box>
    </Box>
  )
);
