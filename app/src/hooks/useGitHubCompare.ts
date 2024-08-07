import { useCallbackRef } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useIsMobile } from "./useIsMobile";

export const useGitHubCompare = () => {
  const { query, push, pathname } = useRouter();

  const isMobile = useIsMobile();

  const isModalOpen = query.overlay === "open";
  
  const isGitHub = query.playGround === "GitHub";

  const onOpen = useCallbackRef(() => {
    push(
      {
        pathname: pathname,
        query: {
          ...query,
          overlay: "open",
          playGround: "GitHub",
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

  const isOpen = isModalOpen && isGitHub;

  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [isMobile, isOpen, onClose]);

  return { isOpen, onOpen, onClose };
};
