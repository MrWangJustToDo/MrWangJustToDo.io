import { Button, Icon } from "@chakra-ui/react";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";

import { useFullScreen } from "@app/hooks/useFullScreen";

export const FullScreen = () => {
  const { state, toggle } = useFullScreen();

  return (
    <Button onClick={toggle} variant="ghost" size="sm">
      <Icon as={state ? GoScreenNormal : GoScreenFull} />
    </Button>
  );
};
