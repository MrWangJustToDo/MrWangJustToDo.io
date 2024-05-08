import { Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tooltip } from "@chakra-ui/react";
import { IoMdGitCompare } from "react-icons/io";

import { useGitHubCompare } from "@app/hooks/useGitHubCompare";

import { GitHubCompareContent } from "./Item";

export const GitHubCompare = () => {
  const { isOpen, onClose, onOpen } = useGitHubCompare();

  return (
    <>
      <Tooltip label="GitHubCompare">
        <IconButton
          color="gray"
          variant="outline"
          aria-label="GitHubCompare"
          title="GitHubCompare"
          size="sm"
          onClick={onOpen}
          icon={<Icon as={IoMdGitCompare} fontSize="xl" />}
        />
      </Tooltip>
      <Modal size="full" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent border="1px" borderRadius="md" borderColor="cardBorderColor">
          <ModalCloseButton />
          <ModalBody>
            <GitHubCompareContent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
