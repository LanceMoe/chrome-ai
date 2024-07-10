import { Loader2Icon, PaperclipIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { buttonVariants } from './button';

type Props = {
  config?: {
    inputId?: string;
    fileSizeLimit?: number;
    allowedExtensions?: string[];
    checkExtension?: (extension: string) => string | null;
    disabled: boolean;
  };
  onFileUpload: (file: File) => Promise<void>;
  onFileError?: (errMsg: string) => void;
};

const DEFAULT_INPUT_ID = 'fileInput';
const DEFAULT_FILE_SIZE_LIMIT = 1024 * 1024 * 50; // 50 MB

export function FileUploader(props: Props) {
  const { config, onFileUpload, onFileError } = props;
  const [uploading, setUploading] = useState(false);

  const inputId = config?.inputId || DEFAULT_INPUT_ID;
  const fileSizeLimit = config?.fileSizeLimit || DEFAULT_FILE_SIZE_LIMIT;
  const allowedExtensions = config?.allowedExtensions;
  const defaultCheckExtension = (extension: string) => {
    if (allowedExtensions && !allowedExtensions.includes(extension)) {
      return `Invalid file type. Please select a file with one of these formats: ${allowedExtensions!.join(',')}`;
    }
    return null;
  };
  const checkExtension = config?.checkExtension ?? defaultCheckExtension;

  const isFileSizeExceeded = (file: File) => {
    return file.size > fileSizeLimit;
  };

  const resetInput = () => {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = '';
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    await handleUpload(file);
    resetInput();
    setUploading(false);
  };

  const handleUpload = async (file: File) => {
    const onFileUploadError = onFileError || window.alert;
    const fileExtension = file.name.split('.').pop() || '';
    const extensionFileError = checkExtension(fileExtension);
    if (extensionFileError) {
      return onFileUploadError(extensionFileError);
    }

    if (isFileSizeExceeded(file)) {
      return onFileUploadError(`File size exceeded. Limit is ${fileSizeLimit / 1024 / 1024} MB`);
    }

    await onFileUpload(file);
  };

  return (
    <div className="self-stretch">
      <input
        type="file"
        id={inputId}
        style={{ display: 'none' }}
        onChange={onFileChange}
        accept={allowedExtensions?.join(',')}
        disabled={config?.disabled || uploading}
      />
      <label
        htmlFor={inputId}
        className={twMerge(
          buttonVariants({ variant: 'secondary', size: 'icon' }),
          'cursor-pointer',
          uploading && 'opacity-50',
        )}
      >
        {uploading ? (
          <Loader2Icon className="h-4 w-4 animate-spin" />
        ) : (
          <PaperclipIcon className="-rotate-45 w-4 h-4" />
        )}
      </label>
    </div>
  );
}
