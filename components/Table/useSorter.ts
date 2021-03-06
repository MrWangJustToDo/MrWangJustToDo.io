import { createContext, useCallback, useMemo, useState } from "react";

import { Sorter, SortOrder } from "./type";

export const SorterContext = createContext<{
  sorter: Sorter<any>;
  onSort: (sorter: Sorter<any>) => void;
}>({ sorter: { order: SortOrder.None }, onSort: () => {} });

export function useSorter<T>(
  sorter?: Sorter<T>,
  dataSource?: T[],
  afterSorting?: () => void
) {
  const [innerSorter, setInnerSorter] = useState<Sorter<T>>({
    order: SortOrder.None,
    genCompareFn: (sorter: Sorter<T>) => (a: T, b: T) => {
      const by = sorter.by as string;
      if (by === null) return 0;
      if (!(by in a) || !(by in b)) return 0;
      return sorter.order === SortOrder.Asc ? a[by] - b[by] : b[by] - a[by];
    },
    ...sorter,
  });
  const onSort = useCallback(
    (sorter: Sorter<T>) => {
      const newSorter = { ...innerSorter, ...sorter };
      sorter.onSort?.(newSorter);
      setInnerSorter(newSorter);
    },
    [innerSorter]
  );

  const sortedRows = useMemo(() => {
    const tempRows = [...(dataSource || [])];
    if (innerSorter.order !== SortOrder.None) {
      tempRows.sort(innerSorter.genCompareFn?.(innerSorter));
      afterSorting && afterSorting();
    }
    return tempRows;
  }, [dataSource, innerSorter, afterSorting]);

  return {
    innerSorter,
    onSort,
    sortedRows,
  };
}
