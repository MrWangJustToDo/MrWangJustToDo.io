import { Box, HStack, Text } from "@chakra-ui/react";
import { countBy } from "lodash-es";
import { useMemo } from "react";

import { getTargetEmoji } from "@app/utils/emoji";
import { mark } from "@app/utils/markdown";

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
  const rendered = useMemo(() => mark.render(body), [body]);
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
      <Box marginTop="3.5" className="typo" fontSize="small" dangerouslySetInnerHTML={{ __html: rendered }} />
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
