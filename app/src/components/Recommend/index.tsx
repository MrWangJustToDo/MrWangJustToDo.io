import { useQuery } from "@apollo/client";
import { GetRepoAboutDocument } from "@blog/graphql";
import { Badge, Icon, Link, StackDivider, Text, VStack } from "@chakra-ui/react";
import { VscStarFull } from "react-icons/vsc";

import { Card } from "../Card";
import { ProjectItems } from "../Project/Items";

const RecommendItem = ({ type, onClick }: { type: keyof typeof ProjectItems; onClick?: () => void }) => {
  const { data } = useQuery(GetRepoAboutDocument, { variables: ProjectItems[type] });

  return (
    <Card
      backgroundColor={{ base: "mobileCardBackgroundColor", sm: "transparent" }}
      width="100%"
      height="100%"
      padding="4px"
      paddingX="6px"
      paddingBottom="8px"
      onClick={onClick}
      cursor="pointer"
      _firstLetter={{ fontSize: "2em" }}
      boxShadow="sm"
    >
      <Badge colorScheme="orange" float="right" display="flex" alignItems="center">
        <Icon as={VscStarFull} marginRight="1" />
        {data?.repository?.stargazerCount}
      </Badge>
      <Text as="span">{type}</Text>:{" "}
      <Link href={data?.repository?.url} target="_blank" fontWeight="500" textDecoration="underline">
        <Text as="span" color="slategrey">
          {data?.repository?.description}
        </Text>
      </Link>
    </Card>
  );
};

export const Recommend = () => {
  return (
    <VStack divider={<StackDivider />} spacing="2" marginTop="1">
      <RecommendItem type="MyReact" />
      <RecommendItem type="RStore" />
      <RecommendItem type="SSR" />
      <RecommendItem type="GitDiffView" />
    </VStack>
  );
};
