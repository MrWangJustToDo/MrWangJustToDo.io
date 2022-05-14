import { Avatar, Text, Flex, Box } from "@chakra-ui/react";
import { Card } from "components/Card";
import { StyledReactGridLayout } from "components/GridLayout";
import {
  DISABLE_DRAG_HANDLER_SELECTOR,
  DRAG_HANDLER_SELECTOR,
  GRID_ROW_HEIGHT,
} from "config/gridLayout";
import { GetBlogListQuery } from "graphql/generated";
import { memo } from "react";
import { Layout } from "react-grid-layout";
import { momentTo } from "utils/time";

const BLOG_GRID_COLS = 3;
const BLOG_GRID_HEIGHT = 16;

const generateDataGrid = (index: number): Partial<Layout> => {
  return {
    x: Math.floor(index % 3),
    y: Math.floor(index / 3) * BLOG_GRID_HEIGHT,
    w: 1,
    h: BLOG_GRID_HEIGHT + index * 10,
  };
};

const _BlogGrid = ({
  data,
}: {
  data: GetBlogListQuery["repository"]["issues"]["nodes"];
}) => {
  return (
    <StyledReactGridLayout
      className="layout"
      cols={BLOG_GRID_COLS}
      rowHeight={GRID_ROW_HEIGHT}
      draggableHandle={`.${DRAG_HANDLER_SELECTOR}`}
      draggableCancel={`.${DISABLE_DRAG_HANDLER_SELECTOR}`}
    >
      {data.map(
        (
          { id, title, author: { avatarUrl, login }, publishedAt, bodyHTML },
          index
        ) => {
          return (
            <Card key={id + index} data-grid={generateDataGrid(index)}>
              <Text fontSize="22" fontWeight="medium" title={title}>
                <Text as="span" fontWeight="medium">
                  {index + 1}
                </Text>
                : {title}
              </Text>
              <Flex marginTop="2" alignItems="center">
                <Avatar
                  src={avatarUrl}
                  title={login}
                  name={login}
                  width="6"
                  height="6"
                />
                <Text fontSize="small" color="gray.600" marginLeft="2">
                  {momentTo(publishedAt)}
                </Text>
              </Flex>
              <Box
                marginTop="2.5"
                dangerouslySetInnerHTML={{ __html: bodyHTML }}
              />
            </Card>
          );
        }
      )}
    </StyledReactGridLayout>
  );
};

export const BlogGrid = memo(_BlogGrid);
