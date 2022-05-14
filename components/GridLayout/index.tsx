import { WidthProvider, Responsive } from "react-grid-layout";
import { styled } from "@chakra-ui/react";

const ReactGridLayout = WidthProvider(Responsive);

export const StyledReactGridLayout = styled(ReactGridLayout);
