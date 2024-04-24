import { useQuery } from "@apollo/client";
import { GetRepoAboutDocument } from "@blog/graphql";
import { Badge, Icon, StackDivider, Text, VStack } from "@chakra-ui/react";
import { VscStarFull } from "react-icons/vsc";

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
      cursor="pointer"
      _firstLetter={{ fontSize: "2em" }}
      boxShadow="sm"
    >
      <Badge colorScheme="orange" float="right" display="flex" alignItems="center">
        <Icon as={VscStarFull} marginRight="1" />
        {data?.repository?.stargazerCount}
      </Badge>
      <Text as="span">{type}</Text>:{" "}
      <Text as="span" color="slategrey" textDecoration="underline">
        {data?.repository?.description}
      </Text>
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
    </VStack>
  );
};
