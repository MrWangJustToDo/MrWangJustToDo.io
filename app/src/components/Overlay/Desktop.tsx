import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

import type { OverlayProps } from "@app/hooks/useOverlay";

export const Desktop = (props: OverlayProps) => {
  const { head, body, foot, showState, className, closeComplete, closeHandler } = props;

  return (
    <Modal size="3xl" isOpen={showState} scrollBehavior="inside" onClose={closeHandler} onCloseComplete={closeComplete}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent className={className} backgroundColor="cardBackgroundColor" border="1px" borderRadius="md" borderColor="cardBorderColor">
        {head && <ModalHeader>{head}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody id="modal-scroll-box" paddingTop="0">
          {body}
        </ModalBody>
        {foot && <ModalFooter>{foot}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};
