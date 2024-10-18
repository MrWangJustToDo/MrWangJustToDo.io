import { Container, Text, Link, Flex, Heading, Box, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { version } from "@git-diff-view/react";

import { Card } from "@app/components/Card";
import { DiffLink } from "@app/components/DiffLink";
import { DiffView } from "@app/components/DiffView";
import { CONTAINER_WIDTH } from "@app/config/container";
import { useExample, useInComparePage } from "@app/hooks/useExample";
import { useGitHubCompareSourceState } from "@app/hooks/useGitHubCompareSource";

export const Page = () => {
  const { url } = useGitHubCompareSourceState();

  useExample();

  const large = useBreakpointValue({ base: false, md: true });

  const inCompare = useInComparePage();

  return (
    <Container
      maxWidth={CONTAINER_WIDTH}
      padding="4"
      id="diff-view-body"
      backgroundColor="mobileCardBackgroundColor"
      overflow={inCompare ? "auto" : "initial"}
      height={inCompare ? "100vh" : "initial"}
      paddingTop={inCompare ? "0" : undefined}
    >
      <Flex marginTop="2" alignItems="baseline">
        <Heading as="h3">GitHub Commit Compare</Heading>
        {large && (
          <>
            <small>
              <Text marginX="2">power by</Text>
            </small>
            <small>
              <Tooltip label={`Go to @git-diff-view project, version: ${version}`} placement="top" hasArrow>
                <Link
                  color="purple.500"
                  href="https://github.com/MrWangJustToDo/git-diff-view"
                  target="_blank"
                  textDecoration="underline"
                  textUnderlineOffset={4}
                >
                  @git-diff-view
                </Link>
              </Tooltip>
            </small>
          </>
        )}
      </Flex>
      <Card padding="2" fontSize="sm" marginTop="2" boxShadow="none" sx={{ "& *": { fontSize: "inherit" } }}>
        <DiffLink url={url} />
      </Card>
      <Box marginTop="2">
        <DiffView />
      </Box>
    </Container>
  );
};

Page.disableLayout = true;
