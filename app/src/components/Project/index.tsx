import {
  Box,
  Heading,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";
import { TbPackages } from "react-icons/tb";

import { useIsMobile } from "@app/hooks/useIsMobile";
import { useProject } from "@app/hooks/useProject";

import { GitDiffView, MyReact, RStore, SSR } from "../Recommend";

export const Project = () => {
  const isMobile = useIsMobile();

  const { isOpen, onClose, onOpen } = useProject();

  return (
    <>
      <IconButton color="gray" variant="outline" aria-label="projects" title="projects" onClick={onOpen} icon={<Icon as={TbPackages} fontSize="xl" />} />
      <Modal size={isMobile ? "full" : "4xl"} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent key="project" border="1px" borderRadius="md" borderColor="cardBorderColor">
          <ModalCloseButton />
          <ModalBody>
            <Heading as="h3">All Of My Projects:</Heading>
            <Spacer marginY="2em" />
            <Box
              display="grid"
              gridTemplateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
              columnGap="1em"
              rowGap="1em"
              paddingRight="2em"
            >
              <Box>
                <MyReact />
              </Box>
              <Box>
                <RStore />
              </Box>
              <Box>
                <SSR />
              </Box>
              <Box>
                <GitDiffView />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
