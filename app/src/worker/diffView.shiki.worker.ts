import { DiffFile, highlighter, setEnableFastDiffTemplate } from "@git-diff-view/core";
import { getDiffViewHighlighter } from "@git-diff-view/shiki";

import { HighlightEngine } from "@app/hooks/useDiffViewConfig";

import type { MessageData } from "./diffView.default.worker";

const post = (d: MessageData) => postMessage(d);

setEnableFastDiffTemplate(true);

highlighter.setMaxLineToIgnoreSyntax(60000);

onmessage = async (event: MessageEvent<MessageData>) => {
  const _data = event.data;

  const data = _data.data;

  const file = new DiffFile(
    data?.oldFile?.fileName || "",
    data?.oldFile?.content || "",
    data?.newFile?.fileName || "",
    data?.newFile?.content || "",
    data?.hunks || [],
    data?.oldFile?.fileLang || "",
    data?.newFile?.fileLang || "",
    _data?.uuid,
  );

  file.initTheme(_data.theme);

  file.initRaw();

  if (_data.engine === HighlightEngine.shiki) {
    try {
      const shikiHighlighter = await getDiffViewHighlighter();
      if (shikiHighlighter.hasRegisteredCurrentLang(file._oldFileLang) && shikiHighlighter.hasRegisteredCurrentLang(file._newFileLang)) {
        file.initSyntax({ registerHighlighter: shikiHighlighter });
      } else {
        file.initSyntax();
      }
    } catch {
      file.initSyntax();
    }
  } else {
    file.initSyntax();
  }

  file.buildSplitDiffLines();

  file.buildUnifiedDiffLines();

  const bundle = file._getFullBundle();

  const res: MessageData = {
    id: _data.id,
    type: _data.type,
    data: _data.data,
    bundle: bundle,
  };

  file.clear();

  post(res);
};
