import { Box, Heading, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spacer, Tooltip } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TbPackages } from "react-icons/tb";

import { useCurrentProject, useProject } from "@app/hooks/useProject";

import { Item, Preview, ReadMe } from "./Items";

import type { ProjectItems } from "./Items";

const setCurrentProject = useCurrentProject.getActions().setProject;

export const Project = () => {
  const { isOpen, onClose, onOpen } = useProject();

  const data = useCurrentProject((s) => s.data) as keyof typeof ProjectItems | null;

  const [type, setType] = useState<keyof typeof ProjectItems>();

  const [_type, set_Type] = useState<keyof typeof ProjectItems>();

  useEffect(() => {
    if (!isOpen) {
      setType(undefined);
      set_Type(undefined);
    }
  }, [isOpen]);

  return (
    <>
      <Tooltip label="Projects">
        <IconButton
          color="gray"
          variant="outline"
          aria-label="projects"
          title="projects"
          size="sm"
          onClick={onOpen}
          icon={<Icon as={TbPackages} fontSize="xl" />}
        />
      </Tooltip>
      <Modal
        size={data ? { base: "lg" } : { base: "full", md: "lg", lg: "2xl", xl: "3xl" }}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        closeOnOverlayClick={!type}
        onCloseComplete={() => setCurrentProject(null)}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent key="project" border="1px" borderRadius="md" borderColor="cardBorderColor">
          <ModalCloseButton />
          <ModalBody overflow="auto">
            <Heading as="h3">{data ? "Project:" : "Projects:"}</Heading>
            <Spacer marginY="2em" />
            <AnimatePresence>
              {!data ? (
                <Box display="grid" gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} columnGap="1em" rowGap="1em">
                  <Item type="MyReact" onOpenReadme={() => setType("MyReact")} onOpenPreview={() => set_Type("MyReact")} />
                  <Item type="RStore" onOpenReadme={() => setType("RStore")} onOpenPreview={() => set_Type("RStore")} />
                  <Item type="SSR" onOpenReadme={() => setType("SSR")} onOpenPreview={() => set_Type("SSR")} />
                  <Item type="GitDiffView" onOpenReadme={() => setType("GitDiffView")} onOpenPreview={() => set_Type("GitDiffView")} />
                  <Item type="DevTools" onOpenReadme={() => setType("DevTools")} onOpenPreview={() => set_Type("DevTools")} />
                </Box>
              ) : (
                <Box maxWidth="360px" marginX="auto">
                  <Item type={data} onOpenReadme={() => setType(data)} onOpenPreview={() => set_Type(data)} singleModel />
                </Box>
              )}

              {type && <ReadMe key={type} type={type} onClose={() => setType(undefined)} />}

              {_type && <Preview key={_type} type={_type} onClose={() => set_Type(undefined)} />}
            </AnimatePresence>
            <Spacer marginY="3em" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
