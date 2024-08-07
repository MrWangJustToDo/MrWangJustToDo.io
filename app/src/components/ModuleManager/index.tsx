import { Portal, useBreakpointValue } from "@chakra-ui/react";
import { useMemo } from "react";

import { OverlayArrayContext, OverlayCloseContext, OverlayOpenContext, useOverlaysProps } from "@app/hooks/useOverlay";

import { DesktopOverlay } from "./DesktopOverlay";
import { GlobalModal } from "./GlobalModal";
import { MobileOverlay } from "./MobileOverlay";

export const ModuleManager = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { overlays, open, close } = useOverlaysProps();
  const overlaysObj = useBreakpointValue(
    useMemo(
      () => ({
        base: { mobile: overlays, desktop: [] },
        md: { mobile: [], desktop: overlays },
      }),
      [overlays],
    ),
  );

  return (
    <OverlayArrayContext.Provider value={overlaysObj}>
      <OverlayCloseContext.Provider value={close}>
        <OverlayOpenContext.Provider value={open}>
          <GlobalModal>{children}</GlobalModal>
          <Portal>
            <MobileOverlay />
            <DesktopOverlay />
          </Portal>
        </OverlayOpenContext.Provider>
      </OverlayCloseContext.Provider>
    </OverlayArrayContext.Provider>
  );
};
