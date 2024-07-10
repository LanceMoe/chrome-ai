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
  const lastMessage = messages[messageLength - 1];

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop = scrollableChatContainerRef.current.scrollHeight;
    }
  };

  const isLastMessageFromAssistant = messageLength > 0 && lastMessage?.role !== 'user';
  const showReload = reload && !isLoading && isLastMessageFromAssistant;
  const showStop = stop && !!isLoading;

  useEffect(() => {
    scrollToBottom();
  }, [messageLength, lastMessage]);

  return (
    <div className={twMerge('w-full rounded-xl bg-white p-4 shadow-xl pb-0', className)}>
      <div className="flex h-[50vh] flex-col gap-5 divide-y overflow-y-auto pb-4" ref={scrollableChatContainerRef}>
        {messages.map((m) => (
          <ChatMessage key={m.id} {...m} />
        ))}
      </div>
      <div className="flex justify-end py-4">
        <ChatActions reload={reload} stop={stop} showReload={showReload} showStop={showStop} />
      </div>
    </div>
  );
}
