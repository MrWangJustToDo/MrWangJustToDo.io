import { Container, Text, Link, Flex, Heading, Box } from "@chakra-ui/react";

import { CONTAINER_WIDTH } from "@app/config/container";
import { useGitHubCompareSourceState } from "@app/hooks/useGitHubCompareSource";

import { Card } from "../Card";

import { DiffLink } from "./DiffLink";
import { DiffView } from "./DiffView";

export const GitHubCompareContent = () => {
  const { url } = useGitHubCompareSourceState();

  return (
    <Container maxWidth={CONTAINER_WIDTH} height="100%">
      <Flex marginTop="2" alignItems="baseline">
        <Heading as="h3">GitHub Compare</Heading>
        <small>
          <Text marginX="2">power by</Text>
        </small>
        <small>
          <Link color="purple.500" href="https://github.com/MrWangJustToDo/git-diff-view" target="_blank" textDecoration="underline" textUnderlineOffset={4}>
            @git-diff-view
          </Link>
        </small>
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
