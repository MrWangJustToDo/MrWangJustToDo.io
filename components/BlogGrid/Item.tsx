import { useRouter } from "next/router";
import { Text, Flex, Box, Icon, IconButton, Divider } from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { GetBlogListQuery } from "graphql/generated";
import { Hover } from "components/Hover";
import { useMemo } from "react";
import { markNOLineNumber } from "utils/markdown";
import { VscLinkExternal } from "react-icons/vsc";
import { Actor } from "components/Actor";

const ItemHeader = ({
  title,
  externalUrl,
  detailNumber,
}: {
  title: string;
  externalUrl: string;
  detailNumber: number;
}) => {
  const { push, query } = useRouter();

  const openModal = () =>
    push(
      {
        pathname: "/",
        query: {
          ...query,
          overlay: "open",
          detailId: detailNumber,
        },
      },
      undefined,
      { scroll: false }
    );
  const openExternal = () => window.open(externalUrl, "_blank");

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text
        fontSize={{ base: "18", md: "20", lg: "22" }}
        width="85%"
        fontWeight="medium"
        title={title}
        noOfLines={1}
      >
        {title}
      </Text>
      <Hover display="flex" alignItems="center">
        <IconButton
          aria-label="detail"
          onClick={openModal}
          variant="link"
          size="sm"
          icon={<Icon as={AiOutlineRight} userSelect="none" />}
        />
      </Hover>
      <Hover display="flex" alignItems="center">
        <IconButton
          size="sm"
          variant="link"
          aria-label="open"
          icon={<Icon as={VscLinkExternal} />}
          onClick={openExternal}
        />
      </Hover>
    </Flex>
  );
};

export const Item = (
  props: GetBlogListQuery["repository"]["issues"]["nodes"][0]
) => {
  const {
    title,
    number,
    body,
    publishedAt,
    author: { avatarUrl, login },
    url,
  } = props;
  const renderedBody = useMemo(() => markNOLineNumber.render(body), [body]);
  return (
    <Flex flexDirection="column" height="100%">
      <Box padding="2">
        <ItemHeader title={title} externalUrl={url} detailNumber={number} />
        <Actor
          avatarUrl={avatarUrl}
          login={login}
          time={publishedAt}
          marginTop="2"
          alignItems="center"
          avatarProps={{
            width: 6,
            height: 6,
          }}
        />
      </Box>
      <Divider />
      <Box
        className="typo"
        overflow={{ base: "hidden", lg: "auto" }}
        padding="2"
        fontSize="sm"
        dangerouslySetInnerHTML={{ __html: renderedBody }}
      />
    </Flex>
  );
};
