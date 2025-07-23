import { useColorModeValue } from "@chakra-ui/react";
import { DiffModeEnum, DiffView } from "@git-diff-view/react";
import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect } from "react";

import { useDiffViewDiffFile } from "@app/hooks/useDiffViewDiffFile";

import type { DiffViewProps } from "@git-diff-view/react";
import type { RefObject } from "react";

export const DiffItemContent = (props: Omit<DiffViewProps<string[]>, "data"> & { boxRef: RefObject<HTMLDivElement>; id: string }) => {
  const { diffViewMode = DiffModeEnum.Split, diffFile, diffViewWrap, boxRef, id } = props;

  const setRenderDiffFile = useDiffViewDiffFile.getActions().setRenderDiffFile;

  const colorScheme = useColorModeValue("light", "dark");

  useEffect(() => {
    if (diffFile && !diffViewWrap) {
      const instanceArray: OverlayScrollbars[] = [];
      const init = () => {
        const isSplitMode = diffViewMode & DiffModeEnum.Split;
        if (isSplitMode) {
          const leftScrollbar = boxRef.current?.querySelector("[data-left]") as HTMLDivElement;
          const rightScrollbar = boxRef.current?.querySelector("[data-right]") as HTMLDivElement;
          const scrollContainers = Array.from(boxRef.current?.querySelectorAll(".diff-table-scroll-container") || []) as HTMLDivElement[];
          const [left, right] = scrollContainers;
          if (left && right) {
            const i1 = OverlayScrollbars(
              { target: left, scrollbars: { slot: leftScrollbar } },
              {
                scrollbars: {
                  theme: colorScheme === "dark" ? "os-theme-light" : "os-theme-dark",
                },
                overflow: {
                  y: "hidden",
                },
              },
            );
            const i2 = OverlayScrollbars(
              { target: right, scrollbars: { slot: rightScrollbar } },
              {
                scrollbars: {
                  theme: colorScheme === "dark" ? "os-theme-light" : "os-theme-dark",
                },
                overflow: {
                  y: "hidden",
                },
              },
            );
            instanceArray.push(i1, i2);
            const leftScrollEle = i1.elements().scrollEventElement as HTMLDivElement;
            const rightScrollEle = i2.elements().scrollEventElement as HTMLDivElement;
            i1.on("scroll", () => {
              rightScrollEle.scrollLeft = leftScrollEle.scrollLeft;
            });
            i2.on("scroll", () => {
              leftScrollEle.scrollLeft = rightScrollEle.scrollLeft;
            });
          }
        } else {
          const scrollBarContainer = boxRef.current?.querySelector("[data-full]") as HTMLDivElement;
          const scrollContainer = boxRef.current?.querySelector(".diff-table-scroll-container") as HTMLDivElement;
          if (scrollContainer) {
            const i = OverlayScrollbars(
              { target: scrollContainer, scrollbars: { slot: scrollBarContainer } },
              {
                scrollbars: {
                  theme: colorScheme === "dark" ? "os-theme-light" : "os-theme-dark",
                },
                overflow: {
                  y: "hidden",
                },
              },
            );
            instanceArray.push(i);
          }
        }
      };

      // 当前 @my-react 的调度还很简陋，所以这里使用 setTimeout
      const id = setTimeout(init, 1000);

      return () => {
        clearTimeout(id);
        instanceArray.forEach((i) => i.destroy());
      };
    }
  }, [diffFile, diffViewWrap, diffViewMode, colorScheme, boxRef]);

  return (
    <DiffView
      {...props}
      ref={({ getDiffFileInstance }) => {
        const renderDiffFile = getDiffFileInstance();
        setRenderDiffFile(id, renderDiffFile);
      }}
    />
  );
};
