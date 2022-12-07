import React, { forwardRef, AllHTMLAttributes, useMemo } from "react";
import { classnames, ClassNameShape } from "./util/classnames";

export const TableCell = forwardRef<HTMLTableCellElement, AllHTMLAttributes<HTMLTableCellElement>>(
  ({
    children,
    className: providedClassName,
    ...rest
  }, ref) => {
    const className = useMemo(() => {
      const obj: ClassNameShape = {
        'table-cell': true,
      };

      if (providedClassName) obj[providedClassName] = true;

      return classnames(obj);
    }, [providedClassName]);

    return (
      <td
        className={className}
        ref={ref}
        {...rest}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';
