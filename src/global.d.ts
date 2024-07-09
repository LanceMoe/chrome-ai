declare global {
  interface Window {
    ai?: AI;
  }
  const ai: AI | undefined;
}

export {};
