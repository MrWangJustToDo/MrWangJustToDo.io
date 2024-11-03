import type { ChakraTheme } from "@chakra-ui/react";

export const semanticTokens: ChakraTheme["semanticTokens"] = {
  colors: {
    mobileCardBackgroundColor: {
      default: "white",
      _dark: "gray.700",
    },
    cardBackgroundColor: {
      default: "rgba(245, 245, 245, 0.95)",
      _dark: "rgba(45, 60, 80, 0.7)",
    },
    mobileModalColor: {
      default: "rgb(242, 244, 242)",
      _dark: "gray.700",
    },
    simpleCardBackgroundColor: {
      default: "rgb(240, 240, 240)",
      _dark: "gray.600",
    },
    cardBorderColor: {
      default: "gray.200",
      _dark: "gray.600",
    },
    lightTextColor: {
      default: "gray.600",
      _dark: "gray.400",
    },
    siteBackgroundColor: {
      default: "white",
      _dark: "black",
    },
  },
};
