import XIcon from 'bootstrap-icons/icons/x.svg?react';

import { FileDto } from '@/core/lib/types';
import { cn } from '@/core/lib/utils';

type FileListProps = {
  files: FileDto[];

  onRemove?: (file: FileDto) => void;
  disabled?: boolean;
  className?: string;
};

export function AppFileList({ files, onRemove, disabled, className }: FileListProps) {
  return (
    <div className={cn('w-full mb-2', className)} onClick={(event) => event.stopPropagation()}>
      {files.map((file) => (
        <AppFileListElement key={file.name} file={file} onRemove={onRemove} disabled={disabled} />
      ))}
    </div>
  );
}

type FileListElementProps = {
  file: FileDto;

  onRemove?: (file: FileDto) => void;
  disabled?: boolean;
};

function AppFileListElement({ file, onRemove, disabled }: FileListElementProps) {
  function handleRemoveClick(event: React.MouseEvent) {
    if (disabled) {
      return;
    }
    event.stopPropagation();
    onRemove!(file);
  }

  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between  mx-4 my-2 p-2 rounded-lg border border-gray-200',
        disabled ? 'bg-gray-100 ' : 'bg-white'
      )}
    >
      <div className="truncate">{file.name}</div>
      <div>{onRemove && !disabled && <XIcon className="w-8 h-8" onClick={handleRemoveClick} />}</div>
    </div>
  );
}
