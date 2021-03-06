import { Box, BoxProps, Image } from "@chakra-ui/react";
// import { usePinch } from "hooks/usePinch";
import usePinch from "use-pinch-ref";

export const Chart = (props: Omit<BoxProps, "children">) => {
  const { pinchRef, coverRef } = usePinch<HTMLImageElement, HTMLDivElement>();
  return (
    <Box ref={coverRef} {...props}>
      <Image
        ref={pinchRef}
        src="https://ghchart.rshah.org/MrWangJustToDo"
        alt="chart"
        cursor="zoom-in"
        objectFit="cover"
      />
    </Box>
  );
};
