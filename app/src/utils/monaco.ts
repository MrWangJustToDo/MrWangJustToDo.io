/* eslint-disable max-lines */
import type { Monaco } from "@monaco-editor/react";
import type monaco from "monaco-editor";

// SEE https://github.com/microsoft/monaco-editor/issues/264
export const setMonacoTSXSupport = async (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco, type: string) => {
  // look like not work
  const { default: traverse } = await import("@babel/traverse");
  const { parse } = await import("@babel/parser");
  const babelParse = (code: string) => {
    try {
      return parse(code, { sourceType: "module", plugins: ["jsx", "typescript"], errorRecovery: true });
    } catch {
      void 0;
    }
  };
  // >>> The star of the show =P >>>
  const { default: MonacoJSXHighlighter } = await import(
    "monaco-jsx-highlighter" // Note: there is a polyfilled version alongside the regular version.
  ); // For example, starting with 2.0.2, 2.0.2-polyfilled is also available.

  // Instantiate the highlighter
  const monacoJSXHighlighter = new MonacoJSXHighlighter(
    monaco, // references Range and other APIs
    babelParse, // obtains an AST, internally passes to parse options: {...options, sourceType: "module",plugins: ["jsx"],errorRecovery: true}
    traverse, // helps collecting the JSX expressions within the AST
    editor, // highlights the content of that editor via decorations
  );
  // Start the JSX highlighting and get the dispose function
  monacoJSXHighlighter.highlightOnDidChangeModelContent();
  // Enhance monaco's editor.action.commentLine with JSX commenting and get its disposer
  monacoJSXHighlighter.addJSXCommentCommand();
  // <<< You are all set. >>>

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: "React",
    allowJs: true,
    typeRoots: ["node_modules"],
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  // add React & ReactDOM type support
  monaco.languages.typescript.typescriptDefaults.addExtraLib(`${type}`, "file:///node_modules/@types/react/next.d.ts");
};
