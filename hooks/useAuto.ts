import { useEffect, useRef } from "react";

import { log } from "utils/log";

import type { RefObject} from "react";

interface UseAutoActionHandlerProps<T, K> {
  action?: (e?: T) => void;
  actionCallback?: (e?: T) => void; // action 不需要useCallback
  actionState?: boolean; // 当前需要执行的状态，在事件监听回调中用于判断是否还需要绑定监听，在定时器中用于判断本次action是否需要执行
  timer?: boolean; // 是否使用定时器
  once?: boolean; // 执行一次，for timer
  delayTime?: number; // 定时器执行时间间隔
  rightNow?: boolean; // 立即执行，for listener
  getRightNowState?: () => boolean;
  forwardRef?: RefObject<K>;
  addListener?: (action: (e?: T) => void, ele?: K) => void; // 添加事件监听
  removeListener?: (action: (e?: T) => void, ele?: K) => void; // 移除事件监听
  addListenerCallback?: (action: (e?: T) => void, ele?: K) => void; // 添加事件监听  不需要useCallback
  removeListenerCallback?: (action: (e?: T) => void, ele?: K) => void; // 移除事件监听  不需要useCallback
  deps?: unknown[];
}

interface UseAutoActionHandlerType {
  <T extends Event, K>(
    props: UseAutoActionHandlerProps<T, K>,
    ...deps: unknown[]
  ): void;
}

export const useAutoActionHandler: UseAutoActionHandlerType = <T, K>({
  action,
  actionCallback,
  timer,
  actionState = true,
  once = true,
  delayTime,
  rightNow = false,
  getRightNowState,
  forwardRef,
  addListener,
  removeListener,
  addListenerCallback,
  removeListenerCallback,
  deps = [],
}: UseAutoActionHandlerProps<T, K>) => {
  const actionStateRef = useRef<boolean>();
  actionStateRef.current = actionState;
  useEffect(() => {
    const currentRightNow = rightNow
      ? rightNow
      : typeof getRightNowState === "function"
      ? getRightNowState()
      : false;
    const currentAction = action || actionCallback;
    if (!currentAction) {
      throw new Error("autoAction need a action to handle");
    }
    const actionCallbackWithState = (...props: any[]) => {
      if (actionStateRef.current) currentAction.call(null, ...props);
    };
    // 定时器
    if (timer) {
      if (delayTime === undefined) {
        log("timer delayTime not set ---> useAutoActionHandler", "warn");
        delayTime = 0;
      }
      if (currentRightNow) actionCallbackWithState();
      if (once) {
        const id = setTimeout(actionCallbackWithState, delayTime);
        return () => clearTimeout(id);
      } else {
        const id = setInterval(actionCallbackWithState, delayTime);
        return () => clearInterval(id);
      }
    } else if (addListener) {
      // 事件监听
      if (!removeListener) {
        throw new Error(
          "every addListener need a removeListener! ---> useAutoActionHandler"
        );
      } else {
        if (currentRightNow) actionCallbackWithState();
        const ele = forwardRef?.current || undefined;
        addListener(actionCallbackWithState, ele);
        return () => removeListener(actionCallbackWithState, ele);
      }
    } else if (addListenerCallback) {
      if (!removeListenerCallback) {
        throw new Error(
          "every addListenerCallback need a removeListenerCallback! ---> useAutoActionHandler"
        );
      } else {
        if (currentRightNow) actionCallbackWithState();
        const ele = forwardRef?.current || undefined;
        addListenerCallback(actionCallbackWithState, ele);
        return () => removeListenerCallback(actionCallbackWithState, ele);
      }
    } else if (currentRightNow) {
      actionCallbackWithState();
    }
  }, [
    action,
    timer,
    once,
    delayTime,
    rightNow,
    addListener,
    removeListener,
    forwardRef,
    ...deps,
  ]);
};
