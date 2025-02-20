import { flexRender, Header, Table } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { Fragment } from 'react/jsx-runtime';

import { AppTableClearFiltersButton } from '@/core/components/table/common/AppTableClearFiltersButton';
import { AppTableFilterIcon } from '@/core/components/table/common/AppTableFilterIcon';
import { AppTableFilterList } from '@/core/components/table/common/AppTableFilterList';
import { AppTableSortingToggle } from '@/core/components/table/common/AppTableSortingToggle';
import { getCapabilities } from '@/core/components/table/common/utils';
import { cn } from '@/core/lib/utils';

type Props<T> = {
  table: Table<T>;
};
export function AppMobileTableFilterForm<T>({ table }: Props<T>) {
  return (
    <div className="flex flex-col gap-8 ">
      <AppTableClearFiltersButton table={table} />
      {table.getHeaderGroups().map((headerGroup) => (
        <div key={headerGroup.id} className="flex flex-col gap-4 ">
          {headerGroup.headers.map((header) => (
            <Fragment key={header.id}>
              <FormElement header={header} />
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

type FormElementProps<T> = {
  header: Header<T, unknown>;
};
function FormElement<T>({ header }: FormElementProps<T>) {
  const { supportsSort, supportsFilter } = getCapabilities(header);
  if (!supportsFilter && !supportsSort) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 border-b border-gray-300 pb-4">
      <div className="flex justify-between items-center">
        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
        <div className="flex flex-col gap-2">
          {supportsSort && <SortFormElement header={header} />}
          {supportsFilter && <FilterFormElement header={header} />}
        </div>
      </div>
    </div>
  );
}

function SortFormElement<T>({ header }: FormElementProps<T>) {
  return (
    <div
      className={cn('flex gap-2 items-center justify-end', header.column.getIsSorted() ? 'font-bold' : '')}
      onClick={() => header.column.toggleSorting()}
    >
      <AppTableSortingToggle header={header} />
    </div>
  );
}

function FilterFormElement<T>({ header }: FormElementProps<T>) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
      <div
        className={cn('flex gap-2 items-center justify-end', header.column.getIsFiltered() ? 'font-bold' : '')}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Ukryj filtry' : 'Pokaż filtry'}
        <AppTableFilterIcon header={header} />
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ ease: 'easeOut' }}
            className="w-100"
          >
            <AppTableFilterList header={header} expanded={expanded} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
