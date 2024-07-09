import { useEffect, useState } from 'react';

import { checkAi } from '@/utils/checkAi';

function App() {
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

  const [text, setText] = useState('');

  useEffect(() => {
    if (!canUseAi) {
      return;
    }

    (async () => {
      if (!window.ai) {
        return;
      }
      const session = await window.ai.createTextSession({
        temperature: 0.8, // 0-1 (default: 0.8)
        topK: 3, // 1-20 (default: 3)
      });
      const streamingResponse = await session.promptStreaming('请扮演脱口秀演员，讲一些冷笑话。');
      for await (const chunk of streamingResponse) {
        setText(chunk);
      }
      session.destroy();
    })();
  }, [canUseAi]);

  return (
    <>
      <h1 className="text-red-500">
        Can Use AI: {canUseAi ? 'Yes' : 'No'} ({aiEngineStatus})
      </h1>
      <p>{text}</p>
    </>
  );
}

export default App;
