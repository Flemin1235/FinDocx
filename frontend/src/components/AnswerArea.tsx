import React from 'react';
import type { AnswerState } from '../types';

interface AnswerAreaProps {
  answerState: AnswerState;
  isConnected: boolean;
}

export const AnswerArea: React.FC<AnswerAreaProps> = ({ answerState, isConnected }) => {
  const getPlaceholderText = () => {
    if (!isConnected) {
      return 'Connecting to backend...';
    }
    if (answerState.isLoading) {
      return 'Processing your document and generating answer...';
    }
    return 'Ask a question about your financial document to see the answer here...';
  };

  return (
    <div className="answer-area">
      <div className="answer-header">
        <svg
          className="answer-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="answer-title">Document Answer</h3>
      </div>

      <div className="answer-content">
        {answerState.answer ? (
          <div>
            <p className="whitespace-pre-wrap">{answerState.answer}</p>
            {answerState.citations && answerState.citations.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Citations:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {answerState.citations.map((citation, index) => (
                    <li key={index} className="pl-2 border-l-2 border-gray-300">
                      {citation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <svg
              className="mx-auto h-12 w-12 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>{getPlaceholderText()}</p>
          </div>
        )}
      </div>
    </div>
  );
};
