import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";

export const useGridHeight = () => {
  const [h, setH] = useState(10);
  const hasSetRef = useRef(false);
  const { height } = useWindowSize();
  useEffect(() => {
    if (!hasSetRef.current) {
      setH(Math.floor((height - 50) / 22));
      hasSetRef.current = true;
    }
  }, [height]);
  return h;
};
