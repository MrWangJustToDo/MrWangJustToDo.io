import { Box } from "@chakra-ui/react";
import { Mobile } from "components/Overlay";
import { AnimatePresence } from "framer-motion";
import { useOverlayArray } from "hooks/useOverlay";
import { useLockBodyScroll } from "react-use";

export const MobileOverlay = () => {
  const { mobile: overlays } = useOverlayArray();
  const someModalOpen = overlays.some((n) => n.showState);
  useLockBodyScroll(someModalOpen);
  return (
    <div id="mobile-overlay">
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
        {/* currently the exit animation not work, look like it is a bug, SEE https://github.com/framer/motion/issues/1085, https://github.com/framer/motion/issues/1424 */}
        <AnimatePresence>
          {overlays.map((p) =>
            p.showState ? <Mobile key={p.key} {...p} /> : null
          )}
        </AnimatePresence>
      </Box>
    </div>
  );
};
