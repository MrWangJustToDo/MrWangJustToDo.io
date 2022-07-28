import { Divider, Flex } from "@chakra-ui/react";

import { useIsMobile } from "hooks/useIsMobile";

import { Content } from "./Content";
import { Footer } from "./Footer";
import { Title } from "./Title";

import type { ContainerProps } from "../types";

export const Container = ({ steps, stepIndex, stepLen, actions }: ContainerProps) => {
  const isMobile = useIsMobile();
  const step = steps[stepIndex];
  return (
    <Flex width={isMobile ? "240px" : "320px"} flexDirection="column" paddingX="4" paddingY="2">
      <Title steps={steps} stepIndex={stepIndex} stepLen={stepLen} actions={actions}>
        {step?._title}
      </Title>
      <Divider marginY={{ base: "1", lg: "2.5" }} />
      <Content steps={steps} stepIndex={stepIndex} stepLen={stepLen} actions={actions}>
        {step?._content}
      </Content>
      <Footer steps={steps} stepIndex={stepIndex} stepLen={stepLen} actions={actions} />
    </Flex>
  );
};
