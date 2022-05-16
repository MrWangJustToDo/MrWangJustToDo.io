import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useOverlayArray, useOverlaysClose } from "hooks/useOverlay";
import { useMemo } from "react";

export const Desktop = ({ overlayId }: { overlayId: string }) => {
  const { desktop: overlays } = useOverlayArray();
  const closeTopOverlay = useOverlaysClose();
  const {
    head,
    body,
    foot,
    showState,
    className,
    closeComplete,
    closeHandler,
  } =
    useMemo(
      () => overlays.find((overlay) => overlay.key === overlayId),
      [overlayId, overlays]
    ) || {};

  return (
    <Modal
      size="3xl"
      isOpen={showState}
      scrollBehavior="inside"
      onClose={closeTopOverlay}
      onCloseComplete={closeComplete}
    >
      <ModalOverlay />
      <ModalContent className={className}>
        {head && <ModalHeader>{head}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        {foot && <ModalFooter>{foot}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};
