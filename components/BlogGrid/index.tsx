import { memo } from "react";
import { StyledReactGridLayout } from "components/GridLayout";
import { useGetResponseListLayout } from "hooks/useGetResponseListLayout";
import { GetBlogListQuery } from "graphql/generated";
import { Item } from "./Item";
import {
  DISABLE_DRAG_HANDLER_SELECTOR,
  DRAG_HANDLER_SELECTOR,
  GRID_ROW_HEIGHT,
} from "config/gridLayout";
import { GridCard } from "components/GridCard";
import { SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { Card } from "components/Card";

const BLOG_GRID_COLS = { lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 };

const _BlogGridWithGridLayout = ({
  data,
}: {
  data: GetBlogListQuery["repository"]["issues"]["nodes"];
}) => {
  const layouts = useGetResponseListLayout(data);
  return (
    <StyledReactGridLayout
      className="layout"
      overflowX="hidden"
      layouts={layouts}
      cols={BLOG_GRID_COLS}
      rowHeight={GRID_ROW_HEIGHT}
      measureBeforeMount={true}
      draggableHandle={`.${DRAG_HANDLER_SELECTOR}`}
      draggableCancel={`.${DISABLE_DRAG_HANDLER_SELECTOR}`}
    >
      {data.map((p, index) => {
        return (
          <GridCard key={p.id + index}>
            <Item {...p} />
          </GridCard>
        );
      })}
    </StyledReactGridLayout>
  );
};

const _BlogGrid = ({
  data,
  disableGridLayout = true,
}: {
  data: GetBlogListQuery["repository"]["issues"]["nodes"];
  disableGridLayout?: boolean;
}) => {
  const isMobileWidth = useBreakpointValue({ base: true, md: false });
  if (isMobileWidth || disableGridLayout) {
    return (
      <SimpleGrid
        width="100%"
        padding="2"
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={3}
      >
        {data.map((p, index) => (
          <Card key={p.id + index} maxHeight="96">
            <Item {...p} />
          </Card>
        ))}
      </SimpleGrid>
    );
  }
  return <_BlogGridWithGridLayout data={data} />;
};

export const BlogGrid = memo(_BlogGrid);
