import { axiosClient } from "@blog/graphql";
import { useColorModeValue } from "@chakra-ui/react";
import { DiffFile } from "@git-diff-view/core";
import { useEffect } from "react";
import { createState } from "reactivity-store";

import { base64ToString } from "@app/utils/text";

import { useDiffLoadedItems } from "./useDiffLoadedItems";
import { HighlightEngine, useDiffViewConfig } from "./useDiffViewConfig";
import { useGitHubCompareSourceList } from "./useGitHubCompareSource";

import type { MessageData } from "@app/worker/diffView.default.worker";
import type { DiffViewProps } from "@git-diff-view/react";

const worker =
  useDiffViewConfig.getReadonlyState().engine === HighlightEngine.shiki
    ? typeof Worker !== "undefined"
      ? new Worker(new URL("@app/worker/diffView.shiki.worker", import.meta.url))
      : null
    : typeof Worker !== "undefined"
      ? new Worker(new URL("@app/worker/diffView.default.worker", import.meta.url))
      : null;

const loadContent = async (url: string) => {
  const res = await axiosClient.get(url);
  return res?.data;
};

export const useDiffViewDiffFile = createState(
  () => ({
    state: {} as Record<
      string,
      {
        pureLoading: boolean;
        pureDiffFile: DiffFile;
        mode: "full" | "pure";
        content: string;
        link?: string;
        fullLoading: boolean;
        fullDiffFile: DiffFile;
        // final render diffFile
        renderDiffFile?: DiffFile;
      }
    >,
  }),
  {
    withActions: (s) => ({
      setPureDiffFile: (id: string, diffFile: DiffFile) => {
        const item = useGitHubCompareSourceList.getReadonlyState().list.find((i) => i.sha === id);
        if (!item) return;
        s.state[id] = { ...s.state[id], pureLoading: false, pureDiffFile: diffFile };
        useDiffLoadedItems.getActions().open(item.filename);
      },
      setFullDiffFile: (id: string, diffFile: DiffFile) => {
        const item = useGitHubCompareSourceList.getReadonlyState().list.find((i) => i.sha === id);
        if (!item) return;
        s.state[id] = { ...s.state[id], fullLoading: false, fullDiffFile: diffFile };
        useDiffLoadedItems.getActions().open(item.filename);
      },
      setRenderDiffFile: (id: string, diffFile?: DiffFile) => {
        const item = useGitHubCompareSourceList.getReadonlyState().list.find((i) => i.sha === id);
        if (!item) return;
        s.state[id].renderDiffFile = diffFile;
      },
      setMode: (id: string, mode: "full" | "pure") => {
        s.state[id] = { ...s.state[id], mode };
      },
      setContent: (id: string, content: string) => {
        s.state[id] = { ...s.state[id], content };
      },
      startPureLoading: (id: string) => {
        s.state[id] = { ...s.state[id], pureLoading: true };
      },
      startFullLoading: (id: string) => {
        s.state[id] = { ...s.state[id], fullLoading: true };
      },
      registerListener: () => {
        const cb = (event: MessageEvent<MessageData>) => {
          const { setFullDiffFile, setPureDiffFile } = useDiffViewDiffFile.getActions();

          if (event.data.id) {
            const d = DiffFile.createInstance(event.data.data, event.data.bundle);

            if (event.data.type === "full") {
              setFullDiffFile(event.data.id.toString(), d);
            } else {
              setPureDiffFile(event.data.id.toString(), d);
            }
          }
        };

        worker.addEventListener("message", cb);

        return () => worker.removeEventListener("message", cb);
      },
      loadDiff: async (id: string, type: "full" | "pure", theme: "light" | "dark") => {
        if (type === "pure" && (s.state[id]?.pureLoading || s.state[id]?.pureDiffFile)) return;

        if (type === "full" && (s.state[id]?.fullLoading || s.state[id]?.fullDiffFile)) return;

        const item = useGitHubCompareSourceList.getReadonlyState().list.find((i) => i.sha === id);

        if (!item) return;

        if (!item.patch) return;

        s.state[id] = s.state[id] || { fullDiffFile: null, pureDiffFile: null, pureLoading: false, fullLoading: false, mode: "pure", content: "" };

        if (type === "pure") {
          const data: DiffViewProps<unknown>["data"] = {
            newFile: {
              fileName: item.filename,
            },
            hunks: [`--- a \n+++ b \n` + (item.patch.endsWith("\n") ? item.patch : item.patch + "\n")],
          };

          const messageData: MessageData = {
            id,
            type: "pure",
            uuid: id + "pure",
            data,
            theme,
            engine: useDiffViewConfig.getReadonlyState().engine,
          };

          s.state[id].pureLoading = true;

          s.state[id].mode = "pure";

          worker.postMessage(messageData);
        } else {
          if (!s.state[id].content) {
            try {
              const res = (await loadContent(item.contents_url)) as { content: string; html_url: string; encoding: string };

              s.state[id].link = res.html_url;

              if (res.encoding === "base64") {
                const c = base64ToString(res.content);

                s.state[id].content = c;
              } else {
                console.error("Unsupported encoding:", res.encoding);
              }
            } catch (e) {
              console.error("Failed to load content:", e);
            }

            const data: DiffViewProps<unknown>["data"] = {
              newFile: {
                fileName: item.filename,
                content: item.status !== "removed" ? s.state[id].content : "",
              },
              hunks: [`--- a \n+++ b \n` + (item.patch.endsWith("\n") ? item.patch : item.patch + "\n")],
            };

            const messageData: MessageData = {
              id,
              type: s.state[id].content ? "full" : "pure",
              uuid: id + (s.state[id].content ? "full" : "pure"),
              data,
              theme,
              engine: useDiffViewConfig.getReadonlyState().engine,
            };

            if (s.state[id].content) {
              s.state[id].fullLoading = true;
              s.state[id].mode = "full";
            } else {
              s.state[id].pureLoading = true;
              s.state[id].mode = "pure";
            }
            worker.postMessage(messageData);
          }
        }
      },
      clear: () => (s.state = {}),
    }),
    withDeepSelector: false,
    withStableSelector: true,
  },
);

export const useDiffViewLoading = () => {
  const list = useGitHubCompareSourceList((s) => s.list);

  const state = useDiffViewDiffFile((s) => s.state);

  return !list.every((i) => state[i.sha]?.pureDiffFile || state[i.sha]?.fullDiffFile);
};

export const useAutoLoadDiffFile = () => {
  const theme = useColorModeValue("light", "dark");

  const list = useGitHubCompareSourceList((s) => s.list);

  const state = useDiffViewDiffFile((s) => s.state);

  const allLoaded = list.every((i) => state[i.sha]?.fullDiffFile || state[i.sha]?.pureDiffFile);

  useEffect(() => {
    const { registerListener } = useDiffViewDiffFile.getActions();

    const unSubscribe = registerListener();

    return unSubscribe;
  }, []);

  useEffect(() => {
    const { loadDiff } = useDiffViewDiffFile.getActions();

    list.forEach((item) => loadDiff(item.sha, "pure", theme));
  }, [list, theme]);

  return !allLoaded;
};
