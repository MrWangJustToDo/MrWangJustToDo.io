import { useQuery } from "@apollo/client";
import { GetRepoAboutDocument } from "@blog/graphql";
import { Badge, Icon, StackDivider, Text, VStack, Flex } from "@chakra-ui/react";
import { DownloadIcon, StarIcon as GoStarFill } from "lucide-react";
import { useEffect, useState } from "react";

import { useCurrentProject, useProject } from "@app/hooks/useProject";

import { Card } from "../Card";
import { ProjectItems } from "../Project/Items";

const NpmPackageMap: Partial<Record<keyof typeof ProjectItems, string>> = {
  MyReact: "@my-react/react",
  RStore: "reactivity-store",
  GitDiffView: "@git-diff-view/react",
  DevTools: "@my-react/react-refresh-tools",
};

const useNpmDownloads = (type: keyof typeof ProjectItems) => {
  const [downloads, setDownloads] = useState<number | null>(null);
  const pkg = NpmPackageMap[type];

  useEffect(() => {
    if (!pkg) return;
    fetch(`https://api.npmjs.org/downloads/point/last-month/${pkg}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.downloads != null) setDownloads(data.downloads);
      })
      .catch(() => {});
  }, [pkg]);

  return downloads;
};

const formatDownloads = (count: number) => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
};

const setCurrentProject = useCurrentProject.getActions().setProject;

const RecommendItem = ({ type, onClick }: { type: keyof typeof ProjectItems; onClick?: () => void }) => {
  const { data } = useQuery(GetRepoAboutDocument, { variables: ProjectItems[type] });
  const downloads = useNpmDownloads(type);

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
      <Flex position="absolute" right="6px" gap="2">
        {downloads != null && (
          <Badge colorScheme="green" display="flex" alignItems="center">
            <Icon as={DownloadIcon} marginRight="1" />
            {formatDownloads(downloads)}/mo
          </Badge>
        )}
        <Badge colorScheme="orange" display="flex" alignItems="center">
          <Icon as={GoStarFill} marginRight="1" fill="currentcolor" />
          {data?.repository?.stargazerCount}
        </Badge>
      </Flex>
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
      <RecommendItem type="DevTools" onClick={() => setCurrentProject("DevTools")} />
      <RecommendItem type="GitDiffView" onClick={() => setCurrentProject("GitDiffView")} />
      <RecommendItem type="RStore" onClick={() => setCurrentProject("RStore")} />
      <RecommendItem type="SSR" onClick={() => setCurrentProject("SSR")} />
      <RecommendItem type="MyAgent" onClick={() => setCurrentProject("MyAgent")} />
    </VStack>
  );
};
