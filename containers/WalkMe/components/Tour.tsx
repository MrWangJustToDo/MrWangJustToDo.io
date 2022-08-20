import { Box, Portal } from "@chakra-ui/react";
import TourMask from "@reactour/mask";
import { Popover } from "@reactour/popover";
import { Observables } from "@reactour/utils";

import { useLockBodyScroll } from "hooks/useLockBodyScroll";
import { useTourTargetSize } from "hooks/useSize";

import type { WalkMeTourProps } from "../types";

const empty = [];

export const Tour = ({ onClickModal, step, steps, children }: WalkMeTourProps) => {
  const currentStep = steps[step];

  useLockBodyScroll(true);

  const { sizes, debouncedRefresh } = useTourTargetSize(currentStep?.selector, currentStep?.highlightedSelectors || empty, currentStep?.action);

  return (
    <Portal>
      <TourMask sizes={sizes} onClick={onClickModal} padding={sizes.left === sizes.right ? 0 : 10} />
      {/* cover highlight area to prevent mouse event */}
      <Box
        position="fixed"
        left={sizes.left - 10}
        top={sizes.top - 10}
        width={sizes.width + 20}
        height={sizes.height + 20}
        // less than or equal to Popover zIndex
        zIndex="100000"
      />
      <Observables resizeObservables={currentStep?.resizeObservables} mutationObservables={currentStep?.mutationObservables} refresh={debouncedRefresh} />
      <Popover
        sizes={sizes}
        refresher={currentStep}
        position={({ right, bottom, windowWidth, windowHeight }) => {
          if (right >= windowWidth - 20) return "left";
          if (bottom >= windowHeight - 20) return "top";
          // if no targetElement found, position center the popover to the viewpoint
          if (sizes.left === sizes.right && sizes.top === sizes.bottom) return "center";
          return "bottom";
        }}
        styles={{
          popover: (base) => ({
            ...base,
            padding: 0,
            borderRadius: 4,
            overflow: "hidden",
          }),
        }}
      >
        {children}
      </Popover>
    </Portal>
  );
};
