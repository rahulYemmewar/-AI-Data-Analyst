// src/App.tsx
import React, { useState } from 'react';
import QueryInput from './components/QueryInput';
import LLMOutputDisplay from './components/LLMOutputDisplay';
import DataTable from './components/DataTable';
import './index.css'; // Ensure your Tailwind CSS is imported here

// Define types for your data
interface ParsedIntent {
  parsedIntent: string;
}

interface GeneratedSQL {
  sqlQuery: string;
}

interface TableRow extends Record<string, any> {}

function App() {
  const [query, setQuery] = useState<string>('');
  const [parsedIntent, setParsedIntent] = useState<string | null>(null);
  const [generatedSql, setGeneratedSql] = useState<string | null>(null);
  const [tableData, setTableData] = useState<TableRow[] | null>(null);

  const [isLoadingIntent, setIsLoadingIntent] = useState<boolean>(false);
  const [isLoadingSql, setIsLoadingSql] = useState<boolean>(false);
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);
  // const [overallLoading, setOverallLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const overallLoading = isLoadingIntent || isLoadingSql || isLoadingTable;

  // --- Mock API Simulation Functions ---
// Inside src/App.tsx, replace the existing simulateUnderstandingIntent function
const simulateUnderstandingIntent = (userQuery: string): Promise<ParsedIntent> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerCaseQuery = userQuery.toLowerCase();
      let intentMessage = '';

      if (lowerCaseQuery.includes('revenue')) {
        intentMessage = `User wants to analyze revenue data for ${userQuery.split('in ').pop()?.trim() || 'a specified period'}.`;
      } else if (lowerCaseQuery.includes('product') || lowerCaseQuery.includes('products') || lowerCaseQuery.includes('selling items')) {
        intentMessage = `User is requesting information about products or best-selling items.`;
      } else if (lowerCaseQuery.includes('customer') || lowerCaseQuery.includes('customers')) {
        intentMessage = `User is asking for customer data.`;
      } else if (lowerCaseQuery.includes('region') || lowerCaseQuery.includes('regional')) {
        intentMessage = `User wants to view data segmented by region.`;
      } else if (lowerCaseQuery.includes('inventory') || lowerCaseQuery.includes('stock')) {
        intentMessage = `User is querying for inventory and stock levels.`;
      } else {
        intentMessage = `User's intent is to find data related to: "${userQuery}".`;
      }

      resolve({ parsedIntent: intentMessage });
    }, 1500 + Math.random() * 500); // Simulate network delay
  });
};

  // Inside src/App.tsx, replace the existing simulateGeneratingSQL function
