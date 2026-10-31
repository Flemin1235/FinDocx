import React from 'react';
import type { Message } from '../types';

interface ChatMessagesProps {
  messages: Message[];
  isConnected: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isConnected }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-messages">
      {!isConnected && (
        <div className="text-center p-4 text-yellow-600 bg-yellow-50 rounded-lg mb-4">
          <span className="font-semibold">⚠️ Backend not connected</span> - Please start the server to enable chat functionality
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}
            ${message.isLoading ? 'opacity-75' : ''}`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="font-semibold text-sm">
              {message.sender === 'user' ? 'You' : 'AI Assistant'}
            </span>
            <span className="text-xs text-gray-500">
              {formatTime(message.timestamp)}
            </span>
          </div>
          <div className="message-text">
            {message.content}
            {message.isLoading && (
              <span className="ml-2 inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
            )}
          </div>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};
