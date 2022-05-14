import { Box } from "@chakra-ui/react";

import { BaseTable } from "./BaseTable";
import { Column } from "./Column";
import { Pagination } from "./Pagination";
import { TableProps } from "./type";
import { useChildren } from "./useChildren";
import { useSkeleton } from "./useSkeleton";
import { SorterContext, useSorter } from "./useSorter";

export function Table<T>({
  dataSource,
  stickyDataSource,
  sorter,
  pagination,
  noResultText: _noResultText,
  CustomNoResult,
  tableProps,
  skeletonRowCount,
  rowProps,
  children,
  containerProps,
  afterSorting,
}: TableProps<T>) {
  const noResultText = "empty";
  const { innerSorter, onSort, sortedRows } = useSorter(
    sorter,
    dataSource,
    stickyDataSource,
    afterSorting
  );
  const { skeletonRows, skeletonVisible } = useSkeleton(
    dataSource || stickyDataSource,
    skeletonRowCount
  );

  const ChildRender = useChildren(children, rowProps, stickyDataSource?.length);

  return (
    <SorterContext.Provider
      value={{
        sorter: innerSorter,
        onSort,
      }}
    >
      <Box {...containerProps}>
        <BaseTable {...tableProps}>
          {children && (
            <ChildRender
              dataSource={skeletonVisible ? skeletonRows : sortedRows}
            />
          )}
        </BaseTable>
        {!skeletonVisible &&
          sortedRows.length === 0 &&
          (CustomNoResult ? <CustomNoResult /> : noResultText)}
        {!!pagination && <Pagination {...pagination} />}
      </Box>
    </SorterContext.Provider>
  );
}

Table.Column = Column;
