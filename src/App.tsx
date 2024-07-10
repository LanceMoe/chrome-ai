import { useCallback, useEffect, useState } from 'react';

import { ChatInput, ChatMessages, type Message } from '@/components/ui/chat';
import { checkAi } from '@/utils/checkAi';

function ChatPage() {
  const [aiEngineStatus, setAiEngineStatus] = useState<AITextSessionStatus>('no');

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

  const [messages, setMessages] = useState<Message[]>([]);

  const submitMessage = useCallback(
    async (text: string) => {
      if (!canUseAi || !window.ai) {
        return;
      }

      // Add user message to the chat
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: text,
          role: 'user',
        },
      ]);

      // Create a new message with a random ID
      const messageId = crypto.randomUUID();
      const newMessage = {
        id: messageId,
        content: '',
        role: 'assistant',
      };

      // Use the AI model to generate a response
      const session = await window.ai.createTextSession({
        temperature: 0.8, // 0-1 (default: 0.8)
        topK: 3, // 1-20 (default: 3)
      });
      const streamingResponse = await session.promptStreaming(text);
      for await (const chunk of streamingResponse) {
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
      session.destroy();
    },
    [canUseAi],
  );

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-4">
      <ChatMessages messages={messages} />
      <ChatInput
        multiModal
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
  return (
    <>
      {/* <h1 className="text-red-500">
        Can Use AI: {canUseAi ? 'Yes' : 'No'} ({aiEngineStatus})
      </h1>
      <p>{text}</p> */}
      <ChatPage />
    </>
  );
}

export default App;
