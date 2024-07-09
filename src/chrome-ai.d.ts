/* eslint-disable no-unused-vars */
type AITextSession = {
  destroy(): void;
  prompt(promptText: string): Promise<string>;
  promptStreaming(promptText: string): Promise<ReadableStream<string>>;
};

type AITextSessionOptions = {
  temperature: number;
  topK: number;
};

type AITextSessionStatus = 'readily' | 'after-download' | 'no';

type AI = {
  canCreateTextSession(): Promise<AITextSessionStatus>;
  createTextSession(): Promise<AITextSession>;
  defaultTextSessionOptions(): Promise<AITextSessionOptions>;
};
