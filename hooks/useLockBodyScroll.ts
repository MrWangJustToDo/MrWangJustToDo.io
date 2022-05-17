import { useEffect } from "react";

export const useLockBodyScroll = (isLock?: boolean) => {
  useEffect(() => {
    const body = document.body;
    if (isLock) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }, [isLock]);
};
