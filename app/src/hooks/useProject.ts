import { useCallbackRef } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { useRouter } from "next/router";

export const useProject = () => {
  const { query, push, pathname } = useRouter();

  const isModalOpen = query.overlay === "open";

  const isProject = query.playGround === "project";

  const onOpen = useCallbackRef(() => {
    push(
      {
        pathname,
        query: {
          ...query,
          overlay: "open",
          playGround: "project",
        },
      },
      undefined,
      { scroll: false },
    );
  });

  const onClose = useCallbackRef(() => {
    push({ pathname, query: { ...omit(query, ["overlay", "playGround"]) } }, undefined, { scroll: false });
  });

  return { isOpen: isModalOpen && isProject, onOpen, onClose };
};
