import { Icon, IconButton, Modal, ModalBody, ModalContent, ModalOverlay, Tooltip } from "@chakra-ui/react";
import { PlayIcon as GoPlay } from "lucide-react";

import { usePlayGround } from "@app/hooks/usePlayGround";

import { PlayGroundContent } from "./Item";

export const PlayGround = () => {
  const { onOpen } = usePlayGround();
  return (
    <Tooltip label="PlayGround">
      <IconButton
        color="gray"
        variant="outline"
        size="sm"
        aria-label="PlayGround"
        title="PlayGround"
        onClick={onOpen}
        icon={<Icon as={GoPlay} fontSize="xl" />}
      />
    </Tooltip>
  );
};

export const PlayGroundModal = () => {
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
