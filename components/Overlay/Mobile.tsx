import { Box, Divider } from "@chakra-ui/react";
import {
  animate,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useOverlayArray, useOverlaysClose } from "hooks/useOverlay";
import { useCallback, useMemo, useRef } from "react";
import { useEffectOnce, useWindowSize } from "react-use";

export const Mobile = ({ overlayId }: { overlayId: string }) => {
  const { mobile: overlays } = useOverlayArray();
  const closeTopOverlay = useOverlaysClose();

  const {
    head,
    body,
    foot,
    height,
    className,
    closeComplete,
    closeHandler,
    applyOverlay,
  } =
    useMemo(
      () => overlays.find((overlay) => overlay.key === overlayId),
      [overlayId, overlays]
    ) || {};

  const isOpenRef = useRef(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const { height: windowHeight } = useWindowSize();

  const indicatorRotation = useMotionValue(0);

  const indicator1Transform = useTransform(
    indicatorRotation,
    (r) => `translateX(2px) rotate(${r}deg)`
  );

  const indicator2Transform = useTransform(
    indicatorRotation,
    (r) => `translateX(-2px) rotate(${-1 * r}deg)`
  );

  const y = useMotionValue(0);

  const handleDrag = useCallback((_, { delta }: PanInfo) => {
    // Update drag indicator rotation based on drag velocity
    const velocity = y.getVelocity();
    if (velocity > 0) indicatorRotation.set(10);
    if (velocity < 0) indicatorRotation.set(-10);
    // Make sure user cannot drag beyond the top of the sheet
    y.set(Math.max(y.get() + delta.y, 0));
  }, []); // eslint-disable-line

  const handleDragEnd = useCallback(
    (_, { velocity }: PanInfo) => {
      if (velocity.y > 500) {
        closeHandler && closeHandler();
      } else {
        const modal = modalRef.current as HTMLDivElement;
        const contentHeight = modal?.getBoundingClientRect()?.height;
        if (y.get() / contentHeight > 0.6) {
          closeHandler && closeHandler();
        } else {
          animate(y, 0, {
            type: "spring",
            ...{ stiffness: 300, damping: 30, mass: 0.2 },
          });
        }
        indicatorRotation.set(0);
      }
    },
    [indicatorRotation] // eslint-disable-line
  );

  const animationComplete = useCallback(() => {
    if (!isOpenRef.current) {
      isOpenRef.current = true;
    } else if (isOpenRef.current && closeComplete) {
      closeComplete();
    }
  }, [closeComplete]);

  useEffectOnce(() => {
    applyOverlay(overlayId, true);
    return () => {
      applyOverlay(overlayId, false);
    };
  });

  return (
    <motion.div
      drag="y"
      id={overlayId}
      dragElastic={0}
      onDrag={handleDrag}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      dragConstraints={{ bottom: 0, top: 0 }}
      style={{ height: "100%", width: "100%", position: "absolute" }}
    >
      <Box
        position="absolute"
        width="100%"
        height="100%"
        left="0"
        right="0"
        onClick={closeTopOverlay}
      />
      <motion.div
        layout
        ref={modalRef}
        style={{
          y,
          bottom: "0",
          width: "100%",
          display: "flex",
          overflow: "hidden",
          height: `${height}%`,
          position: "absolute",
          flexDirection: "column",
          borderRadius: "8px 8px 0 0",
          filter: "drop-shadow(0 0 0.75rem rgba(100, 100, 100, 0.35))",
        }}
        initial={{ y: windowHeight }}
        animate={{ y: 0, transition: { type: "tween" } }}
        exit={{ y: windowHeight }}
        className={className}
        onAnimationComplete={animationComplete}
      >
        <Box
          height="25px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="cardBackgroundColor"
        >
          <motion.span
            style={{
              width: "18px",
              height: "4px",
              borderRadius: "99px",
              transform: indicator1Transform,
              backgroundColor: "var(--chakra-colors-gray-300)",
            }}
          />
          <Box width="1" />
          <motion.span
            style={{
              width: "18px",
              height: "4px",
              borderRadius: "99px",
              transform: indicator2Transform,
              backgroundColor: "var(--chakra-colors-gray-300)",
            }}
          />
        </Box>
        <Divider />
        <Box backgroundColor="cardBackgroundColor">{head}</Box>
        <Box
          flex="1"
          padding="3.5"
          overflow="auto"
          position="relative"
          backgroundColor="cardBackgroundColor"
        >
          {body}
        </Box>
        <Box backgroundColor="cardBackgroundColor">{foot}</Box>
      </motion.div>
    </motion.div>
  );
};