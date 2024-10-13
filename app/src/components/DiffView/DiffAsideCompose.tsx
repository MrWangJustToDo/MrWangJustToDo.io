import { IconButton } from "@chakra-ui/react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

import { useDiffAsideCompose } from "@app/hooks/useDiffAsideCompose";

export const DiffAsideCompose = () => {
  const { setState, state } = useDiffAsideCompose();

  return (
    <IconButton
      icon={state ? <GoSidebarCollapse /> : <GoSidebarExpand />}
      fontSize="xl"
      color="lightTextColor"
      onClick={() => setState(!state)}
      aria-label="sidebar"
    />
  );
};
