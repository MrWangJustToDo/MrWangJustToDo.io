import { useCallbackRef } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { useRouter } from "next/router";

export const useCalendar = () => {
  const { query, push, pathname } = useRouter();

  const isModalOpen = query.overlay === "open";

  const isCalendar = query.playGround === "calendar";

  const onOpen = useCallbackRef(() => {
    push(
      {
        pathname,
        query: {
          ...query,
          overlay: "open",
          playGround: "calendar",
        },
      },
      undefined,
      { scroll: false },
    );
  });

  const onClose = useCallbackRef(() => {
    push({ pathname, query: { ...omit(query, ["overlay", "playGround"]) } }, undefined, { scroll: false });
  });

  return { isOpen: isModalOpen && isCalendar, onOpen, onClose };
};
