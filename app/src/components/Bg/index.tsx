import { Box, useColorMode, usePrevious } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect } from "react";

import { useAnimateVariant } from "@app/hooks/useAnimateVariant";
import { useIsMounted } from "@app/hooks/useIsMounted";
import { useWindowSize } from "@app/hooks/useWindowSize";

import type { ColorMode } from "@chakra-ui/react";

const _Bg = () => {
  const isMounted = useIsMounted();

  const { colorMode } = useColorMode();

  const prevColorMode = usePrevious(colorMode) || colorMode;

  return (
    <Box width="full" height="full" position="fixed" left="0" top="0" zIndex="-1">
      {isMounted && <AnimateBg colorMode={colorMode} prevColorMode={prevColorMode} />}
      <Box width="full" height="full" backdropFilter="blur(3px)" position="absolute" left="0" top="0" />
    </Box>
  );
};

const AnimateBg = ({ colorMode, prevColorMode }: { colorMode: ColorMode; prevColorMode: ColorMode }) => {
  const { width, height } = useWindowSize();

  const { light, dark, generate } = useAnimateVariant();

  useEffect(() => {
    if (colorMode !== prevColorMode) {
      generate(prevColorMode);
    }
  }, [generate, prevColorMode, colorMode]);

  const value = colorMode === "light" ? light : dark;

  return (
    <>
      {Array(value.length)
        .fill(0)
        .map((_, index) => {
          const open = value.entryVariants[index];
          const close = value.leaveVariants[index];
          const backgroundColor = colorMode === "dark" ? "red" : "green";
          // const backgroundColor = undefined;
          const openSize = open.size * 10;
          const closeSize = close.size * 10;
          const openVariant = { x: open.x * width, y: open.y * height, backgroundColor, width: openSize, height: openSize };
          const closeVariant = { x: close.x * width, y: close.y * height, backgroundColor, width: closeSize, height: closeSize };
          return (
            <AnimatePresence exitBeforeEnter key={index}>
              <motion.div
                key={index + colorMode}
                animate={prevColorMode === colorMode ? undefined : "open"}
                initial="close"
                exit="close"
                variants={{ open: openVariant, close: closeVariant }}
                style={{ borderRadius: "100%", overflow: "hidden" }}
              />
            </AnimatePresence>
          );
        })}
    </>
  );
};

export const Bg = memo(_Bg);
