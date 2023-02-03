import { useRouter } from "next/router";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

import { useEffectOnce } from "@app/hooks/useEffectOnce";

import { getTours } from "../configs";

import { useWalkMeStore } from "./useWalkMeStore";

export const useSyncToursWithPathName = () => {
  const { asPath } = useRouter();

  const { setTours } = useWalkMeStore(
    (state) => ({
      setTours: state.setTours,
    }),
    shallow,
  );

  useEffectOnce(() => {
    setTours(getTours(asPath));
  });
};

export const useOpenTourAfterRedirect = () => {
  const { isOpen, history, open } = useWalkMeStore(
    (state) => ({
      isOpen: state.isOpen,
      history: state.history,
      open: state.open,
    }),
    shallow,
  );

  useEffect(() => {
    if (!isOpen && history[history.length - 1]?.redirectFrom) {
      open();
    }
  }, [history, isOpen, open]);
};

export const useOpenTourByInit = () => {
  const open = useWalkMeStore((state) => state.open);

  useEffectOnce(() => {
    if (localStorage.getItem("__enable_tour__")) {
      open();
    }
  });
};
