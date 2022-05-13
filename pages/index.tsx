import { Container } from "@chakra-ui/react";
import { Card } from "components/Card";
import { StyledReactGridLayout } from "components/GridLayout";
import { Header } from "components/Header";
import { User } from "containers/User";
import { useGridHeight } from "hooks/useGridHeight";

const CONTAINER_WIDTH = 1580;
const GRID_COLS = 12;
const ROW_HEIGHT = 10;

export default function Home() {
  const h = useGridHeight();
  return (
    <Container maxWidth={CONTAINER_WIDTH}>
      <Header />
      <StyledReactGridLayout
        className="layout"
        cols={GRID_COLS}
        rowHeight={ROW_HEIGHT}
      >
        <Card
          key={`a-${h}`}
          data-grid={{ x: 0, y: 2, w: 3, minH: 10, h, isBounded: true }}
        >
          <User />
        </Card>
        <Card
          key={`b-${h}`}
          data-grid={{ x: 3, y: 2, w: 9, minH: 10, h, isBounded: true }}
        ></Card>
      </StyledReactGridLayout>
    </Container>
  );
}
