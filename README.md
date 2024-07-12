# Chrome AI Test Page

https://chrome-ai.lance.moe/

This is a test page for the built-in AI model in Chrome. It is a simple page that allows you to test the model's performance on your device.

Using React, TypeScript, Tailwind CSS, shadcn-ui.

## Getting Started

### Prerequisites

- Latest version of Google Chrome (127+).
- **Make sure you have more than 22GB of free space on your system.**

### How to Set Up Built-in Gemini Nano in Chrome

1. **Install Chrome Canary**: Ensure you have version 127. [Download Chrome Canary](https://google.com/chrome/canary/).
2. **Enable Prompt API**: Open `chrome://flags/#prompt-api-for-gemini-nano`, set it to "Enabled".
3. **Enable Optimization Guide**: Open `chrome://flags/#optimization-guide-on-device-model`, set it to "Enabled BypassPerfRequirement". Restart the browser.
4. **Login to Google**: Make sure you are logged in to Chrome. For now, Incognito and Guest mode are not supported.
5. **Download Model**: Go to `chrome://components/`, and open DevTools(F12), run `await window.ai.createTextSession()` in the console. After a while, you could find "Optimization Guide On Device Model" in the list, ensure it’s fully downloaded. If the version is "0.0.0.0", click "Check for update".
6. **Troubleshoot**: If the "Optimization Guide On Device Model" is not displayed, disable the settings in steps 2 and 3, restart your browser and re-enable it.
7. **Verify Setup**: Open a webpage, press F12, and check `window.ai` in the console.
