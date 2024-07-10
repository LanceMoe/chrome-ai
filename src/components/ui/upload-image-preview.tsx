import { XCircleIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = { url: string; onRemove: () => void };

export function UploadImagePreview(props: Props) {
  const { url, onRemove } = props;
  return (
    <div className="relative w-20 h-20 group">
      <img src={url} alt="Uploaded image" className="object-cover w-full h-full rounded-xl hover:brightness-75" />
      <div
        className={twMerge(
          'absolute -top-2 -right-2 w-6 h-6 z-10 bg-gray-500 text-white rounded-full hidden group-hover:block',
        )}
      >
        <XCircleIcon className="w-6 h-6 bg-gray-500 text-white rounded-full" onClick={onRemove} />
      </div>
    </div>
  );
}
