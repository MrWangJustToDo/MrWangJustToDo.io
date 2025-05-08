import { Text, Flex, Box, Icon, IconButton, Divider, Tooltip, Code } from "@chakra-ui/react";
import { ChevronRightIcon as GoChevronRight, SquareArrowOutUpRightIcon as GoLinkExternal } from "lucide-react";
import { useRouter } from "next/router";
import React, { cloneElement, isValidElement, memo } from "react";
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
        <IconButton aria-label="detail" onClick={openModal} variant="link" size="sm" fontSize="large" icon={<Icon as={GoChevronRight} userSelect="none" />} />
      </Hover>
      <Hover display="flex" alignItems="center">
        <IconButton size="sm" variant="link" aria-label="open" icon={<Icon as={GoLinkExternal} />} onClick={openExternal} />
      </Hover>
    </Flex>
  );
};

export const Item = memo((props: GetBlogListQuery["repository"]["issues"]["nodes"][0]) => {
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
            pre(props) {
              const { node, children, ...res } = props;
              if (node.children?.length === 1 && typeof node.children[0] === "object" && (node.children[0] as any).tagName === "code") {
                return (
                  <div className="w-full overflow-auto">
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-expect-error */}
                    <pre>{isValidElement(children) ? cloneElement(children, { className: children.props.className || "lang-unknown" }) : children}</pre>
                  </div>
                );
              }
              return <pre {...res}>{children}</pre>;
            },
            code(props) {
              const { children, className } = props;
              const lang = className?.split("-")[1];
              if (lang) {
                return <div className={className} dangerouslySetInnerHTML={{ __html: getHighlightHtml(children as string, lang) }} />;
              } else {
                return <Code className={className}>{children}</Code>;
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
});

Item.displayName = "Item";
