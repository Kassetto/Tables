import React, { forwardRef, AllHTMLAttributes, useMemo, useState, useCallback, MouseEventHandler, useLayoutEffect } from "react";
import { classnames, ClassNameShape } from "./util/classnames";
import { useTableContext } from "./Table.context";

export interface TableColumnProps extends AllHTMLAttributes<HTMLTableCellElement> {
  column?: string;
}

export const TableColumn = forwardRef<HTMLTableCellElement, TableColumnProps>(
  ({
    column,
    children,
    className: providedClassName,
    ...rest
  }, ref) => {
    const [order, setOrder] = useState<'ascending' | 'descending' | undefined>();

    const { order: orderTable, orderable, orderedColumn } = useTableContext();
    
    const className = useMemo(() => {
      const obj: ClassNameShape = {
        'table-column': true,
        orderable,
      };

      if (providedClassName) obj[providedClassName] = true;

      return classnames(obj);
    }, [providedClassName, orderable]);

    const a11yProps = useMemo(() => {
      if (orderable && orderedColumn === column)
        return {
          'aria-sort': order,
        };
    }, [column, order, orderable, orderedColumn]);

    const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
      setOrder((current) => {
        return current === 'ascending' ? 'descending' : 'ascending';
      });
    }, []);

    useLayoutEffect(() => {
      if (orderable && order)
        orderTable?.(column || "", order);
    }, [column, order, orderTable, orderable]);

    return (
      <th
        {...a11yProps}
        className={className}
        ref={ref}
        {...rest}
      >
        {orderable ? (
          <button type="button" aria-pressed={orderedColumn === column} onClick={handleClick}>
            {children}
          </button>
        ): (
          children
        )}
      </th>
    );
  }
);

TableColumn.displayName = 'TableColumn';
