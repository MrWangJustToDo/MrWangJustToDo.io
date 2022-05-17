import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { findLast } from "lodash-es";
import { applyOverlaysStyles, cleanupOverlaysStyles } from "utils/dom";
import { delay } from "utils/delay";
import { useUpdate } from "./useUpdate";

const ROOT_BODY = "__next";

const OVERLAY_TIMER = "__overlay_back";

export interface OverlayProps {
  id: string;
  key: string;
  head?: React.ReactNode;
  body: JSX.Element;
  foot?: React.ReactNode;
  height?: number;
  className?: string;
  showState?: boolean;
  applyOverlay?: (id: string, isOpen?: boolean) => void;
  closeHandler?: () => void;
  closeComplete?: () => void;
}

interface UseOverlayOpenType {
  (props: Omit<OverlayProps, "key">): void;
}

let count = 0;

export const OverlayOpenContext = createContext<UseOverlayOpenType>(() => {});

export const OverlayCloseContext = createContext<
  ({ modalId, closeAll }?: { modalId?: string; closeAll?: boolean }) => void
>(() => {});

export const OverlayArrayContext = createContext<{
  desktop: Array<OverlayProps>;
  mobile: Array<OverlayProps>;
}>({ desktop: [], mobile: [] });

export const useOverlaysProps = () => {
  const [overlays, setOverlays] = useState<OverlayProps[]>([]);
  const overlaysRef = useRef(overlays);
  const forceUpdate = useUpdate();
  overlaysRef.current = overlays;
  const applyOverlayStyle = useCallback((key: string, isOpen) => {
    delay(
      0,
      () => {
        const newAllOverlays = overlaysRef.current;
        const stillShow = newAllOverlays.filter((n) => {
          if (isOpen) {
            return n.showState || n.key === key;
          } else {
            return n.showState && n.key !== key;
          }
        });
        if (stillShow.length) {
          const allIds = stillShow.map((n) => n.key);
          const needReApplyIds = allIds.slice(0, -1);
          const needClearId = allIds[allIds.length - 1];
          applyOverlaysStyles([ROOT_BODY, ...needReApplyIds]);
          cleanupOverlaysStyles([needClearId]);
        } else {
          cleanupOverlaysStyles([ROOT_BODY]);
        }
      },
      OVERLAY_TIMER
    );
  }, []);
  const open = useCallback(
    (props: Omit<OverlayProps, "key">) => {
      const overlayProps = props as OverlayProps;
      const allOverlay = overlaysRef.current;
      const lastOpen = findLast(allOverlay, (n) => n.showState);
      overlayProps.key = `__overlay_${count++}`;
      overlayProps.height = lastOpen ? lastOpen.height - 4 : 90;
      overlayProps.showState = true;
      const closeHandler = overlayProps.closeHandler;
      const closeComplete = overlayProps.closeComplete;
      overlayProps.closeHandler = () => {
        overlayProps.showState = false;
        closeHandler && closeHandler();
        forceUpdate();
      };
      overlayProps.closeComplete = () => {
        closeComplete && closeComplete();
        setOverlays((last) => last.filter((n) => n !== overlayProps));
      };
      overlayProps.applyOverlay = applyOverlayStyle;
      setOverlays((last) => {
        return [
          ...last
            .filter((n) => n.id !== overlayProps.id)
            .filter((n) => n.showState),
          overlayProps,
        ];
      });
    },
    [forceUpdate, applyOverlayStyle]
  );
  const close = useCallback(
    (props?: { modalId?: string; closeAll?: boolean }) => {
      const allOverlay = overlaysRef.current;
      const { modalId, closeAll } = props || {};
      if (modalId !== undefined) {
        const currentOverlay = allOverlay.find((n) => n.id === modalId);
        currentOverlay?.closeHandler();
      } else if (closeAll) {
        allOverlay.filter((n) => n.showState).forEach((n) => n?.closeHandler());
      } else {
        const currentTopOverlay = findLast(allOverlay, (n) => n.showState);
        currentTopOverlay?.closeHandler();
      }
    },
    []
  );
  return { overlays, open, close };
};

export const useOverlaysOpen = () => useContext(OverlayOpenContext);

export const useOverlaysClose = () => useContext(OverlayCloseContext);

export const useOverlayArray = () => useContext(OverlayArrayContext);
