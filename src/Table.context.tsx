import { createContext, useContext } from "react";

export interface Row {
  [key: string]: any;
}

export interface TableContextShape {
  order?: (column: string, order: 'ascending' | 'descending') => void;
  orderable: boolean;
  rowDisplayMode: 'checkbox' | 'base';
  toggleSelection: (row: Row) => void;
  selectable: boolean;
  orderedColumn?: string;
}

export const defaultContext: TableContextShape = {
  order: () => {},
  orderable: false,
  toggleSelection: () => {},
  selectable: false,
  rowDisplayMode: 'base',
};

export const TableContext = createContext(defaultContext);

export const useTableContext = () => {
  return useContext(TableContext);
};