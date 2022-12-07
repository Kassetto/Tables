import { forwardRef, AllHTMLAttributes, useMemo } from "react";
import { classnames, ClassNameShape } from "./util/classnames";

export const TableBody = forwardRef<HTMLTableSectionElement, AllHTMLAttributes<HTMLTableSectionElement>>(
  ({
    children,
    className: providedClassName,
    ...props
  }, ref) => {
    const className = useMemo(() => {
      const obj: ClassNameShape = {
        'table-body': true,
      };

      if (providedClassName) obj[providedClassName] = true;

      return classnames(obj);
    }, [providedClassName]);

    return (
      <tbody
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';
