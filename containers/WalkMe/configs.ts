import { about, button } from "./tours";

import type { WalkMeHistoryItem, WalkMeTour, WalkMeTourItem } from "./types";

const HOME_PAGE_TOURS = [about, button];

export const TOURS_MAP = {
  "/": {
    tours: HOME_PAGE_TOURS,
  },
};

export const getTours = (pathname: string): WalkMeTour[] => TOURS_MAP[pathname]?.tours || [];

export const restoreTourFromHistoryItem = (history: WalkMeHistoryItem): WalkMeTourItem | null => {
  const { tourName, stepIndex } = history;
  const currentToursInHomePage = HOME_PAGE_TOURS.find((tours) => tours.tourName === tourName);
  if (currentToursInHomePage && stepIndex <= currentToursInHomePage.tourSteps.length) {
    return {
      tourName,
      tourIndex: HOME_PAGE_TOURS.indexOf(currentToursInHomePage),
      tours: HOME_PAGE_TOURS,
      stepIndex,
      steps: currentToursInHomePage.tourSteps,
    };
  } else {
    // invalid history
    return null;
  }
};

export const restoreToursFromHistory = (history: WalkMeHistoryItem[]): WalkMeTourItem[] =>
  history.map(restoreTourFromHistoryItem).filter(Boolean) as WalkMeTourItem[];
