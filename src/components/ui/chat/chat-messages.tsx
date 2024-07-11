import { MacScrollbar } from 'mac-scrollbar';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { ChatHandler } from './chat';
import { ChatActions } from './chat-actions';
import { ChatMessage } from './chat-message';

type Props = Pick<ChatHandler, 'messages' | 'isLoading' | 'reload' | 'stop'> & {
  className?: string;
};

export function ChatMessages(props: Props) {
  const { messages, isLoading, reload, stop, className } = props;
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);
  const messageLength = messages.length;
  const lastMessage = messages.at(-1);

  const scrollToBottom = () => {
    const container = scrollableChatContainerRef.current;
    if (!container) {
      return;
    }
    container.scrollTo(0, container.scrollHeight);
  };

  const isLastMessageFromAssistant = messageLength > 0 && lastMessage?.role !== 'user';
  const showReload = !!reload && !isLoading && isLastMessageFromAssistant;
  const showStop = !!stop && !!isLoading;

  useEffect(() => {
    scrollToBottom();
  }, [messageLength, lastMessage?.content.length]);

  return (
    <MacScrollbar
      skin="light"
      ref={scrollableChatContainerRef}
      className={twMerge('w-full rounded-xl bg-white p-4 border pb-0 h-full overflow-auto scroll-smooth', className)}
    >
      <div className="flex flex-col gap-5">
        {!!messages?.length && messages.map((m) => <ChatMessage key={m.id} {...m} />)}
      </div>

      <div className="flex justify-start py-4 pl-12">
        <ChatActions reload={reload} stop={stop} showReload={showReload} showStop={showStop} />
      </div>
    </MacScrollbar>
  );
}
