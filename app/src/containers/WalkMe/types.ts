import type { ReactElement } from "react";
import type React from "react";

export type BaseComp =
  | ReactElement<Record<string, unknown>, (_p: Record<string, unknown>) => ReactElement | null>
  | ReactElement<Record<string, unknown>, (_p: Record<string, unknown>) => ReactElement | null>[]
  | string
  | undefined
  | null;

type WalkMeStepInterpreter = () => WalkMeHistoryItem | null;

export type WalkMeStep = {
  selector: string;
  content?: BaseComp;
  resizeObservables?: string[];
  mutationObservables?: string[];
  highlightedSelectors?: string[];

  action?: () => void;

  _beforeNext?: WalkMeStepInterpreter;
  _beforePrev?: WalkMeStepInterpreter;

  _title?: BaseComp;
  _content?: BaseComp;

  _nextTour?: string;
  _redirect?: {
    nextTour: string;
    nextPath: string;
    nextIndex?: number;
  };
};

export type WalkMeTourProps = {
  onClickModal: () => void;
  step: number;
  steps: WalkMeStep[];
  children?: React.ReactNode;
};

export type WalkMeTourItem = {
  tourName: string;
  steps: WalkMeStep[];
  stepIndex: number;
  tours: WalkMeTour[];
  tourIndex: number;
};

export type WalkMeHistoryItem = {
  tourName: string;
  stepIndex: number;
  redirectFrom?: string;
};

export type WalkMeTour = {
  tourName: string;
  tourSteps: WalkMeStep[];
};

export enum Action {
  Prev = "prev",
  Next = "next",
  GoTo = "goTo",
}

export type Actions = {
  prev: () => void;
  next: () => void;
  goTo: (tourName: string, stepIndex: number) => void;
};

export type ContainerProps = {
  steps: WalkMeStep[];
  stepIndex: number;
  stepLen: number;
  actions: Actions;
};

export type CompProps = {
  children?: BaseComp;
} & ContainerProps;

export type WalkMeControllerProps = {
  onFinish?: () => void;
};
