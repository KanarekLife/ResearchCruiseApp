import DownloadIcon from 'bootstrap-icons/icons/download.svg?react';
import XIcon from 'bootstrap-icons/icons/x.svg?react';
import React from 'react';

import { AppModal } from '@/core/components/AppModal';
import { FileDto } from '@/core/lib/types';
import { cn, createModalPortal } from '@/core/lib/utils';

type FileListProps = {
  files: FileDto[];

  onRemove?: (file: FileDto) => void;
  disabled?: boolean;
  className?: string;
};

export function AppFileList({ files, onRemove, disabled, className }: FileListProps) {
  const [fileInPreview, setFileInPreview] = React.useState<FileDto | undefined>(undefined);

  return (
    <>
      <div className={cn('w-full', className)} onClick={(event) => event.stopPropagation()}>
        {files.map((file) => (
          <AppFileListElement
            key={file.name}
            file={file}
            setFileInPreview={setFileInPreview}
            onRemove={onRemove}
            disabled={disabled}
          />
        ))}
      </div>
      {createModalPortal(
        <AppModal
          isOpen={fileInPreview !== undefined}
          onClose={() => setFileInPreview(undefined)}
          title={fileInPreview?.name || ''}
        >
          <div className="flex flex-col items-center justify-center p-4 h-220">
            <object data={fileInPreview?.content} className="h-full w-full" />
          </div>
        </AppModal>
      )}
    </>
  );
}

type FileListElementProps = {
  file: FileDto;
  setFileInPreview: (file: FileDto) => void;

  onRemove?: (file: FileDto) => void;
  disabled?: boolean;
};

function AppFileListElement({ file, setFileInPreview, onRemove, disabled }: FileListElementProps) {
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between  mx-4 my-2 p-2 rounded-lg border border-gray-200',
        disabled ? 'bg-gray-100 ' : 'bg-white'
      )}
    >
      <div className="truncate" onClick={() => setFileInPreview(file)}>
        {file.name}
      </div>

      <div className="flex flex-row items-center gap-2 mr-2">
        {onRemove && !disabled && <XIcon className="w-8 h-8" onClick={() => onRemove!(file)} />}
        <DownloadIcon className="w-6 h-6" onClick={() => linkRef.current?.click()} />
      </div>

      <a ref={linkRef} download={file.name} href={file.content} className="hidden" />
    </div>
  );
}
