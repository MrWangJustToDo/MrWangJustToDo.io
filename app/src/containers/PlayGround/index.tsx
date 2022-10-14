import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";

import { Editor } from "@app/components/Editor";
import { GridCard } from "@app/components/GridCard";
import { StyledResponsiveReactGridLayout } from "@app/components/GridLayout";
import { Preview } from "@app/components/Preview";
import { DISABLE_DRAG_HANDLER_SELECTOR, DRAG_HANDLER_SELECTOR, GRID_ROW_HEIGHT } from "@app/config/gridLayout";
import { usePlayGround } from "@app/hooks/usePlayGround";

const GRID_COLS = { lg: 12, md: 12, sm: 12, xs: 2, xxs: 2 };

const GRID_LAYOUTS = {
  lg: [
    { i: "a", x: 0, y: 0, w: 6, h: 50, minW: 4, maxW: 8, minH: 40 },
    {
      i: "b",
      x: 6,
      y: 0,
      w: 6,
      h: 50,
      minW: 4,
      maxW: 10,
      minH: 40,
    },
  ],
  md: [
    { i: "a", x: 0, y: 0, w: 6, h: 40, minW: 4, minH: 40 },
    {
      i: "b",
      x: 6,
      y: 0,
      w: 6,
      h: 40,
      minW: 6,
      minH: 40,
    },
  ],
  sm: [
    { i: "a", x: 0, y: 0, w: 6, h: 40, minW: 6, minH: 40 },
    {
      i: "b",
      x: 6,
      y: 0,
      w: 6,
      h: 40,
      minW: 6,
      minH: 40,
    },
  ],
  xs: [
    { i: "a", x: 0, y: 0, w: 2, h: 30, minW: 1, minH: 30 },
    { i: "b", x: 2, y: 0, w: 2, h: 30, minW: 2, minH: 30 },
  ],
  xxs: [
    { i: "a", x: 0, y: 0, w: 2, h: 30, minW: 2, minH: 30 },
    { i: "b", x: 2, y: 0, w: 2, h: 30, minW: 2, minH: 30 },
  ],
};

const PlayGroundContent = () => {
  return (
    <StyledResponsiveReactGridLayout
      className="layout"
      cols={GRID_COLS}
      layouts={GRID_LAYOUTS}
      rowHeight={GRID_ROW_HEIGHT}
      measureBeforeMount={true}
      draggableHandle={`.${DRAG_HANDLER_SELECTOR}`}
      draggableCancel={`.${DISABLE_DRAG_HANDLER_SELECTOR}`}
    >
      <GridCard key="a">
        <Editor />
      </GridCard>
      <GridCard key="b">
        <Preview />
      </GridCard>
    </StyledResponsiveReactGridLayout>
  );
};

export const PlayGround = () => {
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
