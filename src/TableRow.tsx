import React, { forwardRef, AllHTMLAttributes, useMemo, useState, useCallback, MouseEventHandler, KeyboardEventHandler } from "react";
import { classnames, ClassNameShape } from "./util/classnames";
import { Row, useTableContext } from "./Table.context";

export interface TableRowProps extends Omit<AllHTMLAttributes<HTMLTableRowElement>, 'aria-selected'> {
  row?: Row;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({
    children,
    className: providedClassName,
    row,
    tabIndex: providedTabIndex,
    onClick: providedOnClick,
    onKeyDown: providedOnKeyDown,
    ...rest
  }, ref) => {
    const [selected, setSelected] = useState(false);

    const { selectable, toggleSelection } = useTableContext();

    const className = useMemo(() => {
      const obj: ClassNameShape = {
        'table-row': true,
        selected,
      };

      if (providedClassName) obj[providedClassName] = true;

      return classnames(obj);
    }, [providedClassName, selected]);

    const handleClick = useCallback<MouseEventHandler<HTMLTableRowElement>>((evt) => {
      if (selectable && row) {
        setSelected((isSelected) => {
          return !isSelected;
        });
        toggleSelection(row);
      }

      providedOnClick?.(evt);
    }, [selectable, providedOnClick, toggleSelection, row]);

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTableRowElement>>((evt) => {
      if (selectable && (evt.key === ' ' || evt.key === 'Enter') && row) {
        setSelected((isSelected) => {
          return !isSelected;
        });
        toggleSelection(row);
      }
      providedOnKeyDown?.(evt);
    }, [providedOnKeyDown, row, selectable, toggleSelection]);

    const a11yProps = useMemo(() => {
      if (selectable) {
        return {
          'aria-selected': selected
        };
      }
    }, [selectable, selected]);

    const tabIndex = selectable ? 0 : providedTabIndex;
  
    return (
      <tr
        {...a11yProps}
        className={className}
        ref={ref}
        tabIndex={tabIndex}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';
