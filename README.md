# @kassetto/tables

Reusable table components in the native way with added functionality.

## Capabilities

- Sortable
- Selectable
- Predictable
- Native way of constructing tables

## Code example
```tsx
function tableSort(index: string, item1: any, item2: any) {
  if (typeof item1[index] === 'string')
    return item1[index].localeCompare(item2[index]);
  return item1[index] - item2[index];
}
```

```tsx
const [order, setOrder] = useState<'ascending' | 'descending' | undefined>();

const handleOrder = useCallback((col: string, ord: 'ascending' | 'descending') => {
  setColumn(col);
  setOrder(ord);
}, []);

const orderedItems = useMemo(() => {
  if (column && order) {
    const compareFn = tableSort.bind(null, column);
    const ordered = [...mappedProducts].sort(compareFn);

    return order === 'ascending' ? ordered : ordered.reverse();
  }
  return mappedProducts;
}, [column, order, mappedProducts]);
...
<Table orderable onOrder={handleOrder} selectable onSelectionChange={(rows) => {console.log(rows)}}>
  <TableHead>
    <TableHeadRow>
      <TableColumn column="name">Name</TableColumn>
      <TableColumn>Image</TableColumn>
      <TableColumn>Description</TableColumn>
      <TableColumn column="items">Number of items</TableColumn>
    </TableHeadRow>
  </TableHead>
  <TableBody>
    {
      orderedItems.map((item) => {
        return (
          <TableRow key={item.id} row={item}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <img
                className="product-image"
                src={item.imageUrl}
                alt={item.name}
              />
            </TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.items}</TableCell>
          </TableRow>
        );
      })
    }
  </TableBody>
</Table>
...
```
