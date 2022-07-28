import { useRouter } from "next/router";
import { useEffect } from "react";
import shallow from "zustand/shallow";

import { getTours } from "../configs";

import { useWalkMeStore } from "./useWalkMeStore";

export const useSyncToursWithPathName = () => {
  const { pathname } = useRouter();

  const { setTours } = useWalkMeStore(
    (state) => ({
      setTours: state.setTours,
    }),
    shallow
  );

  useEffect(() => {
    setTours(getTours(pathname));
  }, [pathname, setTours]);
};

export const useOpenTourAfterRedirect = () => {
  const { isOpen, history, open } = useWalkMeStore(
    (state) => ({
      isOpen: state.isOpen,
      history: state.history,
      open: state.open,
    }),
    shallow
  );
  useEffect(() => {
    if (!isOpen && history[history.length - 1]?.redirectFrom) {
      open();
    }
  }, [history, isOpen, open]);
};
