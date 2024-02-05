import type { ChakraTheme } from "@chakra-ui/react";

export const styles: ChakraTheme["styles"] = {
  global: {
    body: {
      fontFamily: `JetBrains Mono, monospace`,
      backgroundColor: "siteBackgroundColor",
    },
    "code, kbd, samp, pre": {
      fontFamily: "JetBrains Mono, monospace",
    }
  },
};
