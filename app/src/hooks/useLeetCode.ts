import { useCallbackRef } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { useRouter } from "next/router";

export const useLeetCode = () => {
  const { query, push, pathname } = useRouter();

  const isModalOpen = query.overlay === "open";
  const isLeetCode = query.playGround === "LeetCode";

  const onOpen = useCallbackRef(() => {
    push(
      {
        pathname: pathname,
        query: {
          ...query,
          overlay: "open",
          playGround: "LeetCode",
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

  return { isOpen: isModalOpen && isLeetCode, onOpen, onClose };
};
