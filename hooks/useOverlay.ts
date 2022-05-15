import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useUpdate } from "react-use";
import { findLast } from "lodash-es";
import { applyOverlaysStyles, cleanupOverlaysStyles } from "utils/dom";
import { delay } from "utils/delay";

const ROOT_BODY = "__next";

const OVERLAY_TIMER = "__overlay_back";

export interface OverlayProps {
  id: string;
  key: string;
  head?: React.ReactNode;
  body: ((closeHandler: () => void) => JSX.Element) | JSX.Element;
  foot?: React.ReactNode;
  height?: number;
  className?: string;
  showState?: boolean;
  applyOverlay?: (id: string, isOpen?: boolean) => void;
  closeHandler?: () => void;
  closeComplete?: () => void;
  clearAll?: () => void;
}

interface UseOverlayOpenType {
  (props: OverlayProps): void;
}

let count = 0;

export const OverlayOpenContext = createContext<UseOverlayOpenType>(() => {});

export const OverlayCloseContext = createContext<() => void>(() => {});

export const OverlayArrayContext = createContext<{
  desktop: Array<OverlayProps>;
  mobile: Array<OverlayProps>;
}>({ desktop: [], mobile: [] });

export const useOverlaysProps = () => {
  const [overlays, setOverlays] = useState<OverlayProps[]>([]);
  const overlaysRef = useRef(overlays);
  const forceUpdate = useUpdate();
  const clearAll = useCallback(() => setOverlays([]), []);
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
    (props: OverlayProps) => {
      const allOverlay = overlaysRef.current;
      const lastOpen = findLast(allOverlay, (n) => n.showState);
      props.key = `__overlay_${count++}`;
      props.height = lastOpen ? lastOpen.height - 4 : 90;
      props.showState = true;
      const closeHandler = props.closeHandler;
      const closeComplete = props.closeComplete;
      props.closeHandler = () => {
        props.showState = false;
        closeHandler && closeHandler();
        forceUpdate();
      };
      props.closeComplete = () => {
        closeComplete && closeComplete();
        setOverlays((last) => last.filter((n) => n !== props));
      };
      const _clearAll = props.clearAll;
      props.clearAll = () => {
        _clearAll && _clearAll();
        clearAll();
      };
      props.applyOverlay = applyOverlayStyle;
      setOverlays((last) => {
        return [
          ...last.filter((n) => n.id !== props.id).filter((n) => n.showState),
          props,
        ];
      });
    },
    [clearAll, forceUpdate, applyOverlayStyle]
  );
  const close = useCallback(() => {
    const allOverlay = overlaysRef.current;
    const currentTopOverlay = findLast(allOverlay, (n) => n.showState);
    if (currentTopOverlay && currentTopOverlay.closeHandler) {
      currentTopOverlay.closeHandler();
    }
  }, []);
  return { overlays, open, close };
};

export const useOverlaysOpen = () => useContext(OverlayOpenContext);

export const useOverlaysClose = () => useContext(OverlayCloseContext);

export const useOverlayArray = () => useContext(OverlayArrayContext);
