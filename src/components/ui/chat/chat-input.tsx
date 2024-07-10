import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '../button';
import { FileUploader } from '../file-uploader';
import { Input } from '../input';
import { UploadImagePreview } from '../upload-image-preview';
import { ChatHandler } from './chat';

type Props = Pick<
  ChatHandler,
  'isLoading' | 'inputValue' | 'onFileUpload' | 'onFileError' | 'handleSubmit' | 'handleInputChange'
> & {
  multiModal?: boolean;
  className?: string;
};

export function ChatInput(props: Props) {
  const { handleSubmit, multiModal, onFileUpload, onFileError, inputValue, handleInputChange, isLoading, className } =
    props;
  const [imageUrl, setImageUrl] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleSubmit) {
      if (imageUrl) {
        handleSubmit(e, {
          data: { imageUrl },
        });
      } else {
        handleSubmit(e);
      }
    }
    setImageUrl('');
  };

  const onRemovePreviewImage = () => setImageUrl('');

  const handleUploadImageFile = async (file: File) => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
    setImageUrl(base64);
  };

  const handleUploadFile = async (file: File) => {
    try {
      if (multiModal && file.type.startsWith('image/')) {
        return await handleUploadImageFile(file);
      }
      onFileUpload?.(file);
    } catch (error) {
      if (error instanceof Error) {
        onFileError?.(error.message);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className={twMerge('rounded-xl bg-white p-4 shadow-xl space-y-4', className)}>
      {!!imageUrl && <UploadImagePreview url={imageUrl} onRemove={onRemovePreviewImage} />}
      <div className="flex w-full items-start justify-between gap-4 ">
        <Input
          autoFocus
          name="message"
          placeholder="Type a message"
          className="flex-1"
          value={inputValue}
          onChange={handleInputChange}
        />
        <FileUploader onFileUpload={handleUploadFile} onFileError={onFileError} />
        <Button type="submit" disabled={isLoading}>
          Send message
        </Button>
      </div>
    </form>
  );
}
