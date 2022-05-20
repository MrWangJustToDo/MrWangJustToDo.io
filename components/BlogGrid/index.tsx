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
import { Flex, useBreakpointValue } from "@chakra-ui/react";
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
}: {
  data: GetBlogListQuery["repository"]["issues"]["nodes"];
}) => {
  const isMobileWidth = useBreakpointValue({ base: true, md: false });
  if (isMobileWidth) {
    return (
      <Flex flexDirection="column" width="100%" padding="2">
        {data.map((p, index) => (
          <Card
            key={p.id + index}
            marginTop={index !== 0 ? "3" : "0"}
          >
            <Item {...p} />
          </Card>
        ))}
      </Flex>
    );
  }
  return <_BlogGridWithGridLayout data={data} />;
};

export const BlogGrid = memo(_BlogGrid);
