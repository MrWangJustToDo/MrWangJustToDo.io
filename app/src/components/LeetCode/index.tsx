import { Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tooltip } from "@chakra-ui/react";
import { GoCode } from "react-icons/go";

import { useLeetCode } from "@app/hooks/useLeetCode";
import { useLeetCodeSelectId } from "@app/hooks/useLeetCodeSelectId";

import { LeetCodeContent } from "./Item";

export const LeetCode = () => {
  const { isOpen, onClose, onOpen } = useLeetCode();

  const state = useLeetCodeSelectId((s) => s.state);

  return (
    <>
      <Tooltip label="LeetCode">
        <IconButton
          color="gray"
          size="sm"
          variant="outline"
          aria-label="LeetCode"
          title="LeetCode"
          onClick={onOpen}
          icon={<Icon as={GoCode} fontSize="xl" />}
        />
      </Tooltip>
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
    </>
  );
};
