import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";

import { usePlayGround } from "@app/hooks/usePlayGround";

import { PlayGroundContent } from "./PlayGround";

export const PlayGround = () => {
  const { isOpen, onClose } = usePlayGround();
  return (
    <Modal size="full" isOpen={isOpen} scrollBehavior="inside" onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalBody id="modal-scroll-box" paddingTop="0" paddingX={{ base: 0, sm: 2, md: 4, lg: 6 }}>
          <PlayGroundContent />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
