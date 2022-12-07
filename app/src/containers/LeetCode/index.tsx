import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";

import { useLeetCode } from "@app/hooks/useLeetCode";

import { LeetCodeContent } from "./LeetCode";

export const LeetCode = () => {
  const { isOpen, onClose } = useLeetCode();

  return (
    <Modal size="full" isOpen={isOpen} scrollBehavior="inside" onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody id="modal-scroll-box" paddingTop="0" paddingX={{ base: 0, sm: 2, md: 4, lg: 6 }}>
          <LeetCodeContent />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
