import { Container, useTheme } from "@chakra-ui/react";
import { Card } from "components/Card";
import { StyledReactGridLayout } from "components/GridLayout";
import { Header } from "components/Header";
import { User } from "containers/User";
import { BlogList } from "containers/BlogList";
import {
  DISABLE_DRAG_HANDLER_SELECTOR,
  DRAG_HANDLER_SELECTOR,
  GRID_ROW_HEIGHT,
} from "config/gridLayout";

const CONTAINER_WIDTH = 1580;
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
    { i: "a", x: 0, y: 0, w: 2, h: 20, minW: 1 },
    { i: "b", x: 2, y: 0, w: 2, h: 30, minW: 2 },
  ],
  xxs: [
    { i: "a", x: 0, y: 0, w: 2, h: 10, minW: 1 },
    { i: "b", x: 2, y: 0, w: 2, h: 30, minW: 2 },
  ],
};

export default function Home() {
  return (
    <Container maxWidth={CONTAINER_WIDTH}>
      <Header />
      <StyledReactGridLayout
        className="layout"
        cols={GRID_COLS}
        layouts={GRID_LAYOUTS}
        rowHeight={GRID_ROW_HEIGHT}
        draggableHandle={`.${DRAG_HANDLER_SELECTOR}`}
        draggableCancel={`.${DISABLE_DRAG_HANDLER_SELECTOR}`}
      >
        <Card key="a">
          <User />
        </Card>
        <Card key="b" disableOverflow>
          <BlogList />
        </Card>
      </StyledReactGridLayout>
    </Container>
  );
}
