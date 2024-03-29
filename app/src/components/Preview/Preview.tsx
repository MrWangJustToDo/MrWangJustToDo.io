import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import {
  PLAYGROUND_REACT_WINDOW,
  PLAYGROUND_MY_REACT,
  PLAYGROUND_GRID_LAYOUT,
  PLAYGROUND_MY_REACT_DOM,
  PLAYGROUND_MY_REACT_REACTIVE,
  ANTD_UMD,
  DAYJS_UMD,
} from "@app/config/source";
import { useDebouncedState } from "@app/hooks/useDebouncedState";
import { useEditor_v2 } from "@app/hooks/useEditor";
import { generateIframeDOC, generateLinkElementsString, generateScriptElementsString, generateStyleElementsString, getAllFiles } from "@app/utils/preview";

import type { ToastId } from "@chakra-ui/react";

// const BABEL_URL = PLAYGROUND_BABEL;
const REACT_URL = PLAYGROUND_MY_REACT;
const REACT_REACTIVE_URL = PLAYGROUND_MY_REACT_REACTIVE;
const REACT_DOM_URL = PLAYGROUND_MY_REACT_DOM;
const REACT_WINDOW = PLAYGROUND_REACT_WINDOW;
const GRID_LAYOUT = PLAYGROUND_GRID_LAYOUT;

const ALL_SCRIPTS = Array.from(new Set([REACT_URL, REACT_REACTIVE_URL, REACT_DOM_URL, GRID_LAYOUT, REACT_WINDOW, DAYJS_UMD, ANTD_UMD]));

const DEFAULT_SCRIPTS: PreviewProps["scripts"] = ALL_SCRIPTS.map((s, index) => ({ href: s, id: index.toString() }));

export type PreviewProps = {
  links?: { id: string; href: string }[];
  styles?: { id: string; content: string }[];
  scripts?: { id: string; type?: string; content?: string; href?: string }[];
  onLoad?: () => void;
};

export const IFramePreview = ({ styles = [], scripts = [], links = [], onLoad }: PreviewProps) => {
  const files = useEditor_v2((state) => state.files);

  const [compiled, setCompiled] = useState<{ js: string; id: number }>(null);

  const [tsx, setTsx] = useDebouncedState(files["script.tsx"].content, 600);

  const content = files["script.tsx"].content;

  const open = useToast();

  const styleElement = generateStyleElementsString(styles.concat(getAllFiles(files, "css")));

  const scriptElement = generateScriptElementsString(DEFAULT_SCRIPTS.concat(scripts));

  const linkElement = generateLinkElementsString(links);

  const iframeDOC = generateIframeDOC({
    links: linkElement,
    styles: styleElement,
    scripts: scriptElement,
    inlineHtml: files["index.html"].content,
  });

  useEffect(() => {
    setTsx(content);
  }, [content, setTsx, iframeDOC]);

  const idRef = useRef(0);

  const workRef = useRef<Worker>();

  const toastRef = useRef<ToastId>();

  const iframeRef = useRef<HTMLIFrameElement>();

  useEffect(() => {
    workRef.current = new Worker(new URL("@app/worker/compiler.worker", import.meta.url));
    workRef.current.addEventListener("message", ({ data }) => {
      if (data.id === idRef.current) {
        if (data.js) {
          setCompiled(data);
        } else if (data.error) {
          if (toastRef.current) {
            open.update(toastRef.current, {
              title: "parse error",
              isClosable: true,
              status: "error",
              description: (
                <pre style={{ overflow: "scroll", fontSize: "14px" }}>
                  <code>{data.error}</code>
                </pre>
              ),
              onCloseComplete: () => (toastRef.current = null),
            });
          } else {
            toastRef.current = open({
              title: "parse error",
              isClosable: true,
              status: "error",
              id: "parse-error",
              description: (
                <pre style={{ overflow: "scroll", fontSize: "14px" }}>
                  <code>{data.error}</code>
                </pre>
              ),
              onCloseComplete: () => (toastRef.current = null),
            });
          }
        }
      }
    });
    return () => workRef.current.terminate();
  }, [open]);

  useEffect(() => {
    idRef.current++;
    workRef.current.postMessage({ tsx, id: idRef.current });
  }, [tsx, iframeDOC]);

  useEffect(() => {
    if (compiled) {
      const id = setInterval(() => {
        iframeRef.current.contentWindow.postMessage(compiled, "*");
      }, 100);
      return () => clearInterval(id);
    }
  }, [compiled, iframeDOC]);

  useEffect(() => {
    window.addEventListener("message", ({ data }) => {
      if (data.id === idRef.current) {
        setCompiled(null);
      }
    });
  }, []);

  return (
    <iframe
      onLoad={onLoad}
      ref={iframeRef}
      width="100%"
      height="100%"
      title="Preview"
      className="tour_playGround_preview"
      sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
      srcDoc={iframeDOC}
    />
  );
};
