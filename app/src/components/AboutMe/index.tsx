import { HStack, Icon, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaUserTie } from "react-icons/fa";

import { useIsMobile } from "@app/hooks/useIsMobile";
import { resourceUri } from "@app/utils/resourceUri";

export const AboutMe = () => {
  const isMobile = useIsMobile();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (isMobile) {
      onClose();
    }
  }, [isMobile, onClose]);

  if (isMobile) return null;

  return (
    <>
      <IconButton color="gray" variant="outline" aria-label="github" onClick={onOpen} icon={<Icon as={FaUserTie} fontSize="xl" />} />
      <Modal size="4xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <Image src={resourceUri("./1.png")} width="46%" alt="about me" />
              <Image src={resourceUri("./2.png")} width="46%" alt="about me" />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
