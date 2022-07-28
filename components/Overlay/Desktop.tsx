import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import type { OverlayProps } from "hooks/useOverlay";

export const Desktop = (props: OverlayProps) => {
  const {
    head,
    body,
    foot,
    showState,
    className,
    closeComplete,
    closeHandler,
  } = props;

  return (
    <Modal
      size="3xl"
      isOpen={showState}
      scrollBehavior="inside"
      onClose={closeHandler}
      onCloseComplete={closeComplete}
    >
      <ModalOverlay />
      <ModalContent className={className}>
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
