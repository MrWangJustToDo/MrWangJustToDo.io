import { semanticTokens } from "./semanticTokens";
import { styles } from "./styles";

import type { ChakraTheme } from "@chakra-ui/react";

export const theme: Partial<ChakraTheme> = {
  styles,
  semanticTokens,
};
