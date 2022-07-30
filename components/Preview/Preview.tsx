import { useEffect, useRef } from "react";

import { PLAYGROUND_BABEL, PLAYGROUND_MY_REACT, PLAYGROUND_GRID_LAYOUT, PLAYGROUND_MY_REACT_DOM } from "config/source";
import { useDebounceState } from "hooks/useDebounceState";
import { useEditor } from "hooks/useEditor";
import { generateIframeDOC, generateLinkElementsString, generateScriptElementsString, generateStyleElementsString, getAllFiles } from "utils/preview";

const BABEL_URL = PLAYGROUND_BABEL;
const REACT_URL = PLAYGROUND_MY_REACT;
const REACT_DOM_URL = PLAYGROUND_MY_REACT_DOM;
const GRID_LAYOUT = PLAYGROUND_GRID_LAYOUT;

const ALL_SCRIPTS = Array.from(new Set([BABEL_URL, REACT_URL, REACT_DOM_URL, GRID_LAYOUT]));

const DEFAULT_SCRIPTS: PreviewProps["scripts"] = ALL_SCRIPTS.map((s, index) => ({ href: s, id: index.toString() }));

export type PreviewProps = {
  links?: { id: string; href: string }[];
  styles?: { id: string; content: string }[];
  scripts?: { id: string; type?: string; content?: string; href?: string }[];
  onLoad?: () => void;
};

export const IFramePreview = ({ styles = [], scripts = [], links = [], onLoad }: PreviewProps) => {
  const files = useEditor((state) => state.files);

  const [tsx, setTsx] = useDebounceState(files["script.tsx"].content, 600);

  const content = files["script.tsx"].content;

  useEffect(() => {
    setTsx(content);
  }, [content, setTsx]);

  const idRef = useRef(0);

  const workRef = useRef<Worker>();

  const iframeRef = useRef<HTMLIFrameElement>();

  useEffect(() => {
    workRef.current = new Worker(new URL("../../worker/compiler.worker", import.meta.url));
    workRef.current.addEventListener("message", ({ data }) => {
      if (data.id === idRef.current) {
        iframeRef.current.contentWindow.postMessage(data, "*");
      }
    });
    return () => workRef.current.terminate();
  }, []);

  useEffect(() => {
    idRef.current++;
    workRef.current.postMessage({ tsx, id: idRef.current });
  }, [tsx]);

  const styleElement = generateStyleElementsString(styles.concat(getAllFiles(files, "css")));

  const scriptElement = generateScriptElementsString(DEFAULT_SCRIPTS.concat(scripts));

  const linkElement = generateLinkElementsString(links);

  const iframeDOC = generateIframeDOC({
    links: linkElement,
    styles: styleElement,
    scripts: scriptElement,
    inlineHtml: files["index.html"].content,
  });

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
