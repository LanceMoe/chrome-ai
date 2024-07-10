/* eslint-disable no-unused-vars */
export interface Message {
  id: string;
  content: string;
  role: string;
}

export interface ChatHandler {
  messages: Message[];
  inputValue?: string;
  isLoading?: boolean;
  handleSubmit?: (
    e: React.FormEvent<HTMLFormElement>,
    ops?: {
      data?: { imageUrl: string };
    },
  ) => void;
  handleInputChange?: ChangeEventHandler<HTMLInputElement>;
  reload?: () => void;
  stop?: () => void;
  onFileUpload?: (file: File) => Promise<void>;
  onFileError?: (errMsg: string) => void;
}
