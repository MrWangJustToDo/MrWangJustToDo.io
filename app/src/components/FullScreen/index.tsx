import { Icon, IconButton } from "@chakra-ui/react";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";

import { useFullScreen } from "@app/hooks/useFullScreen";

export const FullScreen = () => {
  const { state, toggle } = useFullScreen();

  return <IconButton aria-label="full-screen" icon={<Icon as={state ? GoScreenNormal : GoScreenFull} />} onClick={toggle} variant="ghost" size="sm" />;
};
