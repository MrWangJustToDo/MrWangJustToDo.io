import { SimpleGrid } from "@chakra-ui/react";
import { memo } from "react";

import { DISABLE_DRAG_HANDLER_SELECTOR, DRAG_HANDLER_SELECTOR, GRID_ROW_HEIGHT } from "@app/config/gridLayout";
import { useGetResponseListLayout } from "@app/hooks/useGetResponseListLayout";

import { Card } from "../Card";
import { GridCard } from "../GridCard";
import { StyledReactGridLayout } from "../GridLayout";

import { Item } from "./Item";

import type { GetBlogListQuery } from "@blog/graphql";

const BLOG_GRID_COLS = { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 };

const _BlogGridWithGridLayout = ({ data }: { data: GetBlogListQuery["repository"]["issues"]["nodes"] }) => {
  const layouts = useGetResponseListLayout(data);
  return (
    <StyledReactGridLayout
      className="layout"
      overflowX="hidden"
      layouts={layouts}
      cols={BLOG_GRID_COLS}
      rowHeight={GRID_ROW_HEIGHT}
      measureBeforeMount
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

const _BlogGrid = ({ data, disableGridLayout = true }: { data: GetBlogListQuery["repository"]["issues"]["nodes"]; disableGridLayout?: boolean }) => {
  if (disableGridLayout) {
    return (
      <SimpleGrid width="100%" padding="2" columns={{ base: 1, lg: 2, xl: 3 }} spacing={3}>
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