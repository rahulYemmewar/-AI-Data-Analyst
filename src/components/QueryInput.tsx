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
        className="mx-auto p-4 bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row gap-2 w-full max-w-2xl items-center justify-center"
      >
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Show me revenue, country, product, region, inventory, stock, sales, orders, customer and category."
          className="w-[70%] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 resize-none min-h-[48px] text-center"
          disabled={isLoading}
          rows={2}
        />

        <button
          type="submit"
          className="w-[30%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 md:mt-0 flex items-center justify-center"
          disabled={isLoading}
          aria-label={isLoading ? "Processing query" : "Submit Query"}
        >
          {isLoading ? (
        <svg
          className="animate-spin"
          style={{ width: '2em', height: '2em' }}
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
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