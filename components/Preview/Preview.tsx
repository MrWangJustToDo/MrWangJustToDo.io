import {
  PLAYGROUND_BABEL,
  PLAYGROUND_MY_REACT,
  PLAYGROUND_MY_REACT_DOM,
} from "config/source";
import { useEditor } from "hooks/useEditor";
import {
  generateIframeDOC,
  generateLinkElementsString,
  generateScriptElementsString,
  generateStyleElementsString,
} from "utils/preview";

const BABEL_URL = PLAYGROUND_BABEL;
const REACT_URL = PLAYGROUND_MY_REACT;
const REACT_DOM_URL = PLAYGROUND_MY_REACT_DOM;

const ALL_SCRIPTS = Array.from(new Set([BABEL_URL, REACT_URL, REACT_DOM_URL]));

const DEFAULT_SCRIPTS: PreviewProps["scripts"] = ALL_SCRIPTS.map(
  (s, index) => ({ href: s, id: index.toString() })
);

export type PreviewProps = {
  links?: { id: string; href: string }[];
  styles?: { id: string; content: string }[];
  scripts?: { id: string; type?: string; content?: string; href?: string }[];
  onLoad?: () => void;
};

export const IFramePreview = ({
  styles = [],
  scripts = [],
  links = [],
  onLoad,
}: PreviewProps) => {
  const files = useEditor((state) => state.files);
  const styleElement = generateStyleElementsString(
    styles.concat(files["style.css"])
  );
  const scriptElement = generateScriptElementsString(
    DEFAULT_SCRIPTS.concat(scripts).concat(files["script.jsx"])
  );
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
      width="100%"
      height="100%"
      title="Preview"
      className="playGround_preview"
      sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
      srcDoc={iframeDOC}
    />
  );
};
