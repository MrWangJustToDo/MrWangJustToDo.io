import { Flex, useCallbackRef } from "@chakra-ui/react";
import { debounce } from "lodash";
import { memo, useLayoutEffect, useMemo, useRef } from "react";

import { useGitHubCompareSourceInView, useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";

import { DiffItem } from "./DiffItem";

import type { GitHubCompareFileListType} from "@app/hooks/useGitHubCompareSource";

const { setId } = useGitHubCompareSourceInView.getActions();

const _DiffContent = memo(() => {
  const list = useGitHubCompareSourceList((s) => s.list);

  const workRef = useRef<Worker>();

  useLayoutEffect(() => {
    workRef.current = new Worker(new URL("@app/worker/diffView.worker", import.meta.url));

    return () => workRef.current.terminate();
  }, []);

  const autoSetCurrent = useCallbackRef(() => {
    const allElement = list.map((i) => ({ item: i, node: document.querySelector(`[data-file="${i.filename}"]`) }));
    const allInViewElement = allElement.filter((i) => i.node?.getAttribute("data-in-view") === "true");
    //  最近接近上边缘的元素作为当前选中
    let minTop = Infinity;
    let item: GitHubCompareFileListType | null = null;
    allInViewElement.forEach((i) => {
      const { top } = i.node?.getBoundingClientRect() || {};
      if (top < minTop) {
        minTop = top;
        item = i.item;
      }
    });
    if (item) {
      if (item.filename !== useGitHubCompareSourceInView.getReadonlyState().id) {
        setId(item.filename);
      }
    } else {
      setId("");
    }
  });

  const autoSetCurrentInView = useMemo(() => debounce(autoSetCurrent, 60), [autoSetCurrent]);

  return (
    <Flex display="flex" flexDirection="column" rowGap="4">
      {list.map((item) => (
        <DiffItem key={item.filename} item={item} workRef={workRef} autoSetCurrentInView={autoSetCurrentInView} />
      ))}
    </Flex>
  );
});

_DiffContent.displayName = "_DiffContent";

export const DiffContent = _DiffContent;
