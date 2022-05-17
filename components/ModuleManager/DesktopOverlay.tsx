import { Box } from "@chakra-ui/react";
import { Desktop } from "components/Overlay";
import { useOverlayArray } from "hooks/useOverlay";

export const DesktopOverlay = () => {
  const { desktop: overlays } = useOverlayArray();
  const someModalOpen = overlays.some((n) => n.showState);

  return (
    <div id="desktop-overlay">
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
        {overlays.map((p) => (
          <Desktop key={p.key} {...p} />
        ))}
      </Box>
    </div>
  );
};
