import { Box, BoxProps, forwardRef } from "@chakra-ui/react";

export const Hover = forwardRef<BoxProps, "div">(
  ({ children, transform, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        transition="transform 0.2s"
        transformOrigin="center"
        position="relative"
        sx={{
          "&:hover": {
            transform: `scale(1.2, 1.2) ${transform ? transform : ""}`,
            zIndex: 10,
          },
        }}
        transform={transform}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
