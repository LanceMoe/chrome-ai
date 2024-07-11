import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ChatInput, ChatMessages, type Message } from '@/components/ui/chat';
import { checkAi } from '@/utils/checkAi';

function ChatPage() {
  const [aiEngineStatus, setAiEngineStatus] = useState<AITextSessionStatus>('no');
  const [isLoading, setIsLoading] = useState(false);
  const needStop = useRef(false);

  useEffect(() => {
    checkAi()
      .then((status) => {
        setAiEngineStatus(status);
        if (status === 'no') {
          console.error(
            'Built-in AI is not supported, check your configuration in `chrome://flags/#optimization-guide-on-device-model` and `chrome://components/`',
          );
        } else if (status === 'after-download') {
          console.error('Built-in AI model is not downloaded, check your configuration in `chrome://components/`');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const canUseAi = aiEngineStatus === 'readily';

  const { data: session } = useQuery({
    queryKey: ['ai'],
    queryFn: () =>
      window.ai?.createTextSession({
        temperature: 0.8, // 0-1 (default: 0.8)
        topK: 3, // 1-20 (default: 3)
      }),
    enabled: !!window.ai && canUseAi,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const [messages, setMessages] = useState<Message[]>([]);

  const submitMessage = useCallback(
    async (text: string) => {
      if (!canUseAi || !window.ai || !session) {
        return;
      }

      // Add user message to the chat
      const userMessage = {
        id: crypto.randomUUID(),
        content: text,
        role: 'user',
      };

      setMessages((prev) => [...prev, userMessage]);

      // Create a new message with a random ID
      const messageId = crypto.randomUUID();
      const newMessage = {
        id: messageId,
        content: '',
        role: 'assistant',
      };

      // Use the AI model to generate a response
      try {
        setIsLoading(true);

        const streamingResponse = await session.promptStreaming(text);
        for await (const chunk of streamingResponse) {
          if (needStop.current) {
            needStop.current = false;
            break;
          }
          newMessage.content = chunk;
          setMessages((prev) => {
            const index = prev.findIndex((m) => m.id === messageId);
            if (index === -1) {
              const newMessages = [...prev];
              newMessages.push(newMessage);
              return newMessages;
            }
            const newMessages = [...prev];
            newMessages[index] = newMessage;
            return newMessages;
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [canUseAi, session],
  );

  return (
    <div className="mx-auto max-w-5xl p-4 h-screen flex flex-col max-h-screen gap-4">
      <ChatMessages
        isLoading={!canUseAi || isLoading}
        messages={messages}
        reload={() => {
          const text = messages.at(-2)?.content;
          if (text) {
            setMessages((prev) => prev.slice(0, -2));
            submitMessage(text);
          }
        }}
        stop={() => {
          needStop.current = true;
        }}
      />
      <ChatInput
        isLoading={!canUseAi || isLoading}
        handleSubmit={(e, ops) => {
          console.log('Submit', e, ops);
          const formData = new FormData(e.currentTarget);
          const text = formData.get('message') as string;
          submitMessage(text);
        }}
      />
    </div>
  );
}

function App() {
  return <ChatPage />;
}

export default App;
