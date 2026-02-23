import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

const fakeTodos = Array.from({ length: 10 }, (_, i) => ({
  userId: 1,
  id: i + 1,
  title: `Todo ${i + 1}`,
  completed: i % 2 === 0,
}));

beforeEach(() => {
  vi.restoreAllMocks();
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeTodos),
    }),
  ) as unknown as typeof fetch;
});

describe('App', () => {
  it('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading...');
  });

  it('renders the heading', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('heading')).toHaveTextContent('To-Do List Manager');
    });
  });

  it('fetches and displays 10 todos', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    });

    for (let i = 1; i <= 10; i++) {
      expect(screen.getByTestId(`todo-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`todo-title-${i}`)).toHaveTextContent(`Todo ${i}`);
      expect(screen.getByTestId(`todo-checkbox-${i}`)).toBeInTheDocument();
    }
  });

  it('renders a checkbox for each todo using data-testid', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    });

    for (let i = 1; i <= 10; i++) {
      const checkbox = screen.getByTestId(`todo-checkbox-${i}`);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    }
  });

  it('toggles a checkbox when clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    });

    const checkbox = screen.getByTestId('todo-checkbox-1') as HTMLInputElement;
    expect(checkbox.checked).toBe(true); // id 1 → index 0 → completed: true

    await user.click(checkbox);
    expect(checkbox.checked).toBe(false);

    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
