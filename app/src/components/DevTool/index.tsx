import { Portal, ButtonGroup, Button } from "@chakra-ui/react";
import { useState } from "react";

const src = "https://mrwangjusttodo.github.io/myreact-devtools";

function loadScript(url: string) {
  const script = document.createElement("script");
  return new Promise((resolve, reject) => {
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  }).finally(() => script.remove());
}

const getFunc = () => (window as any).__MY_REACT_DEVTOOL_IFRAME__;

async function init() {
  if (typeof getFunc() === "function") {
    getFunc()(src);
  } else {
    await loadScript(`${src}/bundle/hook.js`);
    await init();
  }
}

export const DevTool = () => {
  const [open, setOpen] = useState(false);

  return (
    <Portal>
      <ButtonGroup variant="solid" position="fixed" bottom="16" left="4" zIndex="1000000">
        <Button
          colorScheme="red"
          textTransform="capitalize"
          onClick={async () => {
            if (!open) {
              await init();

              setOpen(true);
            } else {
              getFunc()?.["close"]?.();

              setOpen(false);
            }
          }}
        >
          {open ? "close" : "open"} DevTool
        </Button>
      </ButtonGroup>
    </Portal>
  );
};
