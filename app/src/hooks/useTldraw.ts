import { useCallbackRef } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { useRouter } from "next/router";

export const useTldraw = () => {
  const { query, push, pathname } = useRouter();

  const isModalOpen = query.overlay === "open";
  const isPlayGround = query.playGround === "Tldraw";

  const onOpen = useCallbackRef(() => {
    push(
      {
        pathname: pathname,
        query: {
          ...query,
          overlay: "open",
          playGround: "Tldraw",
        },
      },
      undefined,
      { scroll: false },
    );
  });

  const onClose = useCallbackRef(() => {
    push(
      {
        pathname,
        query: {
          ...omit(query, ["overlay", "playGround"]),
        },
      },
      undefined,
      { scroll: false },
    );
  });

  return { isOpen: isModalOpen && isPlayGround, onOpen, onClose };
};
