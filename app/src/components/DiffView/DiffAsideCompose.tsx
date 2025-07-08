import { IconButton, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { PanelRightCloseIcon as GoSidebarCollapse, PanelRightOpenIcon as GoSidebarExpand } from "lucide-react";

import { useDiffAsideCompose } from "@app/hooks/useDiffAsideCompose";

export const DiffAsideCompose = () => {
  const { setState, state } = useDiffAsideCompose();

  const small = useBreakpointValue({ base: true, md: false });

  return (
    <Tooltip label="Compose aside">
      <IconButton
        icon={state ? <GoSidebarCollapse strokeWidth={1.6} /> : <GoSidebarExpand strokeWidth={1.6} />}
        fontSize="xl"
        isDisabled={small}
        color="lightTextColor"
        onClick={() => setState(!state)}
        aria-label="sidebar"
      />
    </Tooltip>
  );
};