const simulateGeneratingSQL = (intent: string): Promise<GeneratedSQL> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Convert intent to lowercase once for case-insensitive checks
      const lowerCaseIntent = intent.toLowerCase();

      // Simulate a potential error for demonstration
      if (lowerCaseIntent.includes('unsupported')) {
        reject(new Error("SQL generation failed: Unsupported intent."));
      }
      // Check for 'revenue' related intents
      else if (lowerCaseIntent.includes('revenue')) {
        resolve({ sqlQuery: `SELECT quarter, SUM(revenue) AS total_revenue FROM sales WHERE year = 2023 GROUP BY quarter ORDER BY quarter;` });
      }
      // Check for 'product' or 'products' related intents
      else if (lowerCaseIntent.includes('product') || lowerCaseIntent.includes('products')) { // Modified condition
        resolve({ sqlQuery: `SELECT product_name, SUM(sales) AS total_sales FROM products GROUP BY product_name ORDER BY total_sales DESC LIMIT 5;` });
      }
      // Check for 'customer' related intents
      else if (lowerCaseIntent.includes('customer')) {
        resolve({ sqlQuery: `SELECT customer_id, name, country, total_orders FROM customers ORDER BY total_orders DESC LIMIT 10;` });
      }
      // Check for 'region' related intents
      else if (lowerCaseIntent.includes('region')) {
        resolve({ sqlQuery: `SELECT region, SUM(sales) AS total_sales, SUM(profit) AS total_profit FROM regions GROUP BY region;` });
      }
      // Check for 'inventory' related intents
      else if (lowerCaseIntent.includes('inventory')) {
        resolve({ sqlQuery: `SELECT product_id, product_name, stock, warehouse FROM inventory WHERE stock < 100 ORDER BY stock ASC;` });
      }
      // Default / fallback SQL if no specific intent is matched
      else {
        resolve({ sqlQuery: `SELECT * FROM generic_data_for_intent = '${intent}';` });
      }
    }, 2000 + Math.random() * 700); // Simulate network delay
  });
};

  const simulateQueryingDatabase = (sql: string): Promise<TableRow[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data based on SQL query
        if (sql.toLowerCase().includes('revenue')) {
          resolve([
            { quarter: 'Q1 2023', revenue: 150000, yoy_growth: '5%' },
            { quarter: 'Q2 2023', revenue: 175000, yoy_growth: '8%' },
            { quarter: 'Q3 2023', revenue: 160000, yoy_growth: '3%' },
            { quarter: 'Q4 2023', revenue: 200000, yoy_growth: '10%' },
            { quarter: 'Q1 2024', revenue: 210000, yoy_growth: '7%' },
          ]);
        } else if (sql.toLowerCase().includes('product')) {
          resolve([
            { product_name: 'Product A', total_sales: 50000, category: 'Electronics', region: 'North America' },
            { product_name: 'Product B', total_sales: 45000, category: 'Home', region: 'Europe' },
            { product_name: 'Product C', total_sales: 30000, category: 'Electronics', region: 'Asia' },
            { product_name: 'Product D', total_sales: 25000, category: 'Toys', region: 'North America' },
            { product_name: 'Product E', total_sales: 20000, category: 'Home', region: 'Europe' },
          ]);
        } else if (sql.toLowerCase().includes('customer')) {
          resolve([
            { customer_id: 1, name: 'Alice', country: 'USA', total_orders: 15, last_order: '2024-05-01' },
            { customer_id: 2, name: 'Bob', country: 'UK', total_orders: 10, last_order: '2024-04-15' },
            { customer_id: 3, name: 'Carlos', country: 'Brazil', total_orders: 8, last_order: '2024-03-20' },
            { customer_id: 4, name: 'Diana', country: 'Germany', total_orders: 12, last_order: '2024-05-10' },
          ]);
        } else if (sql.toLowerCase().includes('region')) {
          resolve([
            { region: 'North America', sales: 120000, profit: 30000 },
            { region: 'Europe', sales: 95000, profit: 25000 },
            { region: 'Asia', sales: 80000, profit: 20000 },
            { region: 'South America', sales: 40000, profit: 10000 },
          ]);
        } else if (sql.toLowerCase().includes('inventory')) {
          resolve([
            { product_id: 101, product_name: 'Widget X', stock: 500, warehouse: 'A' },
            { product_id: 102, product_name: 'Widget Y', stock: 200, warehouse: 'B' },
            { product_id: 103, product_name: 'Widget Z', stock: 0, warehouse: 'A' },
          ]);
        } else {
          resolve([
            { id: 1, name: 'Mock Data 1', value: 100, status: 'active' },
            { id: 2, name: 'Mock Data 2', value: 200, status: 'inactive' },
            { id: 3, name: 'Mock Data 3', value: 300, status: 'pending' },
          ]);
        }
      }, 2500 + Math.random() * 800); // Simulate network delay
    });
  };
  // --- End Mock API Simulation Functions ---

  const handleQuerySubmit = async (userQuery: string) => {
    setQuery(userQuery);
    setParsedIntent(null);
    setGeneratedSql(null);
    setTableData(null);
    setError(null);
    // setOverallLoading(true);

    try {
      // Step 1: Understanding intent
      setIsLoadingIntent(true);
      const intentResult = await simulateUnderstandingIntent(userQuery);
      setParsedIntent(intentResult.parsedIntent);
      setIsLoadingIntent(false);

      // Step 2: Generating SQL
      setIsLoadingSql(true);
      const sqlResult = await simulateGeneratingSQL(intentResult.parsedIntent);
      setGeneratedSql(sqlResult.sqlQuery);
      setIsLoadingSql(false);

      // Step 3: Querying database
      setIsLoadingTable(true);
      const dataResult = await simulateQueryingDatabase(sqlResult.sqlQuery);
      setTableData(dataResult);
      setIsLoadingTable(false);

    } catch (err: any) {
      setError(err.message || "An unknown error occurred during the analysis.");
      setIsLoadingIntent(false);
      setIsLoadingSql(false);
      setIsLoadingTable(false);
    } finally {
      // setOverallLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">microGCC AI Data Analyst</h1>
        <p className="text-xl text-gray-600">Your natural language to data insights console.</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">AI Query Console</h2>
          {/* <QueryInput onSubmit={handleQuerySubmit} isLoading={overallLoading} /> */}
          <QueryInput onSubmit={handleQuerySubmit} isLoading={overallLoading} />
        </section>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {(query || overallLoading) && (
          <section className="space-y-4">
            <LLMOutputDisplay
              title="Step 1: Understanding Intent"
              content={parsedIntent}
              isLoading={isLoadingIntent}
            />
            <LLMOutputDisplay
              title="Step 2: Generating SQL"
              content={generatedSql}
              isLoading={isLoadingSql}
            />
          </section>
        )}

        {(tableData || isLoadingTable) && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
            <DataTable data={tableData} isLoading={isLoadingTable} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;