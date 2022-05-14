import { Container } from "@chakra-ui/react";
import { Card } from "components/Card";
import { StyledReactGridLayout } from "components/GridLayout";
import { Header } from "components/Header";
import { User } from "containers/User";
import { BlogList } from "containers/BlogList";
import { useGridHeight } from "hooks/useGridHeight";
import {
  DISABLE_DRAG_HANDLER_SELECTOR,
  DRAG_HANDLER_SELECTOR,
  GRID_ROW_HEIGHT,
} from "config/gridLayout";

const CONTAINER_WIDTH = 1580;
const GRID_COLS = 12;

export default function Home() {
  const h = useGridHeight();
  return (
    <Container maxWidth={CONTAINER_WIDTH}>
      <Header />
      <StyledReactGridLayout
        className="layout"
        cols={GRID_COLS}
        rowHeight={GRID_ROW_HEIGHT}
        draggableHandle={`.${DRAG_HANDLER_SELECTOR}`}
        draggableCancel={`.${DISABLE_DRAG_HANDLER_SELECTOR}`}
      >
        <Card
          key={`a-${h}`}
          data-grid={{
            x: 0,
            y: 0,
            w: 2,
            h,
            minW: 2,
            minH: h / 2,
          }}
        >
          <User />
        </Card>
        <Card
          key={`b-${h}`}
          data-grid={{ x: 3, y: 0, w: 10, h, minH: h, minW: 5 }}
          disableOverflow
        >
          <BlogList />
        </Card>
      </StyledReactGridLayout>
    </Container>
  );
}
