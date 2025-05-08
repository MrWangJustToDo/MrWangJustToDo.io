/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery } from "@apollo/client";
import { GetRepoAboutDocument } from "@blog/graphql";
import { Badge, Box, Button, CloseButton, Code, Divider, Flex, Icon, Image, Link, Skeleton, SkeletonText, Spacer, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { StarIcon as GoStarFill } from "lucide-react";
import { cloneElement, isValidElement, useState } from "react";
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
  DevTools: {
    owner: "mrwangjusttodo",
    name: "myreact-devtools",
  },
} as const;

export const Item = ({
  type,
  onOpenReadme,
  onOpenPreview,
  singleModel,
}: {
  type: keyof typeof ProjectItems;
  onOpenReadme: () => void;
  onOpenPreview: () => void;
  singleModel?: boolean;
}) => {
  const { data, loading } = useQuery(GetRepoAboutDocument, { variables: ProjectItems[type] });

  return (
    <MotionCard
      backgroundColor={{ base: "mobileCardBackgroundColor", sm: "transparent" }}
      width="100%"
      height="100%"
      padding={singleModel ? "8px" : "4px"}
      paddingX={singleModel ? "10px" : "6px"}
      display="flex"
      flexDirection="column"
      key={loading ? type + "loading" : type}
      paddingBottom="8px"
      boxShadow="sm"
      layoutId={loading ? type + "loading" : type}
      textAlign="center"
      border="1px solid red"
    >
      <Text fontSize="20px" fontWeight="semibold" position="relative">
        {type}{" "}
        {loading ? (
          ""
        ) : (
          <Badge
            colorScheme="orange"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            right="0"
            top="50%"
            transform="translateY(-50%)"
          >
            <Icon as={GoStarFill} marginRight="1" fill="currentcolor" />
            {data?.repository?.stargazerCount}
          </Badge>
        )}
      </Text>
      <Divider marginY="0.2em" />
      <SkeletonText noOfLines={5} isLoaded={!loading}>
        <Text color="slategrey" textAlign="left" _firstLetter={{ fontSize: "1.4em" }}>
          {data?.repository?.description}
        </Text>
      </SkeletonText>
      <Spacer marginY="2" />
      <Flex justifySelf="right" width="full" justifyContent={singleModel ? "space-between" : "space-around"}>
        <Button variant="outline" colorScheme="blue" onClick={onOpenReadme}>
          Readme
        </Button>
        {singleModel && (
          <Button variant="outline" colorScheme="cyan" as={Link} href={data?.repository?.url} target="_blank">
            Github
          </Button>
        )}
        <Button variant="outline" colorScheme="green" onClick={onOpenPreview}>
          Preview
        </Button>
      </Flex>
    </MotionCard>
  );
};

export const ReadMe = ({ type, onClose }: { type: keyof typeof ProjectItems; onClose: () => void }) => {
  const { data, loading } = useQuery(GetRepoAboutDocument, { variables: ProjectItems[type] });

  const [animateDone, setAnimateDone] = useState(false);

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
      minWidth={{ base: "100%", md: "40vw" }}
      minHeight="10vh"
    >
      <MotionCard
        width="100%"
        maxHeight={{ base: "100vh", md: "90vh" }}
        paddingX="6px"
        paddingY="8px"
        boxShadow="sm"
        layoutId={type}
        overflow="auto"
        backgroundColor="simpleCardBackgroundColor"
        onLayoutAnimationComplete={() => setAnimateDone(true)}
      >
        <CloseButton onClick={onClose} position="absolute" right="10px" top="10px" zIndex="dropdown" />
        <SkeletonText noOfLines={40} isLoaded={!loading && animateDone}>
          <Box className="typo" marginTop="3.5" fontSize={{ base: "sm", lg: "md" }}>
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
                    return <Code className={className}>{children}</Code>;
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
              {(data?.repository?.read1 && "text" in data.repository.read1 ? data.repository.read1.text : "") ||
                (data?.repository?.read2 && "text" in data.repository.read2 ? data.repository.read2.text : "") ||
                ""}
            </Markdown>
          </Box>
        </SkeletonText>
      </MotionCard>
    </Box>
  );
};

export const Preview = ({ type, onClose }: { type: keyof typeof ProjectItems; onClose: () => void }) => {
  const { data, loading } = useQuery(GetRepoAboutDocument, { variables: ProjectItems[type] });

  const [animateDone, setAnimateDone] = useState(false);

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
      minWidth={{ base: "100%", md: "initial" }}
    >
      <MotionCard
        width="100%"
        maxHeight={{ base: "100vh", md: "90vh" }}
        paddingX="6px"
        paddingY="8px"
        boxShadow="sm"
        layoutId={type}
        overflow="auto"
        backgroundColor="simpleCardBackgroundColor"
        onLayoutAnimationComplete={() => setAnimateDone(true)}
      >
        <CloseButton onClick={onClose} position="absolute" right="10px" top="10px" zIndex="dropdown" />
        <Skeleton isLoaded={!loading && animateDone} width="800px" minHeight="20vh" overflow="auto">
          <iframe src={data.repository.homepageUrl || data.repository.url} width="1200px" height="800px" />
        </Skeleton>
      </MotionCard>
    </Box>
  );
};
