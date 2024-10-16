import { Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tooltip } from "@chakra-ui/react";
import { useEffect } from "react";
import { GoClock } from "react-icons/go";

import { useCalendar } from "@app/hooks/useCalendar";
import { useIsMobile } from "@app/hooks/useIsMobile";

export const Calendar = () => {
  const isMobile = useIsMobile();

  const { isOpen, onClose, onOpen } = useCalendar();

  useEffect(() => {
    if (isOpen && isMobile) {
      onClose();
    }
  }, [isMobile, isOpen, onClose]);

  return (
    <>
      <Tooltip label="Calendar">
        <IconButton
          color="gray"
          variant="outline"
          aria-label="Calendar"
          title="Calendar"
          size="sm"
          onClick={onOpen}
          icon={<Icon as={GoClock} fontSize="xl" />}
        />
      </Tooltip>
      <Modal size="full" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent border="1px" borderRadius="md" borderColor="cardBorderColor">
          <ModalCloseButton />
          <ModalBody>
            <iframe src="https://mrwangjusttodo.github.io/calendar-remark/" width="100%" height="1000px" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
