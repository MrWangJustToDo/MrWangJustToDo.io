import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

export const useGridHeight = () => {
  const [h, setH] = useState(10);
  const { height } = useWindowSize();
  useEffect(() => {
    setH(Math.floor((height - 50) / 22));
  }, [height]);
  return h;
};
