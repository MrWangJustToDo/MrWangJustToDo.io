import { Flex } from "@chakra-ui/react";
import { useLayoutEffect, useRef } from "react";

import { useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";

import { DiffItem } from "./DiffItem";

export const DiffContent = () => {
  const list = useGitHubCompareSourceList((s) => s.list);

  const workRef = useRef<Worker>();

  useLayoutEffect(() => {
    workRef.current = new Worker(new URL("@app/worker/diffView.worker", import.meta.url));

    return () => workRef.current.terminate();
  }, []);

  return (
    <Flex display="flex" flexDirection="column" rowGap="4">
      {list.map((item) => {
        return <DiffItem key={item.filename} item={item} workRef={workRef} />;
      })}
    </Flex>
  );
};
