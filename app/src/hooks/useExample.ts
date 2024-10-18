import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useInComparePage = () => {
  const { pathname } = useRouter();

  return pathname === "/compare";
};

export const useInIframe = () => {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  return isIframe;
};

export const useExample = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    const isIframe = window.self !== window.top;

    let hasResponse = false;

    let id: NodeJS.Timeout;

    const checkResponse = () => {
      if (hasResponse) {
        return;
      }

      window.top.postMessage({ message: "hello" }, "*");

      id = setTimeout(() => checkResponse(), 2000);
    };

    const onResponse = (event: MessageEvent) => {
      if (typeof event.data === "object") {
        if (event.data.from === "container") {
          hasResponse = true;
        }
        if (hasResponse && event.data.color) {
          setColorMode(event.data.color);
          setTimeout(() => {
            window.top.postMessage({ message: "update" }, "*");
          }, 200);
        }
      }
    };

    if (isIframe) {
      checkResponse();

      window.addEventListener("message", onResponse);

      return () => {
        window.removeEventListener("message", onResponse);
        clearTimeout(id);
      };
    }
  }, [setColorMode]);
};
