import { create } from "zustand";

import { restoreTourFromHistoryItem, restoreToursFromHistory } from "../configs";

import type { WalkMeHistoryItem, WalkMeTour, WalkMeTourItem } from "../types";

type ActionRes = (WalkMeHistoryItem & { redirectPath?: string }) | null;

export const useWalkMeStore = create<{
  isOpen: boolean;
  history: WalkMeHistoryItem[];
  updateHistory: (items: WalkMeHistoryItem[]) => void;

  tours: WalkMeTour[];
  currentTour: WalkMeTourItem | null;
  setTours: (tours: WalkMeTour[]) => void;
  gotoNextTour: () => ActionRes;
  gotoPrevTour: () => void;

  close: () => void;
  open: () => boolean;
  reset: (force?: boolean) => void;
}>((set, get) => ({
  isOpen: false,

  history: [],

  updateHistory: (history) => set({ history }),

  tours: [],

  currentTour: null,

  setTours: (tours) => set({ tours }),

  gotoNextTour: () => {
    const { currentTour, tours, history } = get();
    if (!currentTour) {
      set({ isOpen: false });
      return null;
    }
    const { stepIndex, steps, tourIndex, tourName } = currentTour;
    const { _redirect, _beforeNext } = steps[stepIndex];
    const interpreterRes = _beforeNext?.();
    if (stepIndex < steps.length - 1) {
      const newHistoryItem = {
        tourName: interpreterRes?.tourName || tourName,
        stepIndex: interpreterRes?.stepIndex || stepIndex + 1,
      };
      const newHistory = history.concat(newHistoryItem);
      set({
        currentTour: restoreTourFromHistoryItem(newHistoryItem),
        history: newHistory,
      });
      return newHistoryItem;
    } else if (tourIndex !== -1) {
      if (tourIndex === tours.length - 1) {
        if (_redirect) {
          const { nextTour, nextPath, nextIndex = 0 } = _redirect;
          if (history.some((item) => item.tourName === nextTour)) {
            set({ currentTour: null, isOpen: false });
            return null;
          }
          // redirect
          const newTourName = interpreterRes?.tourName || nextTour;
          const newStepIndex = interpreterRes?.stepIndex || nextIndex;
          const newHistoryItem = {
            tourName: newTourName,
            stepIndex: newStepIndex,
            redirectFrom: tourName,
            redirectPath: nextPath,
          };
          const newHistory = history.concat(newHistoryItem);
          const redirectedTour = restoreTourFromHistoryItem(newHistoryItem);
          set({
            currentTour: redirectedTour,
            history: newHistory,
            tours: redirectedTour.tours,
          });
          return newHistoryItem;
        } else {
          set({ currentTour: null, isOpen: false });
          return null;
        }
      } else if (tourIndex < tours.length - 1) {
        const newHistoryItem = {
          tourName: interpreterRes?.tourName || tours[tourIndex + 1].tourName,
          stepIndex: interpreterRes?.stepIndex || 0,
        };
        const newHistory = history.concat(newHistoryItem);
        set({
          currentTour: restoreTourFromHistoryItem(newHistoryItem),
          history: newHistory,
        });
        return newHistoryItem;
      }
    }
    set({ currentTour: null, isOpen: false });
    return null;
  },

  gotoPrevTour: () => {
    // TODO
  },

  close: () => set({ isOpen: false }),
  // start entry
  open: () => {
    const { isOpen, history, tours, currentTour } = get();
    if (isOpen) return true;
    if (!history.length && !tours.length) return false;
    if (!history.length) {
      // initial
      const history = [{ tourName: tours[0].tourName, stepIndex: 0 }];
      set({
        isOpen: true,
        history,
        currentTour: {
          tourName: tours[0].tourName,
          tours: tours,
          tourIndex: 0,
          steps: tours[0].tourSteps,
          stepIndex: 0,
        },
      });
      return true;
    } else if (currentTour) {
      set({
        isOpen: true,
      });
      return true;
    } else {
      // try to use history to restore
      const historyTours = restoreToursFromHistory(history);
      const currentTour = historyTours[historyTours.length - 1];
      // with same tourName(pathName)
      if (currentTour.tours === tours) {
        set({
          isOpen: true,
          currentTour,
        });
        return true;
      } else {
        set({ isOpen: false });
        return false;
      }
    }
  },
  reset: (force) => {
    const { updateHistory, close } = get();
    if (!force && (!history.length || history[history.length - 1].redirectFrom)) return;
    updateHistory([]);
    close();
  },
}));
