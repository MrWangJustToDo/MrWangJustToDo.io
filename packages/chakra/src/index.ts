import { semanticTokens } from "./semanticTokens";
import { styles } from "./styles";

import type { ChakraTheme } from "@chakra-ui/react";

export const theme: Partial<ChakraTheme> = {
  styles,
  semanticTokens,
  breakpoints: { "2xl": "1200px", xl: "996px", lg: "768px", md: "480px", sm: "320px", base: "0px" },
  fonts: {
    heading: "Outfit, myFont",
    body: "Outfit, myFont",
    mono: "Outfit, myFont",
  },
};
