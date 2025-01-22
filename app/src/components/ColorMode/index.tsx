import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { GoMoon, GoSun } from "react-icons/go";

import type { ButtonProps } from "@chakra-ui/react";

export const ColorMode = (props?: ButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={<Icon as={colorMode === "dark" ? GoMoon : GoSun} />}
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      aria-label="color-mode"
      {...props}
    />
  );
};
