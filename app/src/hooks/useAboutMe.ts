import { useCallbackRef } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { useRouter } from "next/router";

export const useAboutMe = () => {
  const { query, push, pathname } = useRouter();

  const isModalOpen = query.overlay === "open";

  const isAboutMe = query.playGround === "aboutMe";

  const onOpen = useCallbackRef(() => {
    push(
      {
        pathname,
        query: {
          ...query,
          overlay: "open",
          playGround: "aboutMe",
        },
      },
      undefined,
      { scroll: false },
    );
  });

  const onClose = useCallbackRef(() => {
    push({ pathname, query: { ...omit(query, ["overlay", "playGround"]) } }, undefined, { scroll: false });
  });

  return { isOpen: isModalOpen && isAboutMe, onOpen, onClose };
};
