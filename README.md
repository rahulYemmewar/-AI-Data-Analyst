**AI Data Analyst Interface**
This project implements a minimal frontend web interface for an "AI Data Analyst" product, simulating a multi-step AI workflow to process natural language queries and display tabular results. It showcases frontend development skills with a clean architecture, responsive design, and integration logic, built with React, TypeScript, and Tailwind CSS, and tested with Jest.

/Table of Contents/
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup & Installation](#setup--installation)
4. [Architecture Explanation](#architecture-explanation)
5. [API Integration & Mocking](#api-integration--mocking)
6. [Error Handling](#error-handling)
7. [Testing Notes](#testing-notes)
8. [Demo Submission](#demo-submission)
9. [Future Enhancements](#future-enhancements)

# Features
User Query Input Panel: An intuitive input field for natural language questions.

LLM Chaining Simulation: Simulates a three-step AI workflow:

Step 1: Understanding Intent: Displays the parsed intent from the user's query.

Step 2: Generating SQL: Shows a simulated SQL query based on the parsed intent.

Step 3: Querying Database: Fetches and displays mock tabular results.

Multi-threading Simulation (Async Steps): Each step shows progress (spinners) asynchronously, mimicking real-world API calls.

Responsive Data Table: Renders mock data in a clean, responsive table format using Tailwind CSS.

Dynamic Data Display: The table adapts to display different datasets based on the simulated query results.

Error Display: Provides clear feedback to the user if an error occurs during the simulation.

# Technologies Used
React 19: Frontend library for building user interfaces.

TypeScript: Adds static typing to JavaScript for improved code quality and maintainability.

Tailwind CSS 4: A utility-first CSS framework for rapid and responsive UI development.

Vite: A fast build tool for modern web projects.

Jest: A JavaScript testing framework.

React Testing Library: A set of utilities for testing React components in a user-centric way.

PostCSS & Autoprefixer: For processing CSS with Tailwind and ensuring browser compatibility.

# Setup & Installation
To get the project up and running on your local machine, follow these steps:

Clone the repository:

git clone <https://github.com/rahulYemmewar/-AI-Data-Analyst.git>
cd my-ai-analyst-app


# Install dependencies:

npm install

Run the development server:

npm run dev

The application will typically be available at http://localhost:5173 (or another port if 5173 is in use).

# Architecture Explanation
The application is structured into several functional React components, promoting reusability and maintainability:

src/App.tsx: The main application component. It manages the overall state of the application, including the user query, intermediate LLM outputs, tabular data, loading states for each step, and error messages. It orchestrates the asynchronous workflow.

src/components/QueryInput.tsx: A presentational component responsible for capturing user input (natural language query) and triggering the submission. It handles its own internal input state and visual feedback (disabling input/button, showing a spinner) during processing.

src/components/LLMOutputDisplay.tsx: A reusable component to display the parsed intent and generated SQL. It conditionally shows content, loading indicators, or a placeholder message.

src/components/DataTable.tsx: A component designed to render tabular data. It dynamically generates table headers based on the keys of the first data object and displays rows accordingly. It includes loading states and a message for no data.

# LLM Chaining Simulation:

The core of the AI workflow simulation resides in App.tsx within the handleQuerySubmit function:

simulateUnderstandingIntent(userQuery): Takes the user's natural language query and returns a parsedIntent string. This function uses setTimeout to simulate network latency and includes basic keyword matching (revenue, product, customer, region, inventory) to generate a more specific intent.

simulateGeneratingSQL(intent): Takes the parsedIntent and returns a sqlQuery string. This also uses setTimeout for latency and has conditional logic to generate different mock SQL queries based on keywords in the parsedIntent. It also includes a simulated error condition for demonstration.

simulateQueryingDatabase(sql): Takes the sqlQuery string and returns an array of TableRow objects (your mock data). This function uses setTimeout and conditional logic based on keywords in the sqlQuery to return different sets of mock tabular data (e.g., revenue data, product data, customer data).

Each of these simulation functions returns a Promise, allowing them to be awaited in the handleQuerySubmit function, creating a sequential, asynchronous chain. Loading states (isLoadingIntent, isLoadingSql, isLoadingTable) are updated before and after each await call to provide real-time feedback to the user.

# Responsive Design:

Tailwind CSS is utilized throughout the application to ensure a fully responsive layout:

Flexbox and Grid: Used for overall page layout and component arrangement (e.g., flex flex-col md:flex-row in QueryInput).

Responsive Prefixes: Tailwind's sm:, md:, lg: prefixes are used to adjust spacing, text sizes, and layout for different screen sizes.

overflow-x-auto: Applied to the DataTable's container to ensure that if the table content exceeds the viewport width on smaller screens, a horizontal scrollbar appears, preventing layout breakage.

Fluid Widths: Relative units and utility classes like min-w-full are used to ensure elements scale appropriately.

# API Integration & Mocking
For this assignment, API endpoints are mocked directly within the frontend application using JavaScript's setTimeout function wrapped in Promises. This approach effectively simulates asynchronous network requests and varying response times without requiring a live backend.

Simulation Logic: The simulateUnderstandingIntent, simulateGeneratingSQL, and simulateQueryingDatabase functions in src/App.tsx serve as our mock API endpoints.

Chained Calls: The handleQuerySubmit function orchestrates these mock API calls sequentially using async/await, mimicking a real-world LLM chaining process where the output of one step feeds into the next.

Data Generation: Mock data is generated dynamically within these functions based on simple keyword matching in the input (user query, parsed intent, or generated SQL). This allows for different "responses" based on the simulated "query."

# Error Handling
API errors, timeouts, and invalid responses are handled within the handleQuerySubmit function using a standard try...catch...finally block:

try block: All asynchronous await calls for the LLM chain are wrapped here.

catch (err) block: If any of the simulate... functions reject their promise (e.g., simulateGeneratingSQL can reject for "unsupported" intents), the catch block intercepts the error. An error message is then set in the error state, which is displayed prominently to the user in a red alert box.

finally block: The overallLoading state is reset to false here, ensuring that the UI returns to a non-loading state regardless of success or failure.

Loading States: Individual loading states (isLoadingIntent, isLoadingSql, isLoadingTable) are also reset within the catch block to ensure all spinners disappear on error.

This approach ensures that the application remains robust and provides clear feedback to the user in case of unexpected issues during the simulated API interactions.

# Testing Notes
Testing is implemented using Jest as the test runner and React Testing Library for component testing, focusing on user-centric interactions.

How to Run Tests
To execute the test suite, run the following command in your project root:

   npm test

Test Coverage
The current test suite primarily covers the QueryInput component, demonstrating:

Component Rendering: Verifies that the input field and submit button are rendered correctly.

Event Handling: Ensures that the onSubmit prop is called with the correct value when the form is submitted.

Loading States: Confirms that the input and button are disabled, and a spinner is displayed when isLoading is true.

Input Clearing: Checks that the input field clears after a successful submission.

Form Validation (Basic): Ensures onSubmit is not called if the input is empty.

Simulating and Verifying Step-by-Step Responses
While explicit tests for the full LLM chaining (App.tsx's handleQuerySubmit) are not included in the provided QueryInput.test.tsx, the methodology for testing such asynchronous flows would involve:

Mocking Dependencies: Using jest.fn() to mock the simulateUnderstandingIntent, simulateGeneratingSQL, and simulateQueryingDatabase functions.

Asynchronous Assertions: Utilizing await waitFor() from React Testing Library to wait for UI updates that occur after asynchronous operations complete.

State Verification: Asserting on the presence or content of elements that display the intermediate results (parsed intent, generated SQL) and the final table data.

Error Simulation: Mocking the simulateGeneratingSQL to reject a promise to test the error display mechanism.

This approach ensures that the entire asynchronous workflow, including intermediate results and error handling, can be thoroughly tested.

# Demo Submission
Loom Video: A 5-7 minute Loom video will walk through the demo of the app, showcasing the app flow: input, intermediate results (Understanding Intent, Generating SQL), and the final data table. The video will also briefly explain how the LLM chaining steps are simulated and how API errors are handled.

GitHub Repository: This repository contains the complete source code with clear commit history.

# Future Enhancements
More Sophisticated Mocking: Implement a more robust mocking library like MSW (Mock Service Worker) for more realistic API interactions.

Advanced Data Table Features: Add sorting, pagination, and filtering capabilities to the DataTable component.

User Authentication: Integrate a simple authentication system to manage user-specific queries or data.

Real LLM Integration: Replace mock API calls with actual calls to a generative AI model (e.g., Gemini API) for real-time intent understanding and SQL generation (requires API key management).

SQL Syntax Highlighting: Enhance the LLMOutputDisplay for SQL to include syntax highlighting.

More Diverse Mock Data: Expand the mock data sets and the logic to retrieve them based on more complex SQL queries.

Accessibility Improvements: Conduct an accessibility audit and implement ARIA attributes and keyboard navigation.