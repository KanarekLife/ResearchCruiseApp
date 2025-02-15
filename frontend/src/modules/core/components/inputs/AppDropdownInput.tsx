import ChevronDownIcon from 'bootstrap-icons/icons/chevron-down.svg?react';
import ChevronUpIcon from 'bootstrap-icons/icons/chevron-up.svg?react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { AppButton } from '@/core/components/AppButton';
import { AppInputErrorsList } from '@/core/components/inputs/parts/AppInputErrorsList';
import { AppInputErrorTriangle } from '@/core/components/inputs/parts/AppInputErrorTriangle';
import { AppInputHelper } from '@/core/components/inputs/parts/AppInputHelper';
import { AppInputLabel } from '@/core/components/inputs/parts/AppInputLabel';
import { useDropdown } from '@/core/hooks/DropdownHook';
import { useOutsideClickDetection } from '@/core/hooks/OutsideClickDetectionHook';
import { cn } from '@/core/lib/utils';

export type AppDropdownInputOption<T> = {
  value: T;
  inlineLabel: React.ReactNode;
  richLabel?: React.ReactNode;
};

type Props<T> = {
  name: string;
  value: T;
  allOptions: AppDropdownInputOption<T>[];

  onChange: (value: T) => void;
  onBlur: () => void;
  errors?: string[];
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  helper?: React.ReactNode;
  showEmptyOption?: boolean;
  placeholder?: string;
};
export function AppDropdownInput<T extends string | number>({
  name,
  value,
  allOptions,
  onChange,
  onBlur,
  errors,
  label,
  required,
  disabled,
  helper,
  showEmptyOption = true,
  placeholder = 'Wybierz',
}: Props<T>) {
  const inputRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<AppDropdownInputOption<T>>(() => {
    if (!value) {
      return showEmptyOption ? { value: value, inlineLabel: placeholder } : allOptions[0];
    }

    return allOptions.find((o) => o.value === value) ?? { value: value, inlineLabel: placeholder };
  });
  const allPossibleOptions = showEmptyOption
    ? [
        {
          value: undefined,
          inlineLabel: selectedValue.value ? placeholder : undefined,
          richLabel: selectedValue.value ? <span className="text-red-500">Usuń aktualny wybór</span> : undefined,
        },
        ...allOptions,
      ]
    : allOptions;

  useOutsideClickDetection({
    refs: [inputRef, dropdownRef],
    onOutsideClick: () => {
      setExpanded(false);
      onBlur();
    },
  });

  function selectOption(option: AppDropdownInputOption<T | undefined>) {
    if (option.value === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { value: _, ...rest } = option;
      const emptyOption = typeof allOptions[0].value === 'number' ? 0 : '';
      setSelectedValue({ value: emptyOption as unknown as T, ...rest });
      setExpanded(false);
      onChange(emptyOption as unknown as T);
      onBlur();
      return;
    }

    setSelectedValue(option as AppDropdownInputOption<T>);
    setExpanded(false);
    onChange(option.value);
    onBlur();
  }

  return (
    <div className="flex flex-col">
      <AppInputLabel name={name} label={label} />
      <div
        className={cn(
          'relative inline-block',
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full',
          'transition duration-300 ease-in-out',
          disabled ? 'bg-gray-200' : '',
          errors ? 'border-danger ring-danger text-danger focus:text-gray-900' : ''
        )}
        ref={inputRef}
      >
        <input type="hidden" name={name} value={selectedValue.value} required={required} disabled={disabled} />
        <AppButton
          variant="plain"
          onClick={() => {
            if (disabled) return;
            setExpanded(!expanded);
          }}
          className={cn(
            'cursor-pointer w-full text-sm',
            'ring-2 ring-transparent focus:ring-blue-500 focus:border-blue-500 focus:rounded-lg focus:shadow focus:outline-none',
            'flex justify-between items-center'
          )}
        >
          {selectedValue.inlineLabel}
          <span className="flex gap-2">
            <AppInputErrorTriangle errors={errors} />
            <span>{expanded ? <ChevronUpIcon className="w-6 h-6" /> : <ChevronDownIcon className="w-6 h-6" />}</span>
          </span>
        </AppButton>
      </div>
      <div className={cn('flex flex-row justify-between text-sm', errors || helper ? 'mt-2 ' : '')}>
        <AppInputHelper helper={helper} />
        <AppInputErrorsList errors={errors} />
      </div>
      <AnimatePresence>
        {expanded && (
          <Modal dropdownRef={dropdownRef} inputRef={inputRef}>
            {allPossibleOptions
              .filter((pv) => pv.inlineLabel)
              .map((pv) => (
                <AppButton
                  key={`dropdown-option-${pv.value}`}
                  variant="plain"
                  className={cn(
                    'inline-flex gap-4 items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                    'ring-2 ring-transparent focus:ring-blue-500 focus:border-blue-500 focus:rounded-lg focus:shadow focus:outline-none',
                    disabled ? 'opacity-50' : ''
                  )}
                  role="menuitem"
                  onClick={() => selectOption(pv)}
                  disabled={disabled}
                >
                  {pv.richLabel ?? pv.inlineLabel}
                </AppButton>
              ))}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

type ModalProps = {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLDivElement | null>;

  children: React.ReactNode;
};

function Modal({ dropdownRef, inputRef, children }: ModalProps) {
  const { top, left, width, direction } = useDropdown({
    openingItemRef: inputRef,
    dropdownRef,
    dropdownPosition: 'left',
  });

  return (
    <motion.div
      style={{ top: top, left: left, width: width }}
      className={cn(
        'fixed origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden z-50'
      )}
      initial={{ opacity: 0, translateY: '-10%' }}
      animate={{ opacity: 1, translateY: '0' }}
      exit={{ opacity: 0, translateY: direction === 'up' ? '10%' : '-10%' }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      ref={dropdownRef}
    >
      {children}
    </motion.div>
  );
}
