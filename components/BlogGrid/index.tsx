import { memo } from "react";
import { Card } from "components/Card";
import { StyledReactGridLayout } from "components/GridLayout";
import { useGetResponseList } from "hooks/useGetResponseList";
import { GetBlogListQuery } from "graphql/generated";
import { Item } from "./Item";
import {
  DISABLE_DRAG_HANDLER_SELECTOR,
  DRAG_HANDLER_SELECTOR,
  GRID_ROW_HEIGHT,
} from "config/gridLayout";

const BLOG_GRID_COLS = { lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 };

const _BlogGrid = ({
  data,
}: {
  data: GetBlogListQuery["repository"]["issues"]["nodes"];
}) => {
  const layouts = useGetResponseList(data);
  return (
    <StyledReactGridLayout
      className="layout"
      cols={BLOG_GRID_COLS}
      layouts={layouts}
      rowHeight={GRID_ROW_HEIGHT}
      draggableHandle={`.${DRAG_HANDLER_SELECTOR}`}
      draggableCancel={`.${DISABLE_DRAG_HANDLER_SELECTOR}`}
    >
      {data.map((p, index) => {
        console.log(p)
        return (
          <Card key={p.id + index}>
            <Item {...p} />
          </Card>
        );
      })}
    </StyledReactGridLayout>
  );
};

export const BlogGrid = memo(_BlogGrid);
