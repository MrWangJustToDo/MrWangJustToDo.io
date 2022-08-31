import { Flex } from "@chakra-ui/react";

import type { WalkMeTour } from "../types";

export const home: WalkMeTour = {
  tourName: "home",
  tourSteps: [
    {
      selector: ".tour_placeholder",
      _title: <Flex>👀</Flex>,
      _content: <Flex>Welcome Home page!</Flex>,
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
    {
      selector: '.tour_blogList',
      highlightedSelectors: ['.tour_blogList'],
      _title: <Flex>👀 👀</Flex>,
      _content: <Flex>Blog</Flex>,
    },
    {
      selector: '.tour_buttons',
      highlightedSelectors: ['.tour_buttons'],
      _title: <Flex>👀 👀</Flex>,
      _content: <Flex>Feature Button</Flex>,
      _redirect: {
        nextPath: '/?overlay=open&playGround=MyReact',
        nextTour: 'playGround'
      }
    }
  ],
};
