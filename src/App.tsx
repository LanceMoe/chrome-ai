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

  return (
    <>
      <h1 className="text-red-500">
        Can Use AI: {canUseAi ? 'Yes' : 'No'} ({aiEngineStatus})
      </h1>
    </>
  );
}

export default App;
