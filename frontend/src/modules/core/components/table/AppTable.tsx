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
  emptyTableMessage?: string;
};

export function AppTable<T>({ data, columns, buttons, emptyTableMessage }: Props<T>) {
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
      <table className="w-full table-fixed">
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
            <tr key={row.id} className="odd:bg-gray-100 text-gray-800">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className="text-center py-2 first:pl-4 pr-4"
                    style={{ width: `${cell.column.getSize()}px` }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
          {!!emptyTableMessage && table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={table.getAllColumns().length} className="pb-4 text-center bg-gray-100 py-3 rounded-lg">
                {emptyTableMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
