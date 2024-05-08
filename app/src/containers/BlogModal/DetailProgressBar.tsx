import { chakra } from "@chakra-ui/react";
import { motion, motionValue, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

const CDiv = chakra(motion.div);

const initialMotionValue = motionValue(0);

export const DetailProgressBar = ({ isLoad }: { isLoad: boolean }) => {
  const ref = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    ref.current = document.querySelector("#modal-scroll-box");
  }, []);

  const { scrollYProgress } = useScroll({ container: ref });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <CDiv
      marginLeft={-6}
      marginRight={-6}
      position="sticky"
      top={0}
      marginY={2}
      zIndex="dropdown"
      style={{
        opacity: isLoad ? opacity : initialMotionValue,
        borderBottom: "2px solid rgba(160, 160, 160, .4)",
        transformOrigin: "0%",
        scaleX: scrollYProgress,
      }}
    />
  );
};
