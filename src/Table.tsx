import React, { forwardRef, AllHTMLAttributes, useMemo, useState, useCallback, useEffect } from "react";
import { classnames, ClassNameShape } from "./util/classnames";
import { Row, TableContext, TableContextShape } from "./Table.context";

import "./Table.css";

export interface TableProps extends AllHTMLAttributes<HTMLTableElement> {
  orderable?: boolean;
  onOrder?: (column: string, order: 'ascending' | 'descending') => void;
  onSelectionChange?: (rows: Array<Row>) => void;
  rowDisplayMode?: 'checkbox' | 'base';
  selectable?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({
    children,
    className: providedClassName,
    onOrder,
    orderable = false,
    onSelectionChange,
    rowDisplayMode = 'base',
    selectable = false,
    ...rest
  }, ref) => {
    const [selection, setSelection] = useState<Array<Row> | undefined>();
    const [orderedColumn, setOrderedColumn] = useState<string | undefined>();

    const className = useMemo(() => {
      const obj: ClassNameShape = {
        table: true,
      };

      if (providedClassName) obj[providedClassName] = true;

      return classnames(obj);
    }, [providedClassName]);

    const toggleSelection = useCallback((row: Row) => {
      setSelection((current) => {
        if (!current)
          return [row];
        if (current.includes(row)) {
          const index = current.indexOf(row);

          return [
            ...current.slice(0, index),
            ...current.slice(index + 1),
          ];
        }
        return [...current, row];
      });
    }, []);

    const order = useCallback((column: string, order: "ascending" | "descending") => {
      setOrderedColumn(column);
      onOrder?.(column, order);
    }, [onOrder]);

    useEffect(() => {
      if (selection)
        onSelectionChange?.(selection);
    }, [onSelectionChange, selection]);

    const memoValue = useMemo<TableContextShape>(() => {
      return {
        order,
        orderable,
        toggleSelection,
        rowDisplayMode,
        selectable,
        orderedColumn,
      };
    }, [order, orderable, orderedColumn, rowDisplayMode, selectable, toggleSelection]);

    return (
      <TableContext.Provider value={memoValue}>
        <table
          className={className}
          ref={ref}
          {...rest}
        >
          {children}
        </table>
      </TableContext.Provider>
    );
  }
);

Table.displayName = 'Table';
