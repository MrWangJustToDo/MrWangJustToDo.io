import { useQuery } from "@apollo/client";
import { GetRepoAboutDocument } from "@blog/graphql";
import { Link, Text } from "@chakra-ui/react";

import { Card } from "../Card";

export const MyReact = () => {
  const { data } = useQuery(GetRepoAboutDocument, { variables: { owner: "mrwangjusttodo", name: "MyReact" } });

  return (
    <Card backgroundColor={{ base: "mobileCardBackgroundColor", sm: "transparent" }} width="100%" padding="4px" paddingX="6px" paddingBottom="8px" _firstLetter={{ fontSize: "2em" }} boxShadow="sm">
      <Link href={data?.repository?.url} target="_blank" fontWeight="500" textDecoration="underline">
        <Text as="span">My-react</Text>:{" "}
        <Text as="span" color="slategrey">
          {data?.repository?.description}
        </Text>
      </Link>
    </Card>
  );
};

export const RStore = () => {
  const { data } = useQuery(GetRepoAboutDocument, { variables: { owner: "mrwangjusttodo", name: "reactivity-store" } });

  return (
    <Card backgroundColor={{ base: "mobileCardBackgroundColor", sm: "transparent" }} width="100%" padding="4px" paddingX="6px" paddingBottom="8px" _firstLetter={{ fontSize: "2em" }} boxShadow="sm">
      <Link href={data?.repository?.url} target="_blank" fontWeight="500" textDecoration="underline">
        <Text as="span">RStore</Text>:{" "}
        <Text as="span" color="slategrey">
          {data?.repository?.description}
        </Text>
      </Link>
    </Card>
  );
};

export const SSR = () => {
  const { data } = useQuery(GetRepoAboutDocument, { variables: { owner: "mrwangjusttodo", name: "react-ssr-setup" } });

  return (
    <Card backgroundColor={{ base: "mobileCardBackgroundColor", sm: "transparent" }} width="100%" padding="4px" paddingX="6px" paddingBottom="8px" _firstLetter={{ fontSize: "2em" }} boxShadow="sm">
      <Link href={data?.repository?.url} target="_blank" fontWeight="500" textDecoration="underline">
        <Text as="span">SSR template</Text>:{" "}
        <Text as="span" color="slategrey">
          {data?.repository?.description}
        </Text>
      </Link>
    </Card>
  );
};

export const GitDiffView = () => {
  const { data } = useQuery(GetRepoAboutDocument, { variables: { owner: "mrwangjusttodo", name: "git-diff-view" } });

  return (
    <Card backgroundColor={{ base: "mobileCardBackgroundColor", sm: "transparent" }} width="100%" padding="4px" paddingX="6px" paddingBottom="8px" _firstLetter={{ fontSize: "2em" }} boxShadow="sm">
      <Link href={data?.repository?.url} target="_blank" fontWeight="500" textDecoration="underline">
        <Text as="span">Git-diff-view</Text>:{" "}
        <Text as="span" color="slategrey">
          {data?.repository?.description}
        </Text>
      </Link>
    </Card>
  );
};
