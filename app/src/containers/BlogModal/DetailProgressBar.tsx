import { chakra } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

const CDiv = chakra(motion.div);

export const DetailProgressBar = () => {
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
      zIndex="dropdown"
      style={{ opacity, borderBottom: "2px solid rgba(160, 160, 160, .4)", transformOrigin: "0%", scaleX: scrollYProgress }}
    />
  );
};
