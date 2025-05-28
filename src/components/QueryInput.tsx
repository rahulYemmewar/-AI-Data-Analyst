// src/components/QueryInput.tsx
import React, { useState } from 'react';

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean; // To disable input/button during processing
}

const QueryInput: React.FC<QueryInputProps> = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query);
      setQuery(''); // Clear input after submit
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[200px] w-full">
        <form
            onSubmit={handleSubmit}
            className="mx-auto p-4 bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row gap-4 w-full max-w-2xl items-center justify-center"
        >
            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., Show me revenue growth in Q1 2023"
                className="w-[50%] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 resize-none min-h-[48px]"
                disabled={isLoading}
                rows={2}
            />
            <button
                type="submit"
                className="w-[50%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2"
                disabled={isLoading}
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Submit Query'
                )}
            </button>
        </form>
    </div>
  );
};

export default QueryInput;