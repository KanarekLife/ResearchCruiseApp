import CloudUploadIcon from 'bootstrap-icons/icons/cloud-upload.svg?react';
import React from 'react';

import { AppFileList } from '@/core/components/inputs/parts/AppFileList';
import { AppInputErrorsList } from '@/core/components/inputs/parts/AppInputErrorsList';
import { AppInputHelper } from '@/core/components/inputs/parts/AppInputHelper';
import { AppInputLabel } from '@/core/components/inputs/parts/AppInputLabel';
import { FileDto } from '@/core/lib/types';
import { cn } from '@/core/lib/utils';

type Props = {
  name: string;

  onBlur?: () => void;
  errors?: string[];
  label?: React.ReactNode;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  helper?: React.ReactNode;
  uploadMessage?: string;
} & (
  | {
      allowMultiple: true;
      value: FileDto[];
      onChange: (value: FileDto[]) => void;
    }
  | {
      allowMultiple: false;
      value: FileDto;
      onChange: (value: FileDto) => void;
    }
);

export function AppFileInput({
  name,
  value,
  onBlur,
  onChange,
  errors,
  label,
  required,
  allowMultiple,
  className,
  disabled,
  helper,
  uploadMessage = 'Kliknij lub przeciągnij plik',
}: Props) {
  const [files, setFiles] = React.useState<FileDto[]>(allowMultiple ? value : value ? [value] : []);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (onChange) {
      if (allowMultiple) {
        onChange(files);
      } else {
        onChange(files[0]);
      }
    }

    if (onBlur) {
      onBlur();
    }
  }, [allowMultiple, files, onBlur, onChange]);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawFiles = event.target.files;
    if (!rawFiles) {
      return;
    }

    const newFiles = await Promise.all(Array.from(rawFiles).map(async (file) => await convertFile(file)));
    setFiles(newFiles);
  }

  function removeFile(file: FileDto) {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  }

  return (
    <div>
      <AppInputLabel name={name} label={label} />

      <div className="flex items-center justify-center w-full" onClick={() => inputRef.current?.click()}>
        <label
          className={cn(
            'flex flex-col items-center justify-center w-full border-2 border-gray-300 text-gray-500',
            'border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-x-auto',
            disabled ? 'bg-gray-200 hover:bg-gray-200 cursor-default' : '',
            errors ? 'border-danger ring-danger text-danger focus:text-gray-900' : '',
            className
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-sm">
            <CloudUploadIcon className="w-8 h-8 mb-4" />
            {uploadMessage}
          </div>
          {files.length > 0 && <AppFileList files={files} onRemove={removeFile} disabled={disabled} />}
        </label>
      </div>

      <input
        type="file"
        name={name}
        ref={inputRef}
        multiple={allowMultiple}
        required={required}
        disabled={disabled}
        className="hidden"
        onChange={handleChange}
      />
      <div className={cn('flex flex-col justify-between text-sm', errors || helper ? 'mt-2' : '')}>
        <AppInputHelper helper={helper} />
        <AppInputErrorsList errors={errors} />
      </div>
    </div>
  );
}

async function convertFile(file: File): Promise<FileDto> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result?.toString();
      if (!content) {
        throw new Error(`Failed to read the ${file.name} file content`);
      }
      resolve({ name: file.name, content });
    };
    reader.readAsDataURL(file);
  });
}
