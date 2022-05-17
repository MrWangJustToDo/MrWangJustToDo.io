import { Box, BoxProps, ButtonGroup, Icon, IconButton } from "@chakra-ui/react";
import { GetBlogListQuery } from "graphql/generated";
import { omit } from "lodash-es";
import { useRouter } from "next/router";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export const Pagination = ({
  paginationProps,
  containerProps,
}: {
  paginationProps: GetBlogListQuery["repository"]["issues"]["pageInfo"];
  containerProps?: Omit<BoxProps, "children">;
}) => {
  const { push, query } = useRouter();
  const { hasNextPage, hasPreviousPage, endCursor, startCursor } =
    paginationProps;

  return (
    <Box {...containerProps}>
      <ButtonGroup size="sm" variant="ghost">
        <IconButton
          aria-label="Prev"
          icon={<Icon as={AiOutlineLeft} />}
          disabled={!hasPreviousPage}
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
          disabled={!hasNextPage}
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
