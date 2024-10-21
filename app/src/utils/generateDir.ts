import type { GitHubCompareFileListType } from "@app/hooks/useGitHubCompareSource";

export interface TreeViewData {
  id: string;
  name: string;
  value: string;
  deep?: number;
  isDir?: boolean;
  isOpen?: boolean;
  parent?: TreeViewData;
  hasNextDir?: boolean;
  isLeaf?: boolean;
  status?: GitHubCompareFileListType['status'];
  children: TreeViewData[];
}

export const generateDirs = (data: GitHubCompareFileListType[]) => {
  const map: Record<string, TreeViewData> = {};

  const re: TreeViewData[] = [];

  let maxLength = 0;

  const arr = data.map((item) => {
    const files = item.filename.split("/");
    maxLength = maxLength > files.length ? maxLength : files.length;
    return { ...item, files };
  });

  // 生成
  const loop = (index: number) => {
    if (index >= maxLength) return;
    arr.forEach((item) => {
      if (index >= item.files.length) return;
      const currentTitle = item.files[index];
      const currentPath = item.files.slice(0, index + 1).join("/");
      const previousPath = item.files.slice(0, index).join("/");
      const currentItem =
        map[currentPath] ||
        (index !== item.files.length - 1
          ? { name: currentTitle, value: currentPath, id: currentPath, children: [] }
          : { ...item, name: currentTitle, value: currentPath, id: currentPath, isLeaf: true, children: [] });
      if (previousPath && map[previousPath]) {
        const prevItem = map[previousPath];
        if (prevItem.children?.every((i) => i.value !== currentItem.value)) {
          prevItem.children?.push(currentItem);
        }
      } else if (!map[currentPath]) {
        if (index === 0) {
          re.push(currentItem);
        }
      }
      map[currentPath] = currentItem;
    });
    loop(index + 1);
  };

  const link = (node: TreeViewData[]) => {
    let prevDir: TreeViewData = null;

    node.forEach((item) => {
      if (!item.isLeaf && item.children) {
        if (prevDir) {
          prevDir.hasNextDir = true;
        }

        prevDir = item;

        item.isDir = true;

        link(item.children);
      }
    });
  };

  // 合并
  const compress = (node: TreeViewData[]): TreeViewData[] => {
    const re = node.reduce<TreeViewData[]>((p, c) => {
      if (c.children) {
        // 递归子项
        const compressedChildren = compress(c.children);
        // 当子节点只有一个 并且不是文件类型的时候才执行合并
        if (compressedChildren.length === 1 && !compressedChildren[0].isLeaf) {
          p.push(
            ...compressedChildren.map((_i) => ({
              id: c.id + "/" + _i.id,
              name: c.name + "/" + _i.name,
              value: c.value + "/" + _i.value,
              children: _i.children,
              isLeaf: _i.isLeaf,
            })),
          );
        } else {
          c.children = compressedChildren;
          p.push(c);
        }
      } else {
        p.push(c);
      }

      return p;
    }, []);

    return re;
  };

  loop(0);

  // 第一个层级不用合并，避免视图上的歧义
  re.forEach((r) => {
    if (r.children) {
      r.children = compress(r.children);
    }
  });

  link(re);

  return re;
};

export const flattenDirs = (data: TreeViewData, isCollapsed?: (item: TreeViewData) => boolean) => {
  const list: TreeViewData[] = [];

  data.deep = 0;

  const stack = [data];

  while (stack.length) {
    const currentNode = stack.pop();

    if (!currentNode) continue;

    list.push(currentNode);

    if (currentNode.children) {
      if (typeof isCollapsed === "function" && isCollapsed(currentNode)) {
        continue;
      }

      currentNode.isOpen = true;

      for (let i = currentNode.children.length - 1; i >= 0; i--) {
        const item = currentNode.children[i];

        item.parent = currentNode;

        item.deep = currentNode.deep + 1;

        stack.push(item);
      }
    }
  }

  return list;
};
