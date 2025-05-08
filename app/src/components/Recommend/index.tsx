import { useQuery } from "@apollo/client";
import { GetRepoAboutDocument } from "@blog/graphql";
import { Badge, Icon, StackDivider, Text, VStack, Flex } from "@chakra-ui/react";
import { StarIcon as GoStarFill } from "lucide-react";

import { useCurrentProject, useProject } from "@app/hooks/useProject";

import { Card } from "../Card";
import { ProjectItems } from "../Project/Items";

const setCurrentProject = useCurrentProject.getActions().setProject;

const RecommendItem = ({ type, onClick }: { type: keyof typeof ProjectItems; onClick?: () => void }) => {
  const { data } = useQuery(GetRepoAboutDocument, { variables: ProjectItems[type] });

  const { onOpen } = useProject();

  return (
    <Card
      backgroundColor={{ base: "mobileCardBackgroundColor", sm: "transparent" }}
      width="100%"
      height="100%"
      padding="4px"
      paddingX="6px"
      paddingBottom="8px"
      onClick={() => {
        onClick();
        onOpen();
      }}
      position="relative"
      cursor="pointer"
      boxShadow="sm"
    >
      <Badge colorScheme="orange" display="flex" alignItems="center" position="absolute" right="6px">
        <Icon as={GoStarFill} marginRight="1" fill="currentcolor" />
        {data?.repository?.stargazerCount}
      </Badge>
      <Flex alignItems="baseline" marginTop="2">
        <Text _firstLetter={{ fontSize: "2em" }} marginRight="1">
          {type}:
        </Text>
        <Text color="slategrey" textDecoration="underline" noOfLines={1} title={data?.repository?.description}>
          {data?.repository?.description}
        </Text>
      </Flex>
    </Card>
  );
};

export const Recommend = () => {
  return (
    <VStack divider={<StackDivider />} spacing="2" marginTop="1">
      <RecommendItem type="MyReact" onClick={() => setCurrentProject("MyReact")} />
      <RecommendItem type="RStore" onClick={() => setCurrentProject("RStore")} />
      <RecommendItem type="SSR" onClick={() => setCurrentProject("SSR")} />
      <RecommendItem type="GitDiffView" onClick={() => setCurrentProject("GitDiffView")} />
      <RecommendItem type="DevTools" onClick={() => setCurrentProject("DevTools")} />
    </VStack>
  );
};
