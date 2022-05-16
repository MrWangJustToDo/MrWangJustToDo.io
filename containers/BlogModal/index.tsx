import { BLOG_BASE } from "config/source";
import { useOverlaysOpen } from "hooks/useOverlay";
import { omit } from "lodash-es";
import { useRouter } from "next/router";
import React, { memo, useEffect } from "react";
import { DetailModalBody, DetailModalHeader } from "./DetailModal";

const _BlogModal = () => {
  const { query, push } = useRouter();
  const open = useOverlaysOpen();
  const blogId = query.detailId;
  const isModalOpen = query.overlay === "open";

  console.log(blogId, isModalOpen, query);

  useEffect(() => {
    if (isModalOpen && blogId !== undefined) {
      open({
        key: blogId as string,
        id: blogId as string,
        head: <DetailModalHeader id={blogId as string} />,
        body: <DetailModalBody id={blogId as string} />,
        closeHandler: () =>
          push({
            pathname: process.env.NODE_ENV === "development" ? "/" : BLOG_BASE,
            query: {
              ...omit(query, ["overlay", "detailId"]),
            },
          }),
      });
    }
  }, [blogId, isModalOpen, open, push, query]);

  return <React.Fragment />;
};

export const BlogModal = memo(_BlogModal);
