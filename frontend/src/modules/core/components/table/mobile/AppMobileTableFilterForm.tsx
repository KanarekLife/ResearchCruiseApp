import { Table } from '@tanstack/react-table';

type Props<T> = {
  table: Table<T>;
};

export function AppMobileTableFilterForm<T>({ table }: Props<T>) {
  return 'form';
}
