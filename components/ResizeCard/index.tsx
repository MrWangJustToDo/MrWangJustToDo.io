import { forwardRef, useSafeLayoutEffect } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Resizable } from "react-resizable";

import { Card } from "components/Card";
import { useIsMounted } from "hooks/useIsMounted";

import type { BoxProps } from "@chakra-ui/react";

export const ResizeCard = forwardRef<BoxProps, "div">(({ children, ...resProps }, ref) => {
  const isMounted = useIsMounted();
  const internalRef = useRef<HTMLDivElement>();
  const [{ height, width }, setSize] = useState({ height: 0, width: 0 });

  useSafeLayoutEffect(() => {
    const cardElement = internalRef.current;
    if (cardElement) {
      const height = cardElement.offsetHeight;
      const width = cardElement.offsetWidth;
      setSize({ height, width });
    } else {
      setSize({ height: 600, width: 360 });
    }
  }, []);

  if (!isMounted) {
    return (
      <Card
        {...resProps}
        ref={(i) => {
          internalRef.current = i;
          if (ref) {
            if (typeof ref === "function") {
              ref(i);
            } else {
              ref.current = i;
            }
          }
        }}
      >
        {children}
      </Card>
    );
  }

  return (
    <Resizable
      height={height}
      width={width}
      onResize={(_, { size }) => {
        setSize({ height: size.height, width: size.width });
      }}
    >
      <Card {...resProps} height={height} width={width}>
        {children}
      </Card>
    </Resizable>
  );
});
