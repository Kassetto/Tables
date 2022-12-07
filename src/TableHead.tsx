import { forwardRef, AllHTMLAttributes, useMemo } from "react";
import { classnames, ClassNameShape } from "./util/classnames";

export const TableHead = forwardRef<HTMLTableSectionElement, AllHTMLAttributes<HTMLTableSectionElement>>(
  ({
    children,
    className: providedClassName,
    ...props
  }, ref) => {
    const className = useMemo(() => {
      const obj: ClassNameShape = {
        'table-head': true,
      };

      if (providedClassName) obj[providedClassName] = true;

      return classnames(obj);
    }, [providedClassName]);

    return (
      <thead
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHead.displayName = 'TableHead';
