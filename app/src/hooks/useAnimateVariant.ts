import { createState } from "reactivity-store";

import type { ColorMode } from "@chakra-ui/react";

const getRandom = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getVariant = () => {
  const length = 14;
  const array = Array(length).fill(0);
  const leaveVariants = array.map((_, i) => {
    if (i < length / 2) {
      return {
        x: getRandom(-0.2, -0.04),
        y: getRandom(-0.1, 1.1),
        size: getRandom(0.5, 1.5),
      };
    } else {
      return {
        x: getRandom(1.1, 1.2),
        y: getRandom(-0.1, 1.1),
        size: getRandom(0.5, 1.5),
      };
    }
  });
  const entryVariants = array.map((_, i) => {
    if (i < length / 2) {
      return {
        x: getRandom(0.08, 0.5),
        y: getRandom(0.05, 0.9),
        size: getRandom(0.5, 1.5),
      };
    } else {
      return {
        x: getRandom(0.5, 0.9),
        y: getRandom(0.05, 0.9),
        size: getRandom(0.5, 1.5),
      };
    }
  });

  return {
    length,
    leaveVariants,
    entryVariants,
  };
};

export const useAnimateVariant = createState(() => ({ light: getVariant(), dark: getVariant() }), {
  withActions: (s: { [x: string]: { length: number; leaveVariants: { x: number; y: number; size: number; }[]; entryVariants: { x: number; y: number; size: number; }[]; }; }) => ({
    generate: (key: ColorMode) => {
      s[key] = getVariant();
    },
  }),
  withNamespace: 'useAnimateVariant'
});
