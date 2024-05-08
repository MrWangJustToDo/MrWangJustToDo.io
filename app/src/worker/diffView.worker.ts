import { DiffFile, highlighter } from "@git-diff-view/core";

import type { DiffViewProps } from "@git-diff-view/react";

export type MessageData = {
  id: number;
  data: DiffViewProps<any>["data"];
  bundle: ReturnType<DiffFile["_getFullBundle"]>;
};

const post = (d: MessageData) => postMessage(d);

highlighter.setMaxLineToIgnoreSyntax(60000);

onmessage = (event: MessageEvent<MessageData>) => {
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

  file.init();

  file.buildSplitDiffLines();

  file.buildUnifiedDiffLines();

  const bundle = file._getFullBundle();

  bundle.fileLineLength = Math.max(bundle.splitLineLength, bundle.unifiedLineLength, bundle.newFileResult?.maxLineNumber);

  const res: MessageData = {
    id: _data.id,
    data: _data.data,
    bundle: bundle,
  };

  file.clear();

  post(res);
};
