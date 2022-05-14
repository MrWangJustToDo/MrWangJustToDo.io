import { Box } from "@chakra-ui/react";

export const Hover = ({ children }) => {
  return (
    <Box
      transition="transform 0.2s"
      transformOrigin="center"
      position="relative"
      sx={{
        "&:hover": {
          transform: "scale(1.2, 1.2)",
          zIndex: 10,
        },
      }}
    >
      {children}
    </Box>
  );
};
