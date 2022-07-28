import { Flex } from "@chakra-ui/react";

import { clickDom } from "../utils/click";
import { TRIGGER, trigger } from "../utils/trigger";

import type { WalkMeTour } from "../types";

export const button: WalkMeTour = {
  tourName: "button",
  tourSteps: [
    {
      selector: ".tour_playground",
      highlightedSelectors: [".tour_playground"],
      _title: <Flex>👀</Flex>,
      _content: <Flex>PlayGround</Flex>,
    },
    {
      selector: ".tour_playGround_editor",
      highlightedSelectors: [".tour_playGround_editor"],
      mutationObservables: [`.${TRIGGER}`],
      action: () => {
        clickDom(".tour_playground")();
        trigger(300);
      },
      _title: <Flex>👀</Flex>,
      _content: <Flex>Editor</Flex>,
    },
    {
      selector: ".tour_playGround_preview",
      highlightedSelectors: [".tour_playGround_preview"],
      _title: <Flex>👀</Flex>,
      _content: <Flex>Preview</Flex>,
      _beforeNext: () => {
        clickDom(".tour_close")();
        return null;
      },
    },
  ],
};
