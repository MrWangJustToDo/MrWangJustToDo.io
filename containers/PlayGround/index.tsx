import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { omit } from "lodash-es";
import { Editor } from "components/Editor";
import { GridCard } from "components/GridCard";
import { StyledReactGridLayout } from "components/GridLayout";
import { Preview } from "components/Preview";
import {
  DISABLE_DRAG_HANDLER_SELECTOR,
  DRAG_HANDLER_SELECTOR,
  GRID_ROW_HEIGHT,
} from "config/gridLayout";
import { useRouter } from "next/router";

const GRID_COLS = { lg: 12, md: 12, sm: 12, xs: 2, xxs: 2 };

const GRID_LAYOUTS = {
  lg: [
    { i: "a", x: 0, y: 0, w: 6, h: 50, minW: 4, maxW: 8, minH: 50 },
    {
      i: "b",
      x: 6,
      y: 0,
      w: 6,
      h: 50,
      minW: 4,
      maxW: 10,
      minH: 50,
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

export const PlayGround = () => {
  const { query, push, pathname } = useRouter();

  const isModalOpen = query.overlay === "open";
  const isPlayGround = query.playGround === "MyReact";

  return (
    <Modal
      size="full"
      isOpen={isModalOpen && isPlayGround}
      scrollBehavior="inside"
      onClose={() =>
        push(
          {
            pathname,
            query: {
              ...omit(query, ["overlay", "playGround"]),
            },
          },
          undefined,
          { scroll: false }
        )
      }
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>MyReact PlayGround</ModalHeader>
        <ModalCloseButton />
        <ModalBody id="modal-scroll-box" paddingTop="0">
          <StyledReactGridLayout
            className="layout"
            cols={GRID_COLS}
            layouts={GRID_LAYOUTS}
            rowHeight={GRID_ROW_HEIGHT}
            draggableHandle={`.${DRAG_HANDLER_SELECTOR}`}
            draggableCancel={`.${DISABLE_DRAG_HANDLER_SELECTOR}`}
          >
            <GridCard key="a">
              <Editor />
            </GridCard>
            <GridCard key="b">
              <Preview />
            </GridCard>
          </StyledReactGridLayout>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
