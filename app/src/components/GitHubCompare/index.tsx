import { Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tooltip } from "@chakra-ui/react";
import { GoGitCompare } from "react-icons/go";

import { useGitHubCompare } from "@app/hooks/useGitHubCompare";
import { useGitHubCompareScrollContainer } from "@app/hooks/useGitHubCompareScrollContainer";
import { Page } from "@app/views/compare";

const { setEle } = useGitHubCompareScrollContainer.getActions();

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
        icon={<Icon as={GoGitCompare} fontSize="xl" />}
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
        <ModalCloseButton zIndex="overlay" />
        <ModalBody paddingY="0" data-id="diff-view-body" ref={setEle}>
          <Page />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
