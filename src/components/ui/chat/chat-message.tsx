import { CheckIcon, CopyIcon } from 'lucide-react';

import { useCopyToClipboard } from '../../../hooks/use-copy-to-clipboard';
import { Button } from '../button';
import { Message } from './chat';
import { ChatAvatar } from './chat-avatar';
import { Markdown } from './markdown';

type Props = Message;

export function ChatMessage(props: Props) {
  const { role, content } = props;
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  return (
    <div className="flex items-start gap-4 pr-5 pt-5">
      <ChatAvatar role={role} />
      <div className="group flex flex-1 justify-between gap-2">
        <div className="flex-1">
          <Markdown content={content} />
        </div>
        <Button
          onClick={() => copyToClipboard(content)}
          size="icon"
          variant="ghost"
          className="h-8 w-8 opacity-0 group-hover:opacity-100"
        >
          {isCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
