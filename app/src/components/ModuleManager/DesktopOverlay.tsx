import { useOverlayArray } from "@app/hooks/useOverlay";

import { Desktop } from "../Overlay";

export const DesktopOverlay = () => {
  const { desktop: overlays } = useOverlayArray();

  return (
    <>
      {overlays.map((p) => (
        <Desktop key={p.key} {...p} />
      ))}
    </>
  );
};
