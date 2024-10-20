import { DiffModeEnum } from "@git-diff-view/react";
import { createState } from "reactivity-store";

export enum DiffViewSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum HighlightEngine {
  lowlight = "lowlight",
  shiki = "shiki",
}

export const useDiffViewConfig = createState(
  () =>
    ({ size: DiffViewSize.Medium, mode: DiffModeEnum.Split, wrap: true, highlight: true, autoLoad: false, engine: HighlightEngine.lowlight }) as {
      size: DiffViewSize;
      mode: DiffModeEnum;
      wrap: boolean;
      highlight: boolean;
      autoLoad: boolean;
      engine?: HighlightEngine;
    },
  {
    withActions: (state) => {
      return {
        setSize: (size: DiffViewSize) => {
          state.size = size;
        },
        setMode: (mode: DiffModeEnum) => {
          state.mode = mode;
        },
        setWrap: (wrap: boolean) => {
          state.wrap = wrap;
        },
        setHighlight: (highlight: boolean) => {
          state.highlight = highlight;
        },
        setAutoLoad: (autoLoad: boolean) => {
          state.autoLoad = autoLoad;
        },
        setEngine: (engine: HighlightEngine) => {
          state.engine = engine;
        },
      };
    },
    withDeepSelector: false,
    withStableSelector: true,
    withNamespace: "useDiffViewConfig",
    withPersist: 'useDiffViewConfig',
  },
);
