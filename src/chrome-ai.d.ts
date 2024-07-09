/* eslint-disable no-unused-vars */
type ReadableStreamWithAsyncIterator = import('node:stream/web').ReadableStream;

type AITextSession = {
  destroy(): void;
  prompt(promptText: string): Promise<string>;
  promptStreaming(promptText: string): Promise<ReadableStreamWithAsyncIterator<string>>;
};

type AITextSessionOptions = {
  temperature: number;
  topK: number;
};

type AITextSessionStatus = 'readily' | 'after-download' | 'no';

type AI = {
  canCreateTextSession(): Promise<AITextSessionStatus>;
  createTextSession(options?: AITextSessionOptions): Promise<AITextSession>;
  defaultTextSessionOptions(): Promise<AITextSessionOptions>;
};
