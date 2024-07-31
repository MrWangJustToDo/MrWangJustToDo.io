import { Box, Flex, useColorModeValue, Text, Tag } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Lumiflex, Zenitho } from "uvcanvas";

import { useDomSize } from "@app/hooks/useSize";

import { Card } from "../Card";

const variants = {
  initial: {
    opacity: 0.2,
    translateY: -14,
  },
  in: {
    opacity: 1,
    translateY: 0,
  },
  out: {
    opacity: 0.2,
    translateY: 14,
  },
};

export const Commit = ({ data }: { data: Array<{ repo: string; commit: number }> }) => {
  const Ele = useColorModeValue(Lumiflex, Zenitho);

  const ref = useRef<HTMLDivElement>();

  const { width, height } = useDomSize({ ref });

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (data?.length > 1) {
      const id = setInterval(() => setIndex((i) => (i < data.length - 1 ? i + 1 : 0)), 5000);

      return () => clearInterval(id);
    } else {
      setIndex(0);
    }
  }, [data]);

  return (
    <Card height="100%" width="60%" overflow="hidden" transform="translateZ(0px)" px="2">
      <Box position="fixed" width="100%" height="100%" zIndex="-1" top="0" left="0" ref={ref}>
        <Ele key={width + ":" + height} />
      </Box>
      {data.length === 0 && (
        <Flex alignItems="center" justifyContent="center" height="100%" fontSize="sm">
          No Recent Commit
        </Flex>
      )}
      {data.length === 1 && (
        <Flex justifyContent="space-between" fontSize="smaller" alignItems="center" height="100%">
          <Text lineHeight="1.8">
            Create <Tag size="sm">{data[0].commit}</Tag> commit to <Tag size="sm">{data[0].repo}</Tag>
          </Text>
        </Flex>
      )}
      {data.length > 1 && (
        <Flex justifyContent="space-between" fontSize="smaller" alignItems="center" height="100%">
          <Text lineHeight="1.8">
            Create{" "}
            <Tag size="sm">
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  key={index}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={variants}
                  transition={{
                    type: "tween",
                    duration: 0.3,
                  }}
                >
                  {data[index].commit}
                </motion.div>
              </AnimatePresence>
            </Tag>{" "}
            commit to{" "}
            <Tag size="sm">
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  key={index}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={variants}
                  transition={{
                    type: "tween",
                    duration: 0.3,
                  }}
                >
                  {data[index].repo}
                </motion.div>
              </AnimatePresence>
            </Tag>
          </Text>
        </Flex>
      )}
    </Card>
  );
};
