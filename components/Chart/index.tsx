import { Box, BoxProps, Image, Skeleton } from "@chakra-ui/react";
import { usePinch } from "hooks/usePinch";

export const Chart = (props: Omit<BoxProps, "children">) => {
  const [targetRef, coverRef] = usePinch<HTMLImageElement, HTMLDivElement>();
  return (
    <Box ref={coverRef} {...props}>
      <Image
        ref={targetRef}
        src="https://ghchart.rshah.org/MrWangJustToDo"
        alt="chart"
        cursor="zoom-in"
        objectFit="cover"
      />
    </Box>
  );
};
