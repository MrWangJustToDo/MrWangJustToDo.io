import { forwardRef } from "@chakra-ui/react";
import { Box, BoxProps } from "components/Box";

export const Card = forwardRef<BoxProps, "div">(
  ({ children, ...boxProps }, ref) => {
    return (
      <Box
        ref={ref}
        border="1px"
        boxShadow="md"
        borderRadius="md"
        borderColor="cardBorderColor"
        backgroundColor="cardBackgroundColor"
        {...boxProps}
      >
        {children}
      </Box>
    );
  }
);
