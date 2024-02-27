/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery } from "@apollo/client";
import { GetRepoAboutDocument } from "@blog/graphql";
import { Box, CloseButton, Divider, Image, SkeletonText, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { getClass } from "@app/utils/dom";
import { getHighlightHtml } from "@app/utils/highlight";

import { Card } from "../Card";

const MotionCard = motion(Card);

export const ProjectItems = {
  MyReact: {
    owner: "mrwangjusttodo",
    name: "MyReact",
  },
  RStore: {
    owner: "mrwangjusttodo",
    name: "reactivity-store",
  },
  SSR: {
    owner: "mrwangjusttodo",
    name: "react-ssr-setup",
  },
  GitDiffView: {
    owner: "mrwangjusttodo",
    name: "git-diff-view",
  },
} as const;

export const Item = ({ type }: { type: keyof typeof ProjectItems }) => {
  const { data, loading } = useQuery(GetRepoAboutDocument, { variables: ProjectItems[type] });

  return (
    <MotionCard
      backgroundColor={{ base: "mobileCardBackgroundColor", sm: "transparent" }}
      width="100%"
      height="100%"
      padding="4px"
      paddingX="6px"
      paddingBottom="8px"
      boxShadow="sm"
      layoutId={type}
      textAlign="center"
    >
      <Text fontSize="20px" fontWeight="semibold">
        {type}
      </Text>
      <Divider marginY="0.2em" />
      <SkeletonText noOfLines={5} isLoaded={!loading}>
        <Text color="slategrey" textAlign="left" _firstLetter={{ fontSize: "1.4em" }}>
          {data?.repository?.description}
        </Text>
      </SkeletonText>
    </MotionCard>
  );
};

export const ReadMe = ({ type, onClose }: { type: keyof typeof ProjectItems; onClose: () => void }) => {
  const { data, loading } = useQuery(GetRepoAboutDocument, { variables: ProjectItems[type] });

  const [animateDone, setAnimateDone] = useState(false);

  console.log(data);

  return (
    <Box
      style={{
        position: "fixed",
        top: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "4px",
        left: "50%",
        display: "flex",
        width: "fit-content",
        height: "fit-content",
        justifyContent: "center",
        justifySelf: "center",
        alignContent: "center",
      }}
      maxWidth={{ base: "100%", md: "90vw", lg: "80vw", xl: "70vw", "2xl": "60vw" }}
    >
      <MotionCard
        width="100%"
        maxHeight={{ base: "100vh", md: "90vh" }}
        paddingX="6px"
        paddingY="8px"
        boxShadow="sm"
        layoutId={type}
        overflow="auto"
        backgroundColor="Background"
        onLayoutAnimationComplete={() => setAnimateDone(true)}
      >
        <CloseButton onClick={onClose} position="absolute" right="10px" top="10px" zIndex="dropdown" />
        <SkeletonText noOfLines={40} isLoaded={!loading && animateDone}>
          <Box className="typo" marginTop="3.5" fontSize={{ base: "sm", lg: "md" }}>
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code(props) {
                  const { children, className } = props;
                  const lang = className?.split("-")[1];
                  if (lang) {
                    return (
                      <Box
                        className={getClass(className, "border", "rounded")}
                        sx={{
                          "&>pre": {
                            margin: 0,
                          },
                        }}
                        dangerouslySetInnerHTML={{ __html: getHighlightHtml(children as string, lang) }}
                      />
                    );
                  } else {
                    return <code className={className}>{children}</code>;
                  }
                },
                img(props) {
                  const { src, alt } = props;
                  if (src.startsWith("http")) {
                    return <Image {...props} alt={alt} marginY="4" />;
                  } else {
                    const targetSrc = `${data.repository.url}/raw/main/${src}`;
                    return <Image {...props} src={targetSrc} alt={alt} marginY="4" />;
                  }
                },
              }}
            >
              {/* @ts-expect-error */}
              {data?.repository?.read1?.text || data?.repository?.read2?.text || ""}
            </Markdown>
          </Box>
        </SkeletonText>
      </MotionCard>
    </Box>
  );
};
