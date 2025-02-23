import { GridCard } from "@app/components/GridCard";
import { StyledResponsiveReactGridLayout } from "@app/components/GridLayout";
import { DISABLE_DRAG_HANDLER_SELECTOR, DRAG_HANDLER_SELECTOR, ENABLE_INFINITY_SCROLL, GRID_ROW_HEIGHT } from "@app/config/gridLayout";
import { BlogGridWithInfinityScroll, BlogList } from "@app/containers/BlogList";
import { User } from "@app/containers/User";
import { useFullScreen } from "@app/hooks/useFullScreen";
import { useMainCard } from "@app/hooks/useMainCard";

const GRID_COLS = { lg: 12, md: 12, sm: 12, xs: 2, xxs: 2 };
const GRID_LAYOUTS = {
  lg: [
    { i: "a", x: 0, y: 0, w: 3, h: 50, minW: 2, maxW: 5, minH: 25 },
    {
      i: "b",
      x: 3,
      y: 0,
      w: 9,
      h: 50,
      minW: 4,
      minH: 50,
    },
  ],
  md: [
    { i: "a", x: 0, y: 0, w: 4, h: 40, minW: 2, maxW: 6, minH: 20 },
    {
      i: "b",
      x: 4,
      y: 0,
      w: 8,
      h: 40,
      minW: 4,
      minH: 40,
    },
  ],
  sm: [
    { i: "a", x: 0, y: 0, w: 5, h: 40, minW: 2, maxW: 8, minH: 15 },
    {
      i: "b",
      x: 5,
      y: 0,
      w: 7,
      h: 40,
      minW: 6,
      minH: 40,
    },
  ],
  xs: [
    { i: "a", x: 0, y: 0, w: 2, h: 30, minW: 1, minH: 10, static: true },
    { i: "b", x: 2, y: 0, w: 2, h: 30, minW: 2, minH: 30, static: true },
  ],
  xxs: [
    { i: "a", x: 0, y: 0, w: 2, h: 20, minW: 2, minH: 10, static: true },
    { i: "b", x: 2, y: 0, w: 2, h: 30, minW: 2, minH: 30, static: true },
  ],
};

const { onDragStart, onDragEnd } = useMainCard.getActions();

export const Home = ({ isMobileWidth }: { isMobileWidth: boolean }) => {
  const state = useFullScreen((state) => state.state);

  const drag = useMainCard((s) => s.drag);

  const Ele = ENABLE_INFINITY_SCROLL ? <BlogGridWithInfinityScroll isMobileWidth={isMobileWidth} /> : <BlogList />;

  return !state ? (
    <StyledResponsiveReactGridLayout
      className="layout"
      cols={GRID_COLS}
      layouts={GRID_LAYOUTS}
      rowHeight={GRID_ROW_HEIGHT}
      draggableHandle={`.${DRAG_HANDLER_SELECTOR}`}
      draggableCancel={`.${DISABLE_DRAG_HANDLER_SELECTOR}`}
      onDragStart={onDragStart}
      onDragStop={onDragEnd}
    >
      <GridCard key="a" contentProps={{ overflow: "auto" }}>
        <User />
      </GridCard>
      <GridCard key="b" className="grid-card-list" enableBlur={drag}>
        {Ele}
      </GridCard>
    </StyledResponsiveReactGridLayout>
  ) : (
    Ele
  );
};
