export interface ClassNameShape {
  [key: string]: boolean;
}

export function classnames(obj: ClassNameShape) {
  return Object.entries(obj)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ');
}