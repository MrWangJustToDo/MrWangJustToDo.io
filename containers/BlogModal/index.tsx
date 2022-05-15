import { useOverlaysOpen } from "hooks/useOverlay";
import { omit } from "lodash-es";
import { useRouter } from "next/router";
import React, { memo, useEffect } from "react";
import { DetailModal } from "./DetailModal";

const _BlogModal = () => {
  const { query, push } = useRouter();
  const open = useOverlaysOpen();
  const blogId = query.detailId;
  const isModalOpen = query.overlay === "open";

  useEffect(() => {
    if (isModalOpen && blogId !== undefined) {
      open({
        key: blogId as string,
        id: blogId as string,
        body: <DetailModal id={blogId as string} />,
        closeHandler: () =>
          push({
            pathname: "/",
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
