import { Button, Icon } from "@chakra-ui/react";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";

import { useFullScreen } from "@app/hooks/useFullScreen";

export const FullScreen = () => {
  const { state, toggle } = useFullScreen();

  return (
    <Button onClick={toggle} variant="ghost" size="sm">
      <Icon as={state ? BiExitFullscreen : BiFullscreen} />
    </Button>
  );
};
