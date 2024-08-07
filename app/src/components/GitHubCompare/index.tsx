import { Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tooltip } from "@chakra-ui/react";
import { IoMdGitCompare } from "react-icons/io";

import { useGitHubCompare } from "@app/hooks/useGitHubCompare";
import { Page } from "@app/views/compare";

export const GitHubCompare = () => {
  const { onOpen } = useGitHubCompare();

  return (
    <Tooltip label="GitHub Commit Compare">
      <IconButton
        color="gray"
        variant="outline"
        aria-label="GitHubCompare"
        title="GitHub Commit Compare"
        size="sm"
        onClick={onOpen}
        icon={<Icon as={IoMdGitCompare} fontSize="xl" />}
      />
    </Tooltip>
  );
};

export const GitHubCompareModal = () => {
  const { isOpen, onClose } = useGitHubCompare();

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent border="1px" borderRadius="md" borderColor="cardBorderColor">
        <ModalCloseButton />
        <ModalBody paddingY="0" data-id="diff-view-body">
          <Page />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
