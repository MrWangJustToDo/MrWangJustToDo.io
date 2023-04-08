import { AspectRatio, HStack, Icon, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
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
      <IconButton color="gray" variant="outline" aria-label="about me" title="about me" onClick={onOpen} icon={<Icon as={FaUserTie} fontSize="xl" />} />
      <Modal size="4xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent backgroundColor="cardBackgroundColor" border="1px" borderRadius="md" borderColor="cardBorderColor">
          <ModalCloseButton />
          <ModalBody>
            <HStack alignItems="flex-start">
              <AspectRatio ratio={11 / 16} width="46%">
                <Image src={resourceUri("./1.png")} width="100%" alt="about me" />
              </AspectRatio>
              <AspectRatio ratio={12 / 16} width="46%">
                <Image src={resourceUri("./2.png")} width="100%" alt="about me" />
              </AspectRatio>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
