import { Box, Heading, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spacer } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TbPackages } from "react-icons/tb";

import { useProject } from "@app/hooks/useProject";

import { Item, ReadMe } from "./Items";

import type { ProjectItems } from "./Items";

export const Project = () => {
  const { isOpen, onClose, onOpen } = useProject();

  const [type, setType] = useState<keyof typeof ProjectItems>();

  useEffect(() => {
    if (!isOpen) {
      setType(undefined);
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
            <Heading as="h3">All Of My Projects:</Heading>
            <Spacer marginY="2em" />
            <AnimatePresence>
              <Box
                display="grid"
                gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                columnGap="1em"
                rowGap="1em"
                paddingRight="2em"
              >
                <Box onClick={() => setType("MyReact")} cursor="pointer">
                  <Item type="MyReact" />
                </Box>
                <Box onClick={() => setType("RStore")} cursor="pointer">
                  <Item type="RStore" />
                </Box>
                <Box onClick={() => setType("SSR")} cursor="pointer">
                  <Item type="SSR" />
                </Box>
                <Box onClick={() => setType("GitDiffView")} cursor="pointer">
                  <Item type="GitDiffView" />
                </Box>
              </Box>

              {type && <ReadMe key={type} type={type} onClose={() => setType(undefined)} />}
            </AnimatePresence>
            <Spacer marginY="3em" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
