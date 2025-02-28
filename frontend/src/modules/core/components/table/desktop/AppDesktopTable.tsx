import { flexRender } from '@tanstack/react-table';

import { AppButton } from '@/core/components/AppButton';
import { AppDesktopTableHeader } from '@/core/components/table/desktop/AppDesktopTableHeader';
import { TableProps } from '@/core/components/table/tableProps';

export function AppDesktopTable<T>({ table, buttons, emptyTableMessage }: TableProps<T>) {
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
                  <AppDesktopTableHeader key={header.id} header={header}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </AppDesktopTableHeader>
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
