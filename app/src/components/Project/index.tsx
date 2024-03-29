import { Box, Heading, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spacer } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TbPackages } from "react-icons/tb";

import { useProject } from "@app/hooks/useProject";

import { Item, Preview, ReadMe } from "./Items";

import type { ProjectItems } from "./Items";

export const Project = () => {
  const { isOpen, onClose, onOpen } = useProject();

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
      <IconButton color="gray" variant="outline" aria-label="projects" title="projects" onClick={onOpen} icon={<Icon as={TbPackages} fontSize="xl" />} />
      <Modal size={{ base: "full", md: "lg", lg: "2xl", xl: "3xl" }} isOpen={isOpen} onClose={onClose} scrollBehavior="inside" closeOnOverlayClick={!type}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent key="project" border="1px" borderRadius="md" borderColor="cardBorderColor">
          <ModalCloseButton />
          <ModalBody overflow="auto">
            <Heading as="h3">Projects:</Heading>
            <Spacer marginY="2em" />
            <AnimatePresence>
              <Box
                display="grid"
                gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                columnGap="1em"
                rowGap="1em"
                paddingRight="2em"
              >
                <Item type="MyReact" onOpenReadme={() => setType("MyReact")} onOpenPreview={() => set_Type("MyReact")} />
                <Item type="RStore" onOpenReadme={() => setType("RStore")} onOpenPreview={() => set_Type("RStore")} />
                <Item type="SSR" onOpenReadme={() => setType("SSR")} onOpenPreview={() => set_Type("SSR")} />
                <Item type="GitDiffView" onOpenReadme={() => setType("GitDiffView")} onOpenPreview={() => set_Type("GitDiffView")} />
              </Box>

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
