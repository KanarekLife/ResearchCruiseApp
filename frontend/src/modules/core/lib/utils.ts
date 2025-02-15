import { ValidationError } from '@tanstack/react-form';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function mapValidationErrors(errors: ValidationError[]): string[] | undefined {
  if (!errors.length) {
    return undefined;
  }

  return errors.map((error) => error!.toString());
}

export function groupBy<T>(array: T[], key: (item: T) => string): [string, T[]][] {
  return Object.entries(
    array.reduce(
      (groups, item) => {
        const group = key(item);
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(item);
        return groups;
      },
      {} as Record<string, T[]>
    )
  );
}
