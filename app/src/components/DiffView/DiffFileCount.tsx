import { Text } from "@chakra-ui/react";

import { useGitHubCompareSourceList } from "@app/hooks/useGitHubCompareSource";

export const DiffFileCount = () => {
  const { list, loading } = useGitHubCompareSourceList((s) => ({ list: s.list, loading: s.loading }));

  return (
    !loading && (
      <Text fontSize="2xl" fontWeight="bold">
        {list.length} files changed
      </Text>
    )
  );
};
