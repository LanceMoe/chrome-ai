export function getChromeVersion() {
  const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
  return raw ? parseInt(raw[2], 10) : 0;
}

export async function checkAi() {
  const version = getChromeVersion();
  if (typeof window.ai === 'undefined') {
    if (version < 127) {
      throw new Error('Your browser is not supported. Please upgrade Chrome version to 127 or later.');
    } else {
      throw new Error(
        'Prompt API is not available, check your configuration in `chrome://flags/#prompt-api-for-gemini-nano` and `chrome://flags/#optimization-guide-on-device-model`',
      );
    }
  }

  // NOTE: Chrome will auto download model after called createTextSession
  await window.ai
    .createTextSession()
    .then((session) => {
      console.log('Successfully created session', session);
      // NOTE: Release session after created
      session.destroy();
    })
    .catch((e) => {
      console.error(e);
    });

  const engineStatus = await window.ai.canCreateTextSession();
  // if (engineStatus === 'no') {
  //   throw new Error(
  //     'Built-in AI is not supported, check your configuration in `chrome://flags/#optimization-guide-on-device-model` and `chrome://components/`',
  //   );
  // }
  // if (engineStatus === 'after-download') {
  //   throw new Error('Built-in AI model is not downloaded, check your configuration in `chrome://components/`');
  // }
  return engineStatus;
}
