// src/components/LLMOutputDisplay.tsx
import React from 'react';

interface LLMOutputDisplayProps {
  title: string;
  content: string | null;
  isLoading: boolean;
}

const LLMOutputDisplay: React.FC<LLMOutputDisplayProps> = ({ title, content, isLoading }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
        {title}
        {isLoading && (
          <svg className="animate-spin ml-2 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
      </h3>
      <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 min-h-[60px] flex items-center justify-center">
        {isLoading && !content ? (
          <span className="text-gray-500">Processing...</span>
        ) : content ? (
          <pre className="whitespace-pre-wrap font-mono break-all">{content}</pre>
        ) : (
          <span className="text-gray-400 italic">Awaiting input...</span>
        )}
      </div>
    </div>
  );
};

export default LLMOutputDisplay;