import { Box, SimpleGrid, SkeletonText } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { memo, useEffect, useRef } from "react";

import { Card } from "@app/components/Card";
import { useFetchLeetCode } from "@app/hooks/useFetchLeetCode";
import { hljs } from "@app/utils/highlight";

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

const _LeetCodeContent = () => {
  const { content, loading } = useFetchLeetCode();

  if (loading) return <LeetCodeListLoading />;

  return (
    <SimpleGrid width="100%" padding="2" columns={{ base: 1, lg: 2, xl: 3 }} spacing={3}>
      {content.map((file) =>
        file.map((c) => {
          if (!c) return null;
          return (
            <Card key={c} maxHeight={{ base: "96", lg: "440px" }} overflow="auto">
              <Content>{c}</Content>
            </Card>
          );
        }),
      )}
    </SimpleGrid>
  );
};

export const LeetCodeContent = memo(_LeetCodeContent);
