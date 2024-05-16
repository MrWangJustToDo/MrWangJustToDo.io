import { Flex } from "@chakra-ui/react";
import { memo, useLayoutEffect, useRef } from "react";

import { useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";

import { DiffItem } from "./DiffItem";

const _DiffContent = memo(() => {
  const list = useGitHubCompareSourceList((s) => s.list);

  const workRef = useRef<Worker>();

  useLayoutEffect(() => {
    workRef.current = new Worker(new URL("@app/worker/diffView.worker", import.meta.url));

    return () => workRef.current.terminate();
  }, []);

  return (
    <Flex display="flex" flexDirection="column" rowGap="4">
      {list.map((item) => (
        <DiffItem key={item.filename} item={item} workRef={workRef} />
      ))}
    </Flex>
  );
});

_DiffContent.displayName = "_DiffContent";

export const DiffContent = _DiffContent;
