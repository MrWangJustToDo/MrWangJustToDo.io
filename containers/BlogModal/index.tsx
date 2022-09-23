import { omit } from "lodash-es";
import { useRouter } from "next/router";
import React, { memo, useEffect } from "react";

import { useOverlaysClose, useOverlaysOpen } from "hooks/useOverlay";

import { DetailModalBody, DetailModalHeader } from "./DetailModal";

const _BlogModal = () => {
  const { query, push } = useRouter();
  const open = useOverlaysOpen();
  const close = useOverlaysClose();
  const blogId = query.detailId;
  const isModalOpen = query.overlay === "open";

  useEffect(() => {
    if (isModalOpen && blogId !== undefined) {
      open({
        head: <DetailModalHeader id={blogId as string} />,
        body: <DetailModalBody id={blogId as string} />,
        closeComplete: () =>
          push(
            {
              pathname: "/",
              query: {
                ...omit(query, ["overlay", "detailId"]),
              },
            },
            undefined,
            { scroll: false }
          ),
      });
    } else {
      close();
    }
  }, [blogId, close, isModalOpen, open, push, query]);

  return <React.Fragment />;
};

export const BlogModal = memo(_BlogModal);
