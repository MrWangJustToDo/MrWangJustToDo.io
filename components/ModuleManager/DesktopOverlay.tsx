import { Desktop } from "components/Overlay";
import { useOverlayArray } from "hooks/useOverlay";

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
