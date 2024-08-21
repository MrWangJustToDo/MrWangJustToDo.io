import { Box } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { useEffect, useState, type ReactNode } from "react";
import ReactSplit from "react-split";

const style = css`
  .split {
    display: flex;
  }
  .gutter {
    flex: 1;
    flex-shrink: 0;
    margin-left: 2px;
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

export const DiffLayout = ({ aside, content }: { aside: ReactNode; content: ReactNode }) => {
  const [el, setEl] = useState<HTMLDivElement>();

  useEffect(() => {
    if (el) {
      el.classList.add("gutter");
    }
  }, [el]);

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
    </>
  );
};
