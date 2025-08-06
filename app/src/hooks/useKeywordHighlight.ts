/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useSafeLayoutEffect } from "@chakra-ui/react";
import { useEffect } from "react";

import { useDiffViewSearch } from "./useDiffViewSearch";

import type { RefObject } from "react";

// @ts-ignore
let searchResultsHighlight: Highlight | null = null;

export const useInitHighlight = () => {
  useSafeLayoutEffect(() => {
    // @ts-ignore
    if (!CSS.highlights) {
      console.warn("CSS Custom Highlight API not supported.");
      return;
    }
    // @ts-ignore
    searchResultsHighlight = new Highlight();

    // Register the Highlight object in the registry.
    // @ts-ignore
    CSS.highlights.set("search-results", searchResultsHighlight);

    return () => {
      // Clear the HighlightRegistry when the component unmounts
      // @ts-ignore
      CSS.highlights.clear();
      searchResultsHighlight = null;
    };
  }, []);
};

export const useKeywordHighlight = (ref: RefObject<HTMLDivElement>) => {
  const str = useDiffViewSearch((s) => s.searchValue);

  useEffect(() => {
    if (!ref.current) return;

    if (!str) return;

    const ele = ref.current;

    let list: Range[] = [];

    const clearHighlight = () => {
      list.forEach((range) => {
        searchResultsHighlight?.delete?.(range);
      });
    };

    const registerHighlight = () => {
      clearHighlight();

      // Find all text nodes in the article. We'll search within
      // these text nodes.
      const treeWalker = document.createTreeWalker(ele, NodeFilter.SHOW_TEXT);

      const allTextNodes = [];
      let currentNode = treeWalker.nextNode();
      while (currentNode) {
        if (
          !currentNode?.parentElement?.closest(`[data-diff-item-header]`) &&
          !currentNode?.parentElement?.closest(`[data-diff-item-empty]`) &&
          !currentNode?.parentElement?.closest("[data-line-num]") &&
          !currentNode?.parentElement?.closest("[data-line-old-num]") &&
          !currentNode?.parentElement?.closest("[data-line-new-num]")
        ) {
          allTextNodes.push(currentNode);
        }
        currentNode = treeWalker.nextNode();
      }

      // Iterate over all text nodes and find matches.
      const ranges = allTextNodes
        .map((el) => ({ el, text: el.textContent.toLowerCase() }))
        .map(({ text, el }) => {
          const indices = [];
          let startPos = 0;
          while (startPos < text.length) {
            const index = text.indexOf(str, startPos);
            if (index === -1) break;
            indices.push(index);
            startPos = index + str.length;
          }

          // Create a range object for each instance of
          // str we found in the text node.
          return indices.map((index) => {
            // @ts-ignore
            const range = new Range();
            range.setStart(el, index);
            range.setEnd(el, index + str.length);
            return range;
          });
        });

      list = ranges.flat();

      list.forEach((range) => {
        searchResultsHighlight?.add?.(range);
      });
    };

    registerHighlight();

    const ob = new MutationObserver(registerHighlight);

    ob.observe(ele, { childList: true, subtree: true });

    return () => {
      clearHighlight();
      ob.disconnect();
    };
  }, [ref, str]);
};
