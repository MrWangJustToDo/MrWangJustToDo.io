import { Skeleton } from "@chakra-ui/react";

import { useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";

import { DiffAside } from "./DiffAside";
import { DiffContent } from "./DiffContent";
import { DiffLayout } from "./DiffLayout";

const left = <DiffAside />;

const right = <DiffContent />;

export const DiffView = () => {
  const { loading } = useGitHubCompareSourceList((s) => ({ loading: s.loading }));

  if (loading) {
    return <Skeleton height="100vh" />;
  }

  return <DiffLayout aside={left} content={right} />;
};
