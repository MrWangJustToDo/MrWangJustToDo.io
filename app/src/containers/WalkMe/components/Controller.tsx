import { useCallbackRef } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { shallow } from "zustand/shallow";

import { useOpenTourAfterRedirect, useOpenTourByInit, useSyncToursWithPathName } from "../hooks/controller";
import { useWalkMeStore } from "../hooks/useWalkMeStore";

import { Container } from "./Container";
import { Tour } from "./Tour";

import type { WalkMeControllerProps } from "../types";

export const Controller = ({ onFinish }: WalkMeControllerProps) => {
  const router = useRouter();

  const { isOpen, close, gotoNext, currentStep, reset } = useWalkMeStore(
    (state) => ({
      isOpen: state.isOpen,
      close: state.close,
      gotoNext: state.gotoNextTour,
      currentStep: state.currentTour,
      reset: state.reset,
    }),
    shallow,
  );

  useSyncToursWithPathName();

  useOpenTourAfterRedirect();

  useOpenTourByInit();

  const goTo = useCallback(() => {
    // TODO:
  }, []);

  const prev = useCallback(() => {
    // TODO:
  }, []);

  const next = useCallbackRef(() => {
    const res = gotoNext();
    if (!res) {
      // finish
      onFinish?.();
      reset(true);
      return;
    }
    const { redirectPath } = res;
    if (redirectPath) {
      router.push(redirectPath);
      // close temporary
      close();
    }
  });

  const children = useMemo(() => {
    if (!currentStep) return null;
    return (
      <Container
        stepIndex={currentStep.stepIndex}
        steps={currentStep.steps}
        stepLen={currentStep.steps.length}
        actions={{
          goTo,
          prev,
          next,
        }}
      />
    );
  }, [currentStep, goTo, prev, next]);

  const _isOpen = isOpen && currentStep;

  return _isOpen ? (
    <Tour onClickModal={() => reset(true)} step={currentStep.stepIndex} steps={currentStep.steps}>
      {children}
    </Tour>
  ) : null;
};
