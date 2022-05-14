import { TableCellProps } from '@chakra-ui/react'
import { ReactElement } from 'react'

import {
  BodyCellProps,
  BodyCellPropsWithDataIndex,
  HeadCellProps,
  HeadCellPropsWithDataIndex,
} from './type'

export type ColumnHeadCellRender = ({
  rowIndex,
  colIndex,
}: {
  rowIndex: number
  colIndex: number
}) => ReactElement

export type ColumnBodyCellRender<T> = ({
  rowIndex,
  colIndex,
  rowData,
  stickyRows,
}: {
  rowIndex: number
  colIndex: number
  rowData: T
  stickyRows?: number
}) => ReactElement

export function Column<T, K extends keyof T = keyof T>({
  dataIndex,
  cellProps,
  headCellProps,
  bodyCellProps,
  isHidden,
  headCellRender,
  bodyCellRender,
}: {
  dataIndex: keyof T
  cellProps?: TableCellProps
  headCellProps?: TableCellProps
  bodyCellProps?: TableCellProps
  isHidden?: boolean
  headCellRender:
    | HeadCellPropsWithDataIndex<T, K>
    | HeadCellPropsWithDataIndex<T, K>[]
  bodyCellRender: BodyCellPropsWithDataIndex<T, K>
}): React.ReactElement

export function Column<T>({
  cellProps,
  headCellProps,
  bodyCellProps,
  isHidden,
  headCellRender,
  bodyCellRender,
}: {
  cellProps?: TableCellProps
  headCellProps?: TableCellProps
  bodyCellProps?: TableCellProps
  isHidden?: boolean
  headCellRender: HeadCellProps<T> | HeadCellProps<T>[]
  bodyCellRender: BodyCellProps<T>
}): React.ReactElement

export function Column<T>({
  dataIndex: _dataIndex,
  cellProps: _cellProps,
  headCellProps: _headCellProps,
  bodyCellProps: _bodyCellProps,
  isHidden: _isHidden,
  headCellRender: _headCellRender,
  bodyCellRender: _bodyCellRender,
}: ColumnParams<T>) {
  return <></>
}

export type ColumnParams<T> = {
  dataIndex?: keyof T
  cellProps?: TableCellProps
  headCellProps?: TableCellProps
  bodyCellProps?: TableCellProps
  isHidden?: boolean
  headCellRender:
    | HeadCellProps<T>
    | HeadCellProps<T>[]
    | HeadCellPropsWithDataIndex<T>
    | HeadCellPropsWithDataIndex<T>[]
  bodyCellRender: BodyCellProps<T> | BodyCellPropsWithDataIndex<T>
}
