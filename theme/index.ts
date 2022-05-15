import { extendTheme } from "@chakra-ui/react";
import { breakpoint } from "./breakpoint";
import { semanticTokens } from "./color";

export const theme = extendTheme({
  semanticTokens,
  breakpoint,
});
