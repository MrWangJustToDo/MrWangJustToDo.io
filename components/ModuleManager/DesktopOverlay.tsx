import { Box, Portal } from "@chakra-ui/react";
import { Desktop } from "components/Overlay";
import { useOverlayArray } from "hooks/useOverlay";

export const DesktopOverlay = () => {
  const { desktop: overlays } = useOverlayArray();
  const someModalOpen = overlays.some((n) => n.showState);

  return (
    <Portal>
      <div id="desktop-overlay">
        {overlays.length ? (
          <Box
            position="fixed"
            overflow="hidden"
            top="0"
            left="0"
            right="0"
            bottom="0"
            zIndex="overlay"
            display={someModalOpen ? "block" : "none"}
          >
            {overlays.map((p) =>
              p.showState ? <Desktop key={p.key} overlayId={p.key} /> : null
            )}
          </Box>
        ) : null}
      </div>
    </Portal>
  );
};
