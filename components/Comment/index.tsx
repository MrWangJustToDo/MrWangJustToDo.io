import { Divider } from "@chakra-ui/react";
import { GetSingleBlogQuery } from "graphql/generated";
import { Item } from "./Item";

export const Comment = ({
  data,
}: {
  data: GetSingleBlogQuery["repository"]["issue"]["comments"]["nodes"];
}) => {
  return (
    <>
      {data.length > 0 && <Divider marginY="2" />}
      {data.map((p) => (
        <Item key={p.id} {...p} />
      ))}
    </>
  );
};
