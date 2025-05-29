// src/components/DataTable.tsx
import React from 'react';

interface DataTableProps {
  data: Record<string, any>[] | null;
  isLoading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, isLoading }) => {
  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center p-8 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[200px]">
        <svg
          className="animate-spin text-blue-500"
          style={{ width: '5%', height: '5%', minWidth: 24, minHeight: 24 }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-3 text-gray-600">Fetching results...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-200 text-center text-gray-500 min-h-[200px] flex items-center justify-center">
        {data === null ? 'No data to display yet.' : 'No results found for your query.'}
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;