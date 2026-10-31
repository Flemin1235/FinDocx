export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isLoading?: boolean;
};

export type DocumentInfo = {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
};

export type ChatState = {
  messages: Message[];
  documents: DocumentInfo[];
  isUploading: boolean;
  isConnected: boolean;
};

export type UploadState = 'idle' | 'dragging' | 'uploading' | 'success' | 'error';

export type AnswerState = {
  answer: string;
  isLoading: boolean;
  citations?: string[];
};
