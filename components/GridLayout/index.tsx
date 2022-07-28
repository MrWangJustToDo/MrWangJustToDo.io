import { styled } from "@chakra-ui/react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ReactGridLayout = WidthProvider(Responsive);

export const StyledReactGridLayout = styled(ReactGridLayout);
