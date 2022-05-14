import { Box, BoxProps, forwardRef } from "@chakra-ui/react";

export const Hover = forwardRef<BoxProps, "div">(
  ({ children, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        transition="transform 0.2s"
        transformOrigin="center"
        position="relative"
        sx={{
          "&:hover": {
            transform: "scale(1.2, 1.2)",
            zIndex: 10,
          },
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
