import { forwardRef, AllHTMLAttributes, useMemo } from "react";
import { classnames, ClassNameShape } from "./util/classnames";

export const TableHeadRow = forwardRef<HTMLTableRowElement, AllHTMLAttributes<HTMLTableRowElement>>(
  ({
    children,
    className: providedClassName,
    ...props
  }, ref) => {
    const className = useMemo(() => {
      const obj: ClassNameShape = {
        'table-row': true,
      };

      if (providedClassName) obj[providedClassName] = true;

      return classnames(obj);
    }, [providedClassName]);

    return (
      <tr
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableHeadRow.displayName = 'TableHeadRow';
