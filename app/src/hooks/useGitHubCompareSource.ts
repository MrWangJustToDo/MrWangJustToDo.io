import { axiosClient } from "@blog/graphql";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { createState } from "reactivity-store";

import { flattenDirs, generateDirs } from "@app/utils/generateDir";

import { useDebouncedState } from "./useDebouncedState";

import type { TreeViewData } from "@app/utils/generateDir";

type GitHubCompareSourceType = {
  owner?: string;
  repo?: string;
  sourceCommit?: string;
  targetCommit?: string;
  dirty?: boolean;
  key: number;
};

export type GitHubCompareFileListType = {
  filename: string;
  previous_filename?: string;
  patch: string;
  raw_url: string;
  contents_url: string;
  additions: number;
  changes: number;
  deletions: number;
  status?: "added" | "modified" | "removed" | "renamed";
};

const temp: GitHubCompareSourceType = { owner: "MrWangJustToDo", repo: "git-diff-view", sourceCommit: "v0.0.12", targetCommit: "v0.0.13", key: 0, dirty: true };

export const useGitHubCompareSource = createState(() => ({ ...temp }) as GitHubCompareSourceType, {
  withDeepSelector: false,
  withNamespace: "useGitHubCompareSource",
  withActions: (state) => {
    return {
      setOwner: (owner: string) => {
        state.dirty = true;
        state.owner = owner;
      },
      setRepo: (repo: string) => {
        state.dirty = true;
        state.repo = repo;
      },
      setSourceCommit: (sourceCommit: string) => {
        state.dirty = true;
        state.sourceCommit = sourceCommit;
      },
      setTargetCommit: (targetCommit: string) => {
        state.dirty = true;
        state.targetCommit = targetCommit;
      },
      setDirty: (dirty: boolean) => {
        state.dirty = dirty;
        if (!dirty) {
          temp.owner = state.owner;
          temp.repo = state.repo;
          temp.sourceCommit = state.sourceCommit;
          temp.targetCommit = state.targetCommit;
        }
      },
      restore: () => {
        state.owner = temp.owner;
        state.repo = temp.repo;
        state.sourceCommit = temp.sourceCommit;
        state.targetCommit = temp.targetCommit;
        state.dirty = false;
      },
      refresh: () => state.key++,
    };
  },
  withStableSelector: true,
});

export const useGitHubCompareSourceList = createState(
  () =>
    ({ list: [], data: [], flattenData: [], loading: false }) as {
      list: GitHubCompareFileListType[];
      data: TreeViewData[];
      flattenData: TreeViewData[];
      loading: boolean;
    },
  {
    withDeepSelector: false,
    withStableSelector: true,
    // withNamespace: "useDifHubCompareSourceList",
    withActions: (state) => ({
      setList: (list: GitHubCompareFileListType[]) => {
        state.list = list;
        state.data = generateDirs(list);
        state.flattenData = state.data.map((i) => flattenDirs(i)).flat();
      },
      setLoading: (loading: boolean) => {
        state.loading = loading;
      },
      refreshList: () => (state.flattenData = state.data.map((i) => flattenDirs(i, (l) => !l.isOpen)).flat()),
    }),
  },
);

const { setList, setLoading } = useGitHubCompareSourceList.getActions();

export const useGitHubCompareSourceState = () => {
  const { owner, repo, sourceCommit, targetCommit, dirty, key } = useGitHubCompareSource();

  const [url, setUrl] = useDebouncedState("", 1000);

  const open = useToast();

  useEffect(() => {
    if (dirty) return;
    if (owner && repo && sourceCommit && targetCommit) {
      setUrl(`https://api.github.com/repos/${owner}/${repo}/compare/${sourceCommit}...${targetCommit}`);
    } else {
      setUrl("");
    }
  }, [owner, repo, setUrl, sourceCommit, targetCommit, dirty]);

  useEffect(() => {
    if (url) {
      setLoading(true);
      axiosClient
        .get(url)
        .then((res) => {
          const list = res?.data?.files?.sort((a, b) => (a.filename > b.filename ? 1 : -1));
          setList(list || []);
        })
        .catch((e) => {
          open({ title: "Error", description: e.message, status: "error" });
        })
        .finally(() => setLoading(false));
    } else {
      setList([]);
    }
  }, [open, url, key]);

  return { url };
};

export const useGitHubCompareSourceSelect = createState(() => ({}) as { key?: string }, {
  withActions: (s) => ({ setKey: (key: string) => (s.key = key) }),
  withDeepSelector: false,
  withStableSelector: true,
  withNamespace: "useGitHubCompareSourceSelect",
});

export const useGitHubCompareTreeSelect = createState(() => ({}) as { key?: string }, {
  withActions: (s) => ({ setKey: (key: string) => (s.key = key) }),
  withDeepSelector: false,
  withStableSelector: true,
  withNamespace: "useGitHUbCOmpareTreeSelect",
});

export const useGitHubCompareSourceInView = createState(() => ({ id: "" }), {
  withActions: (s) => ({ setId: (id: string) => (s.id = id) }),
  withDeepSelector: false,
  withStableSelector: true,
  withNamespace: "useGitHubCompareSourceInView",
});
