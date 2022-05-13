import {
  As,
  Box as OriginalBox,
  BoxProps as OriginalBoxProps,
  shouldForwardProp,
  styled,
} from "@chakra-ui/react";
import { Layout } from "react-grid-layout";

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
