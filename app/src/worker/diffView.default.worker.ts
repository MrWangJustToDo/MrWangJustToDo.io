import { DiffFile, highlighter } from "@git-diff-view/core";

import type { HighlightEngine } from "@app/hooks/useDiffViewConfig";
import type { DiffViewProps } from "@git-diff-view/react";

export type MessageData = {
  uuid?: string;
  id: number | string;
  type: "full" | "pure";
  theme?: "light" | "dark";
  engine?: HighlightEngine;
  data: DiffViewProps<any>["data"];
  bundle?: ReturnType<DiffFile["_getFullBundle"]>;
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
    _data?.uuid,
  );

  file.initTheme(_data.theme);

  file.initRaw();

  file.initSyntax();

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
