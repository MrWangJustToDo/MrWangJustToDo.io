import { Flex } from "@chakra-ui/react";

import type { WalkMeTour } from "../types";

export const playGround: WalkMeTour = {
  tourName: "playGround",
  tourSteps: [
    {
      selector: ".tour_placeholder",
      _title: <Flex>👀</Flex>,
      _content: <Flex>Welcome PlayGround page!</Flex>,
    },
    {
      selector: ".tour_playGround_editor",
      highlightedSelectors: [".tour_playGround_editor"],
      mutationObservables: [".tour_playGround_editor"],
      _title: <Flex>👀</Flex>,
      _content: <Flex>Editor</Flex>,
    },
    {
      selector: ".tour_playGround_preview",
      highlightedSelectors: [".tour_playGround_preview"],
      mutationObservables: [".tour_playGround_preview"],
      _title: <Flex>👀</Flex>,
      _content: <Flex>Preview</Flex>,
      _redirect: {
        nextPath: "/",
        nextTour: "home",
      },
    },
  ],
};
