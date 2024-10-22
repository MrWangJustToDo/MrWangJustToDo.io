import { useSafeLayoutEffect } from "@chakra-ui/react";
import { useState } from "react";

import { TruncateInstance } from "@app/utils/text";

import type { DOMRectType } from "./useSize";

const cache = new Map<string, string>();
const _cache = new Map<string, number>();

export const useTruncateText = ({ text, container, fontSize = "14px" }: { text: string; container: DOMRectType; fontSize?: string }) => {
  const [state, setState] = useState(() => ({ textToDisplay: cache.get(text) || text, maxWidth: _cache.get(text) || Infinity }));

  useSafeLayoutEffect(() => {
    const width = 20;
    let maxWidth = Infinity;
    if (container.width !== 0) {
      const targetWidth = container.right - container.left - width;
      if (targetWidth >= container.width) {
        maxWidth = container.width - width;
      } else {
        maxWidth = targetWidth;
      }
    }
    let _text = text;
    if (maxWidth !== Infinity) {
      _text = TruncateInstance.truncate(text, maxWidth, {
        fontSize,
        fontFamily: "Product Sans, sans-serif",
      });
      if (_text.length !== text.length && _text.length <= 3) {
        _text = text[0] + "..." + text[text.length - 1];
      }
      cache.set(text, _text);
      _cache.set(text, maxWidth);
      setState({ textToDisplay: _text, maxWidth });
    }
  }, [text, container.width, container.right, fontSize]);

  return state;
};
