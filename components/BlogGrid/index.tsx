import { Avatar, Text, Flex, Box, useColorModeValue } from "@chakra-ui/react";
import { Card } from "components/Card";
import { StyledReactGridLayout } from "components/GridLayout";
import {
  DISABLE_DRAG_HANDLER_SELECTOR,
  DRAG_HANDLER_SELECTOR,
  GRID_ROW_HEIGHT,
} from "config/gridLayout";
import { GetBlogListQuery } from "graphql/generated";
import { useGetResponseList } from "hooks/useGetResponseList";
import { memo } from "react";
import { momentTo } from "utils/time";

const BLOG_GRID_COLS = { lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 };

const _BlogGrid = ({
  data,
}: {
  data: GetBlogListQuery["repository"]["issues"]["nodes"];
}) => {
  const layouts = useGetResponseList(data);
  const color = useColorModeValue("gray.600", "whiteAlpha.600");
  return (
    <StyledReactGridLayout
      className="layout"
      cols={BLOG_GRID_COLS}
      layouts={layouts}
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
            <Card key={id + index}>
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
                <Text fontSize="small" color={color} marginLeft="2">
                  {momentTo(publishedAt)}
                </Text>
              </Flex>
              <Box
                marginTop="3"
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
