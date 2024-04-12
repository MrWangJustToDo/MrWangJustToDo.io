import { Container, useBreakpointValue } from "@chakra-ui/react";

import { CONTAINER_WIDTH } from "@app/config/container";
import { Home } from "@app/containers/Home";
import { WalkMe } from "@app/containers/WalkMe";
import { useEffectOnce } from "@app/hooks/useEffectOnce";
import { useType } from "@app/hooks/useType";

export const Page = (p: { ReactType: string; ReactDOMType: string }) => {
  const set = useType((s) => s.set);

  const isMobileWidth = useBreakpointValue({ base: true, md: false });

  useEffectOnce(() => {
    set(p.ReactType + "\n" + p.ReactDOMType);
  });

  return (
    <Container maxWidth={CONTAINER_WIDTH}>
      <WalkMe />
      <Home isMobileWidth={isMobileWidth} />
    </Container>
  );
};
