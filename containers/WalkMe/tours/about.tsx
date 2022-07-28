import { Flex } from "@chakra-ui/react";

import type { WalkMeTour } from "../types";

export const about: WalkMeTour = {
  tourName: "about",
  tourSteps: [
    {
      selector: ".placeholder",
      _title: <Flex>👀</Flex>,
      _content: <Flex>Welcome!</Flex>,
    },
    {
      selector: ".tour_about",
      highlightedSelectors: [".tour_about"],
      mutationObservables: [".tour_about"],
      _title: <Flex>👀</Flex>,
      _content: <Flex>About</Flex>,
    },
    {
      selector: ".tour_commit",
      highlightedSelectors: [".tour_commit"],
      _title: <Flex>👀</Flex>,
      _content: <Flex>Commit</Flex>,
    },
  ],
};
