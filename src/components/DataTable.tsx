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
          style={{ width: '3%', height: '3%', minWidth: 24, minHeight: 24 }}
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
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 bg-gray-700 text-gray-400">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-6 py-3"
              >
                {col.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {columns.map((col, colIndex) => (
                colIndex === 0 ? (
                  <th
                    key={colIndex}
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-b border-gray-200"
                  >
                    {row[col]}
                  </th>
                ) : (
                  <td key={colIndex} className="px-6 py-4 border-b border-gray-200">
                    {row[col]}
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;