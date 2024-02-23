import { Box, HStack, Text } from "@chakra-ui/react";
import { countBy } from "lodash-es";
import React, { useMemo } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { getTargetEmoji } from "@app/utils/emoji";
import { getHighlightHtml } from "@app/utils/highlight";

import { Actor } from "../Actor";
import { Card } from "../Card";

import type { GetSingleBlogQuery, ReactionContent } from "@blog/graphql";

export const Item = (props: GetSingleBlogQuery["repository"]["issue"]["comments"]["nodes"][0]) => {
  const {
    body,
    author: { login, avatarUrl },
    updatedAt,
    reactions,
  } = props;
  const _reactions = useMemo(() => countBy(reactions?.nodes, (i) => i.content), [reactions]);
  return (
    <Card marginY="2" padding="2" backgroundColor="initial">
      <Actor
        avatarUrl={avatarUrl}
        login={login}
        time={updatedAt}
        alignItems="flex-end"
        avatarProps={{
          width: 6,
          height: 6,
        }}
      />
      <Box marginTop="3.5" className="typo" fontSize="small">
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
      <HStack gap={2}>
        {Object.keys(_reactions)
          .filter((i) => _reactions[i])
          .map((i: ReactionContent) => (
            <HStack key={i} fontSize="14px" color="gray" borderRadius="full" border="1px" paddingX="8px" paddingY="2px" borderColor="cardBorderColor">
              <Text>{getTargetEmoji(i)}</Text>
              <Text ml="2px">{_reactions[i]}</Text>
            </HStack>
          ))}
      </HStack>
    </Card>
  );
};
