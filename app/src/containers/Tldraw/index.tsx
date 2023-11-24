import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";

import { useTldraw } from "@app/hooks/useTldraw";

export const Tldraw = () => {
  const { isOpen, onClose } = useTldraw();
  return (
    <Modal size="full" isOpen={isOpen} scrollBehavior="inside" onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody id="modal-scroll-box" paddingTop="0" paddingX={{ base: 0, sm: 2, md: 4, lg: 6 }}>
          <div>TODO</div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
