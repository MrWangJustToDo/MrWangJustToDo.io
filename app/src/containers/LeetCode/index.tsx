import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";

import { useLeetCode } from "@app/hooks/useLeetCode";
import { useLeetCodeSelectId } from "@app/hooks/useLeetCodeSelectId";

import { LeetCodeContent } from "./LeetCode";

export const LeetCode = () => {
  const { isOpen, onClose } = useLeetCode();

  const state = useLeetCodeSelectId((s) => s.state);

  return (
    <Modal size="full" isOpen={isOpen} scrollBehavior="inside" onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody
          id="modal-scroll-box"
          paddingTop="0"
          overflow={state ? "hidden" : "auto"}
          paddingX={{ base: 0, sm: 2, md: 4, lg: 6, "2xl": 8 }}
          paddingY={{ lg: 6, "2xl": 8 }}
        >
          <LeetCodeContent />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
