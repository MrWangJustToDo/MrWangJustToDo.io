import {
  Box as OriginalBox,
  shouldForwardProp,
  styled,
} from "@chakra-ui/react";

import type {
  As,
  BoxProps as OriginalBoxProps} from "@chakra-ui/react";
import type { Layout } from "react-grid-layout";

export interface BoxProps extends OriginalBoxProps {
  ["data-grid"]?: Partial<Layout>;
}

export const Box = styled<As, BoxProps>(OriginalBox, {
  shouldForwardProp: (propsName) => {
    // used for gird-layout
    if (propsName === "data-grid") return false;
    return shouldForwardProp(propsName.toString());
  },
});
