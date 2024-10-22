import { IconButton, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

import { useDiffAsideCompose } from "@app/hooks/useDiffAsideCompose";

export const DiffAsideCompose = () => {
  const { setState, state } = useDiffAsideCompose();

  const small = useBreakpointValue({ base: true, md: false });

  return (
    <Tooltip label="Compose aside">
      <IconButton
        icon={state ? <GoSidebarCollapse /> : <GoSidebarExpand />}
        fontSize="xl"
        isDisabled={small}
        color="lightTextColor"
        onClick={() => setState(!state)}
        aria-label="sidebar"
      />
    </Tooltip>
  );
};
