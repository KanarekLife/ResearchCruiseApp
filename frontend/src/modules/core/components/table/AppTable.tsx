import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { AppButton } from '@/core/components/AppButton';
import { AppTableHeader } from '@/core/components/table/AppTableHeader';

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  buttons?: (predefinedButtons: React.ReactNode[]) => React.ReactNode[];
  childForEmpty?: React.ReactNode;
};

export function AppTable<T>({ data, columns, buttons, childForEmpty }: Props<T>) {
  const table = useReactTable<T>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    defaultColumn: {
      filterFn: 'arrIncludesSome',
    },
  });

  function isAnyFilterActive() {
    return table.getAllColumns().some((column) => column.getIsFiltered());
  }

  const defaultButtons: React.ReactNode[] = [
    <AppButton
      key="clearFiltersBtn"
      onClick={() => table.resetColumnFilters()}
      className={isAnyFilterActive() ? '' : 'opacity-50'}
      variant="danger"
      disabled={!isAnyFilterActive()}
    >
      Wyczyść filtry
    </AppButton>,
  ];
  const allButtons = buttons ? buttons(defaultButtons) : defaultButtons;

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end flex-wrap w-full gap-4 my-4">{...allButtons}</div>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <AppTableHeader key={header.id} header={header}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </AppTableHeader>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className=" odd:bg-gray-100 text-gray-800">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className="text-center pt-2 pb-2 last:pr-4"
                    style={{ width: `${cell.column.getSize()}px` }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
          {!!childForEmpty && table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={table.getAllColumns().length} className="text-center pt-4 pb-4">
                {childForEmpty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
