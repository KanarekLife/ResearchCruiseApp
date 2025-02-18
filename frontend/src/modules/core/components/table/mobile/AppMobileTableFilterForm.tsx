import { flexRender, Header, Table } from '@tanstack/react-table';
import { Fragment } from 'react/jsx-runtime';

import { AppTableClearFiltersButton } from '@/core/components/table/common/AppTableClearFiltersButton';
import { AppTableFilterIcon } from '@/core/components/table/common/AppTableFilterIcon';
import { AppTableSortingToggle } from '@/core/components/table/common/AppTableSortingToggle';
import { getCapabilities } from '@/core/components/table/common/utils';
import { cn } from '@/core/lib/utils';

type Props<T> = {
  table: Table<T>;
};
export function AppMobileTableFilterForm<T>({ table }: Props<T>) {
  return (
    <div className="flex flex-col gap-8">
      {table.getHeaderGroups().map((headerGroup) => (
        <div key={headerGroup.id} className="flex flex-col gap-4">
          {headerGroup.headers.map((header) => (
            <Fragment key={header.id}>
              <FormElement header={header} />
            </Fragment>
          ))}
        </div>
      ))}
      <AppTableClearFiltersButton table={table} />
    </div>
  );
}

function FormElement<T>({ header }: { header: Header<T, unknown> }) {
  const { supportsSort, supportsFilter } = getCapabilities(header);
  if (!supportsFilter && !supportsSort) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center w-full">
        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
        <div className="flex flex-col gap-2">
          {supportsSort && <SortFormElement header={header} />}
          {supportsFilter && <FilterFormElement header={header} />}
        </div>
      </div>
    </div>
  );
}

function SortFormElement<T>({ header }: { header: Header<T, unknown> }) {
  return (
    <div
      className={cn('flex gap-2 items-center justify-end', header.column.getIsSorted() ? 'font-bold' : '')}
      onClick={() => header.column.toggleSorting()}
    >
      <AppTableSortingToggle header={header} />
    </div>
  );
}

function FilterFormElement<T>({ header }: { header: Header<T, unknown> }) {
  return (
    <div className={cn('flex gap-2 items-center justify-end', header.column.getIsFiltered() ? 'font-bold' : '')}>
      Filtruj
      <AppTableFilterIcon header={header} />
    </div>
  );
}
