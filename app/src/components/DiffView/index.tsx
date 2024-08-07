import { Skeleton, Text } from "@chakra-ui/react";

import { useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";

import { Card } from "../Card";

import { DiffAside } from "./DiffAside";
import { DiffContent } from "./DiffContent";
import { DiffLayout } from "./DiffLayout";

export const DiffView = () => {
  const { loading, list } = useGitHubCompareSourceList((s) => ({ list: s.list, data: s.data, loading: s.loading }));

  if (loading) {
    return <Skeleton height="300px" />;
  }

  if (list.length === 0) {
    return (
      <Card boxShadow="none">
        <Text textAlign="center" marginY="4">
          Empty
        </Text>
      </Card>
    );
  }

  return <DiffLayout aside={<DiffAside />} content={<DiffContent />} />;
};
