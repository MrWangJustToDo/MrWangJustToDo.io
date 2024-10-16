import { Button, Icon, useColorMode } from "@chakra-ui/react";
import { GoMoon, GoSun } from "react-icons/go";

export const ColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} variant="ghost" size="sm">
      <Icon as={colorMode === "dark" ? GoMoon : GoSun} />
    </Button>
  );
};
