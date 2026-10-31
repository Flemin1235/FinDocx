import { useState } from 'react';
import './App.css';
import { DocumentUpload } from './components/DocumentUpload';
import { ChatInterface } from './components/ChatInterface';
import { AnswerArea } from './components/AnswerArea';
import type { Message, ChatState, UploadState, AnswerState } from './types';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    documents: [],
    isUploading: false,
    isConnected: true, // Placeholder for backend check
  });

  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [answerState, setAnswerState] = useState<AnswerState>({
    answer: '',
    isLoading: false,
  });

  const handleUpload = (file: File) => {
    setUploadState('uploading');
    console.log('Uploading file:', file.name);

    // Simulate backend connection
    setTimeout(() => {
      setUploadState('success');
      setChatState(prev => ({
        ...prev,
        documents: [...prev.documents, { id: '1', name: file.name, size: file.size, type: file.type, uploadedAt: new Date() }]
      }));
    }, 1500);
  };

  const handleSendMessage = (content: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newUserMessage]
    }));

    setAnswerState(prev => ({ ...prev, isLoading: true }));

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I've analyzed your document. Based on the data, ${content.slice(0, 10)}... refers to...`,
        sender: 'ai',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, aiResponse]
      }));
      setAnswerState({
        answer: aiResponse.content,
        isLoading: false,
        citations: ['Page 1, Paragraph 2', 'Page 5, Table 3']
      });
    }, 2000);
  };

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1>FinDocX Dashboard</h1>
        <p>AI-Powered Financial Document Q&A</p>
        <div className="status-indicator mt-4">
          <div className="status-dot w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          {chatState.isConnected ? 'Backend Connected' : 'Disconnected'}
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <DocumentUpload
            onUpload={handleUpload}
            uploadState={uploadState}
            setUploadState={setUploadState}
          />
          <AnswerArea
            answerState={answerState}
            isConnected={chatState.isConnected}
          />
        </section>
        <section>
          <ChatInterface
            messages={chatState.messages}
            onSendMessage={handleSendMessage}
            answerState={answerState}
            setAnswerState={setAnswerState}
            isConnected={chatState.isConnected}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
