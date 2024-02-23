import { Text, Flex, Box, Icon, IconButton, Divider, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { VscLinkExternal } from "react-icons/vsc";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { getHighlightHtml } from "@app/utils/highlight";

import { Actor } from "../Actor";
import { Hover } from "../Hover";

import type { GetBlogListQuery } from "@blog/graphql";

const ItemHeader = ({ title, externalUrl, detailNumber }: { title: string; externalUrl: string; detailNumber: number }) => {
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
      { scroll: false },
    );

  const openExternal = () => window.open(externalUrl, "_blank");

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Tooltip label={title} placement="top" hasArrow>
        <Text fontSize={{ base: "18", md: "20", lg: "22" }} width="85%" fontWeight="medium" noOfLines={1}>
          {title}
        </Text>
      </Tooltip>
      <Hover display="flex" alignItems="center">
        <IconButton aria-label="detail" onClick={openModal} variant="link" size="sm" icon={<Icon as={AiOutlineRight} userSelect="none" />} />
      </Hover>
      <Hover display="flex" alignItems="center">
        <IconButton size="sm" variant="link" aria-label="open" icon={<Icon as={VscLinkExternal} />} onClick={openExternal} />
      </Hover>
    </Flex>
  );
};

export const Item = (props: GetBlogListQuery["repository"]["issues"]["nodes"][0]) => {
  const {
    title,
    number,
    body,
    publishedAt,
    author: { avatarUrl, login },
    url,
  } = props;
  return (
    <Flex flexDirection="column" height="100%">
      <Box padding="2" borderTopRadius="md">
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
      <Box className="typo" overflow={{ base: "hidden", lg: "auto" }} padding="2" fontSize="sm" borderBottomRadius="md">
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code(props) {
              const { children, className } = props;
              const lang = className?.split("-")[1];
              if (lang) {
                return <div className={className} dangerouslySetInnerHTML={{ __html: getHighlightHtml(children as string, lang) }} />;
              } else {
                return <code className={className}>{children}</code>;
              }
            },
          }}
        >
          {body}
        </Markdown>
      </Box>
      {/* {renderers.react(content, React)} */}
      {/* <Box
        className="typo"
        overflow={{ base: "hidden", lg: "auto" }}
        padding="2"
        fontSize="sm"
        borderBottomRadius="md"
        dangerouslySetInnerHTML={{ __html: renderedBody }}
      /> */}
    </Flex>
  );
};
