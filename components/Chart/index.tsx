import { Box, BoxProps, Image } from "@chakra-ui/react";
import { usePinch } from "hooks/usePinch";

export const Chart = (props: BoxProps) => {
  const [targetRef, coverRef] = usePinch<HTMLImageElement, HTMLDivElement>();
  return (
    <Box ref={coverRef} {...props}>
      <Image
        ref={targetRef}
        src="http://ghchart.rshah.org/MrWangJustToDo"
        alt="chart"
        cursor="zoom-in"
      />
    </Box>
  );
};
