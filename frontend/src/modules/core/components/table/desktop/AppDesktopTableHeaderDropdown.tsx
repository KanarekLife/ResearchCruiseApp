import { Header } from '@tanstack/react-table';
import TrashIcon from 'bootstrap-icons/icons/trash.svg?react';
import { motion } from 'motion/react';
import React from 'react';

import { AppFloatingLabelInput } from '@/core/components/inputs/AppFloatingLabelInput';
import { AppTableSortingToggle } from '@/core/components/table/common/AppTableSortingToggle';
import { AppDesktopTableHeaderDropdownItem } from '@/core/components/table/desktop/AppDesktopTableHeaderDropdownItem';
import { useDropdown } from '@/core/hooks/DropdownHook';

type Props<TData, TValue> = {
  header: Header<TData, TValue>;
  capabilities: { supportsDropdown: boolean; supportsFilter: boolean; supportsSort: boolean };
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  headerRef: React.RefObject<HTMLDivElement | null>;
  expanded: boolean;
};
export function AppDesktopTableHeaderDropdown<TData, TValue>({
  header,
  capabilities,
  dropdownRef,
  headerRef,
  expanded,
}: Props<TData, TValue>) {
  const { supportsDropdown, supportsFilter, supportsSort } = capabilities;
  const [filterValue, setFilterValue] = React.useState<TData[] | undefined>(
    header.column.getFilterValue() as TData[] | undefined
  );
  const [searchValue, setSearchValue] = React.useState<string>('');
  const uniqueValues = React.useMemo(() => {
    return Array.from(header.column.getFacetedUniqueValues().entries()).sort();
  }, [header.column]);
  const { top, left, direction } = useDropdown({ openingItemRef: headerRef, dropdownRef });

  function toggleFilter(filter: TData) {
    if ((filterValue ?? []).includes(filter)) {
      const newState = (filterValue ?? []).filter((f) => f !== filter);
      setFilterValue(newState);
      header.column.setFilterValue(newState);
      return;
    }

    const newState = [...(filterValue ?? []), filter];
    setFilterValue(newState.length === 0 ? undefined : newState);
    header.column.setFilterValue(newState.length === 0 ? undefined : newState);
  }

  function toggleAll(checked: boolean) {
    const allValues = searchValue
      ? uniqueValues.filter(([value]) => value.toString().includes(searchValue))
      : uniqueValues;

    const newState = checked ? allValues.map(([value]) => value) : [];
    setFilterValue(newState.length === 0 ? undefined : newState);
    header.column.setFilterValue(newState.length === 0 ? undefined : newState);
  }

  function clearFilters() {
    setFilterValue(undefined);
    header.column.setFilterValue(undefined);
  }

  function isFilterChecked(filter: TData) {
    return (filterValue ?? []).includes(filter);
  }

  if (!supportsDropdown) {
    return null;
  }

  return (
    <motion.div
      className={
        'fixed origin-top-right w-56 rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden z-50'
      }
      initial={{ opacity: 0, translateY: direction === 'up' ? '-10%' : '10%' }}
      animate={{ opacity: 1, translateY: '0' }}
      exit={{ opacity: 0, translateY: direction === 'down' ? '-10%' : '10%' }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      ref={dropdownRef}
      style={{ top: top, left: left }}
    >
      <div className="py-1" role="none">
        {supportsSort && <p>Sortowanie</p>}
        <AppDesktopTableHeaderDropdownItem
          onClick={() => header.column.toggleSorting()}
          isRendered={supportsSort}
          expanded={expanded}
        >
          <AppTableSortingToggle header={header} />
        </AppDesktopTableHeaderDropdownItem>

        {supportsFilter && supportsSort && <hr className="h-px my-0.5 border-0 bg-gray-700" />}

        {supportsFilter && <p>Filtrowanie</p>}
        {supportsFilter && (
          <div className="inline-flex gap-4 items-center w-full px-4 py-2 ">
            <div>
              <input type="checkbox" onChange={(evt) => toggleAll(evt.currentTarget.checked)} />
            </div>
            <div className="relative w-full text-left">
              <AppFloatingLabelInput
                label="Szukaj"
                name="search"
                type="text"
                value={searchValue}
                onChange={setSearchValue}
                className="text-xs"
              />
            </div>
          </div>
        )}

        <div className="max-h-64 overflow-y-auto">
          {uniqueValues
            .filter(([value]) => value.toString().includes(searchValue))
            .map((value) => (
              <AppDesktopTableHeaderDropdownItem
                key={value[0]}
                onClick={() => toggleFilter(value[0])}
                isRendered={supportsFilter}
                expanded={expanded}
              >
                <input type="checkbox" checked={isFilterChecked(value[0])} className="cursor-pointer" readOnly />
                {value[0]}
              </AppDesktopTableHeaderDropdownItem>
            ))}
        </div>

        <AppDesktopTableHeaderDropdownItem
          onClick={() => clearFilters()}
          isRendered={supportsFilter}
          disabled={!filterValue}
          expanded={expanded}
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          Wyczyść filtry
        </AppDesktopTableHeaderDropdownItem>
      </div>
    </motion.div>
  );
}
