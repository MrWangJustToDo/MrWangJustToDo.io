import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import type { OverlayProps } from "@app/hooks/useOverlay";

const Body = ({ children }: { children: JSX.Element }) => {
  const ref = useRef<HTMLDivElement>();

  const { scrollY } = useScroll({ container: ref });

  const opacity = useTransform(scrollY, [0, 0.2, 0.4], [0, 0.4, 1]);

  return (
    <>
      <motion.div style={{ opacity, borderBottom: "1px solid rgba(100, 100, 100, .2)" }}></motion.div>
      <ModalBody id="modal-scroll-box" paddingTop="0" ref={ref}>
        {children}
      </ModalBody>
    </>
  );
};

export const Desktop = (props: OverlayProps) => {
  const { head, body, foot, showState, className, closeComplete, closeHandler } = props;

  return (
    <Modal size="3xl" isOpen={showState} scrollBehavior="inside" onClose={closeHandler} onCloseComplete={closeComplete}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent className={className} backgroundColor="cardBackgroundColor" border="1px" borderRadius="md" borderColor="cardBorderColor">
        {head && <ModalHeader>{head}</ModalHeader>}
        <ModalCloseButton />
        <Body>{body}</Body>
        {foot && <ModalFooter>{foot}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};
