// src/components/QueryInput.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import QueryInput from './QueryInput';

describe('QueryInput', () => {
  test('renders the input field and submit button', () => {
    render(<QueryInput onSubmit={() => {}} isLoading={false} />);
    expect(screen.getByPlaceholderText(/e.g., Show me revenue, country, product, region, inventory, stock, sales, orders, customer and category./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Query/i })).toBeInTheDocument();
  });

  test('calls onSubmit with the input value when submit button is clicked', async () => {
    const mockOnSubmit = jest.fn(); 
    render(<QueryInput onSubmit={mockOnSubmit} isLoading={false} />);

    const input = screen.getByPlaceholderText(/e.g., Show me revenue, country, product, region, inventory, stock, sales, orders, customer and category./i);
    const submitButton = screen.getByRole('button', { name: /Submit Query/i });

    fireEvent.change(input, { target: { value: 'Test query' } });
    fireEvent.click(submitButton);

    // Ensure API call is made on submit
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith('Test query');
    });

    // Check if input clears after submission
    expect(input).toHaveValue('');
  });

  test('disables input and button when isLoading is true', () => {
    render(<QueryInput onSubmit={() => {}} isLoading={true} />);

    const input = screen.getByPlaceholderText(/e.g., Show me revenue, country, product, region, inventory, stock, sales, orders, customer and category./i);
    // The button text changes to include "Processing..." when loading, so we use a regex
    const submitButton = screen.getByRole('button', { name: /Processing...|Submit Query/i });

    expect(input).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  test('shows spinner when isLoading is true', () => {
    render(<QueryInput onSubmit={() => {}} isLoading={true} />);
    const submitButton = screen.getByRole('button');
    // Check for the SVG element which represents the spinner
    expect(submitButton.querySelector('svg')).toBeInTheDocument();
  });

  test('does not call onSubmit if input is empty', () => {
    const mockOnSubmit = jest.fn();
    render(<QueryInput onSubmit={mockOnSubmit} isLoading={false} />);

    const submitButton = screen.getByRole('button', { name: /Submit Query/i });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});