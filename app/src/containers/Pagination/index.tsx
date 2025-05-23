import { Box, ButtonGroup, Icon, IconButton } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { ChevronLeftIcon as AiOutlineLeft, ChevronRightIcon as AiOutlineRight } from "lucide-react";
import { useRouter } from "next/router";

import type { GetBlogListQuery } from "@blog/graphql";
import type { BoxProps } from "@chakra-ui/react";

export const Pagination = ({
  paginationProps,
  containerProps,
}: {
  paginationProps: GetBlogListQuery["repository"]["issues"]["pageInfo"];
  containerProps?: Omit<BoxProps, "children">;
}) => {
  const { push, query } = useRouter();
  const { hasNextPage, hasPreviousPage, endCursor, startCursor } = paginationProps;

  return (
    <Box {...containerProps}>
      <ButtonGroup size="sm" variant="ghost">
        <IconButton
          aria-label="Prev"
          icon={<Icon as={AiOutlineLeft} />}
          isDisabled={!hasPreviousPage}
          data-disable={hasPreviousPage}
          onClick={() => {
            push({
              pathname: "/",
              query: {
                ...omit(query, ["before", "after", "nav"]),
                before: startCursor,
                nav: "last",
              },
            });
          }}
        />
        <IconButton
          aria-label="Next"
          icon={<Icon as={AiOutlineRight} />}
          isDisabled={!hasNextPage}
          onClick={() => {
            push({
              pathname: "/",
              query: {
                ...omit(query, ["before", "after", "nav"]),
                after: endCursor,
                nav: "first",
              },
            });
          }}
        />
      </ButtonGroup>
    </Box>
  );
};
