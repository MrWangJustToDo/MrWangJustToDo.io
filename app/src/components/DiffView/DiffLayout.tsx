import { Box, IconButton, useBreakpointValue, useSafeLayoutEffect } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { useScroll } from "framer-motion";
import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { GoChevronUp } from "react-icons/go";
import ReactSplit from "react-split";

import { useDiffAsideCompose } from "@app/hooks/useDiffAsideCompose";
import { useInComparePage } from "@app/hooks/useExample";

const style = css`
  .split {
    display: flex;
  }
  .gutter {
    flex: 1;
    flex-shrink: 0;
    margin-left: 2px;
    margin-top: var(--chakra-space-2);
    border-radius: 9999px;
    background-color: rgba(100, 145, 240, 0.05);
    transition: background-color 200ms;
    cursor: col-resize;
    overflow: hidden;
    z-index: 1;
    width: 4px;
  }
  .gutter:hover {
    background-color: rgba(100, 145, 240, 0.5);
  }

  .gutter:active {
    background-color: rgba(100, 145, 240, 0.9);
  }
`;

export const DiffLayout = memo(({ aside, content }: { aside: ReactNode; content: ReactNode }) => {
  const [el, setEl] = useState<HTMLDivElement>();

  const ref = useRef<HTMLElement>();

  const [scrollY, setScrollY] = useState(false);

  const inCompare = useInComparePage();

  const small = useBreakpointValue({ base: true, md: false }, { fallback: "md" });

  useSafeLayoutEffect(() => {
    ref.current = !inCompare ? document.querySelector("[data-id=diff-view-body]") : document.querySelector("#diff-view-body");
  }, [inCompare]);

  const { scrollYProgress } = useScroll({ container: ref });

  const state = useDiffAsideCompose((s) => s.state);

  useEffect(() => {
    if (small) {
      useDiffAsideCompose.getActions().setState(true);
    }
  }, [small]);

  useEffect(() => {
    scrollYProgress.onChange((v) => {
      if (v < 0.05) {
        setScrollY(false);
      } else {
        setScrollY(true);
      }
    });
  }, [scrollYProgress]);

  useEffect(() => {
    if (el) {
      el.classList.add("gutter");
    }
  }, [el]);

  if (state)
    return (
      <>
        {content}
        <IconButton
          icon={<GoChevronUp />}
          fontSize="xl"
          display={scrollY ? "flex" : "none"}
          position="fixed"
          onClick={() => ref.current.scrollTo({ top: 0 })}
          bottom="6"
          zIndex="modal"
          right="10"
          aria-label="scroll top"
        />
      </>
    );

  return (
    <>
      <Global styles={style} />
      <ReactSplit
        className="split"
        sizes={[22, 78]}
        minSize={100}
        expandToMin={false}
        gutterSize={5}
        gutterAlign="center"
        gutter={() => {
          const gutter = document.createElement("div");
          setEl(gutter);
          return gutter;
        }}
        snapOffset={30}
        cursor="col-resize"
        dragInterval={1}
      >
        <Box flexShrink={0}>{aside}</Box>
        <Box>{content}</Box>
      </ReactSplit>
      <IconButton
        icon={<GoChevronUp />}
        fontSize="xl"
        display={scrollY ? "flex" : "none"}
        position="fixed"
        onClick={() => ref.current.scrollTo({ top: 0 })}
        bottom="6"
        zIndex="modal"
        right="10"
        aria-label="scroll top"
      />
    </>
  );
});

DiffLayout.displayName = "DiffLayout";