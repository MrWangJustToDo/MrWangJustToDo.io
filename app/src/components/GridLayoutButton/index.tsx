import { Button } from "@chakra-ui/react";

import { useGridLayout } from "@app/hooks/useGridLayout";

export const GridLayoutButton = () => {
  const { state, toggle } = useGridLayout();
  return (
    <Button colorScheme="cyan" textTransform="capitalize" display={{ base: "none", lg: "block" }} minWidth="12em" onClick={toggle}>
      {!state ? "disable gridLayout" : "enable gridLayout"}
    </Button>
  );
};
