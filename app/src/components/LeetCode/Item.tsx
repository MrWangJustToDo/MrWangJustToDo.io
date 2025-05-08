import { Box, CloseButton, Link, List, ListIcon, ListItem, SimpleGrid, SkeletonText } from "@chakra-ui/react";
import { AnimatePresence, motion, useInView, useUnmountEffect } from "framer-motion";
import { SquareArrowOutUpRightIcon as GoLinkExternal } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";

import { Card } from "@app/components/Card";
import { useFetchLeetCode } from "@app/hooks/useFetchLeetCode";
import { useLeetCodeSelectId } from "@app/hooks/useLeetCodeSelectId";
import { hljs } from "@app/utils/highlight";

const MotionCard = motion(Card);

const { set } = useLeetCodeSelectId.getActions();

const LeetCodeListLoading = () => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} padding="6" height="100%" overflow="hidden">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((i) => (
      <SkeletonText key={i} noOfLines={18} marginY="2" />
    ))}
  </SimpleGrid>
);

const Content = ({ children }: { children: string }) => {
  const ref = useRef(null);

  const hasHighLightRef = useRef(false);

  const inView = useInView(ref);

  useEffect(() => {
    if (inView && !hasHighLightRef.current) {
      hljs.highlightElement(ref.current);
      hasHighLightRef.current = true;
    }
  }, [inView]);

  return (
    <Box className="typo" as="pre" padding="2" fontSize="sm" borderBottomRadius="md">
      <code ref={ref}>{children}</code>
    </Box>
  );
};

const ModalCard = ({ content }: { content: string }) => {
  const [animateDone, setAnimateDone] = useState(false);

  return (
    /* Container */
    <div
      style={{
        position: "fixed",
        top: "50%",
        transform: "translate(-50%, -50%)",
        left: "50%",
        display: "flex",
        width: "fit-content",
        height: "fit-content",
        justifyContent: "center",
        justifySelf: "center",
        alignContent: "center",
      }}
    >
      {/* Card */}
      <MotionCard
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.3,
          ease: "easeInOut",
        }}
        /* Layout ID */
        layoutId={content}
        style={{
          width: "70vw",
          maxHeight: "70vh",
          borderRadius: "20px",
          overflow: "auto",
        }}
        onLayoutAnimationComplete={() => setAnimateDone(true)}
      >
        <motion.div
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <CloseButton onClick={() => set(undefined)} position="absolute" right="10px" top="10px" />
          {!animateDone ? <SkeletonText noOfLines={15} marginY="2" /> : <Content>{content}</Content>}
        </motion.div>
      </MotionCard>
    </div>
  );
};

const LeetCodeContent_ = () => {
  const { content, loading } = useFetchLeetCode();

  const selectContent = useLeetCodeSelectId((s) => s.state);

  useUnmountEffect(() => set(undefined));

  if (loading) return <LeetCodeListLoading />;

  return (
    <>
      <List spacing={3} marginX="2">
        <ListItem color="blue.300">
          <ListIcon as={GoLinkExternal} />
          <Link href="https://github.com/MrWangJustToDo/leetcode" target="_blank" textDecoration="underline">
            Source
          </Link>
        </ListItem>
        <ListItem color="blue.300">
          <ListIcon as={GoLinkExternal} />
          <Link href="https://leetcode.com/MrWangSay/" target="_blank" textDecoration="underline">
            Site
          </Link>
        </ListItem>
      </List>
      <AnimatePresence>
        <SimpleGrid width="100%" padding="2" columns={{ base: 1, lg: 2, xl: 3, "2xl": 4 }} spacing={3} onClick={() => set(undefined)}>
          {content.map((file) =>
            file.map((c) => {
              if (!c) return null;
              return (
                <MotionCard
                  key={c}
                  maxHeight={{ base: "96", lg: "400px" }}
                  overflow="auto"
                  layoutId={c}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                  cursor="pointer"
                  whileHover={{
                    scale: 0.98,
                  }}
                  onClick={(e: Event) => {
                    e.stopPropagation();
                    set(c);
                  }}
                >
                  <Content>{c}</Content>
                </MotionCard>
              );
            }),
          )}
        </SimpleGrid>

        {selectContent && <Box key="mask" position="fixed" top="0" left="0" width="full" height="full" backdropFilter="blur(1px)" pointerEvents="none" />}

        {selectContent && <ModalCard key={selectContent} content={selectContent} />}
      </AnimatePresence>
    </>
  );
};

export const LeetCodeContent = memo(LeetCodeContent_);
