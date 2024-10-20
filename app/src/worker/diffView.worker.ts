import { DiffFile, highlighter } from "@git-diff-view/core";
import { highlighterReady } from "@git-diff-view/shiki";

import { HighlightEngine } from "@app/hooks/useDiffViewConfig";

import type { DiffViewProps } from "@git-diff-view/react";

export type MessageData = {
  id: number;
  theme?: "light" | "dark";
  engine?: HighlightEngine;
  data: DiffViewProps<any>["data"];
  bundle: ReturnType<DiffFile["_getFullBundle"]>;
};

const post = (d: MessageData) => postMessage(d);

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
  );

  file.initTheme(_data.theme);

  file.initRaw();

  if (_data.engine === HighlightEngine.shiki) {
    try {
      const shikiHighlighter = await highlighterReady;
      if (shikiHighlighter.hasRegisteredCurrentLang(file._oldFileLang) && shikiHighlighter.hasRegisteredCurrentLang(file._newFileLang)) {
        file.initSyntax({ registerHighlighter: shikiHighlighter });
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
    data: _data.data,
    bundle: bundle,
  };

  file.clear();

  post(res);
};
