import { Container } from "@chakra-ui/react";
import { StyledReactGridLayout } from "components/GridLayout";
import { User } from "containers/User";
import { BlogList } from "containers/BlogList";
import {
  DISABLE_DRAG_HANDLER_SELECTOR,
  DRAG_HANDLER_SELECTOR,
  GRID_ROW_HEIGHT,
} from "config/gridLayout";
import { CONTAINER_WIDTH } from "config/container";
import { GridCard } from "components/GridCard";

const GRID_COLS = { lg: 12, md: 12, sm: 12, xs: 2, xxs: 2 };
const GRID_LAYOUTS = {
  lg: [
    { i: "a", x: 0, y: 0, w: 2, h: 30, minW: 2, maxW: 4, minH: 25 },
    {
      i: "b",
      x: 2,
      y: 0,
      w: 10,
      h: 50,
      minW: 6,
      minH: 50,
    },
  ],
  md: [
    { i: "a", x: 0, y: 0, w: 2, h: 30, minW: 2, maxW: 4, minH: 20 },
    {
      i: "b",
      x: 2,
      y: 0,
      w: 10,
      h: 40,
      minW: 6,
      minH: 40,
    },
  ],
  sm: [
    { i: "a", x: 0, y: 0, w: 2, h: 30, minW: 2, maxW: 4, minH: 15 },
    {
      i: "b",
      x: 2,
      y: 0,
      w: 10,
      h: 40,
      minW: 6,
      minH: 40,
    },
  ],
  xs: [
    { i: "a", x: 0, y: 0, w: 2, h: 20, minW: 1, minH: 10 },
    { i: "b", x: 2, y: 0, w: 2, h: 30, minW: 2, minH: 30 },
  ],
  xxs: [
    { i: "a", x: 0, y: 0, w: 2, h: 10, minW: 2, minH: 10 },
    { i: "b", x: 2, y: 0, w: 2, h: 30, minW: 2, minH: 30 },
  ],
};

export default function Home() {
  return (
    <Container maxWidth={CONTAINER_WIDTH}>
      <StyledReactGridLayout
        className="layout"
        cols={GRID_COLS}
        layouts={GRID_LAYOUTS}
        rowHeight={GRID_ROW_HEIGHT}
        draggableHandle={`.${DRAG_HANDLER_SELECTOR}`}
        draggableCancel={`.${DISABLE_DRAG_HANDLER_SELECTOR}`}
      >
        <GridCard key="a">
          <User />
        </GridCard>
        <GridCard key="b">
          <BlogList />
        </GridCard>
      </StyledReactGridLayout>
    </Container>
  );
}
