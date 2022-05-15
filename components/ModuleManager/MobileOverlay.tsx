import { Box, Portal } from "@chakra-ui/react";
import { Mobile } from "components/Overlay";
import { AnimatePresence } from "framer-motion";
import { useOverlayArray } from "hooks/useOverlay";
import { useLockBodyScroll } from "react-use";

export const MobileOverlay = () => {
  const { mobile: overlays } = useOverlayArray();
  const someModalOpen = overlays.some((n) => n.showState);
  useLockBodyScroll(someModalOpen);
  return (
    <Portal>
      <div id="mobile-overlay">
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
            <AnimatePresence>
              {overlays.map((p) =>
                p.showState ? <Mobile key={p.key} overlayId={p.key} /> : null
              )}
            </AnimatePresence>
          </Box>
        ) : null}
      </div>
    </Portal>
  );
};
