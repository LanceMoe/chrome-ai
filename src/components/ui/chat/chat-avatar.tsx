import { BotIcon, User2Icon } from 'lucide-react';

type Props = { role: string };

export function ChatAvatar(props: Props) {
  const { role } = props;
  if (role === 'user') {
    return (
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        <User2Icon className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-black text-white shadow">
      <BotIcon className="h-4 w-4" />
    </div>
  );
}
