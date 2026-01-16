import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the useNewYearCountdown hook
vi.mock('./hooks/useNewYearCountdown', () => ({
  useNewYearCountdown: () => ({
    days: 100,
    hours: 12,
    minutes: 30,
    seconds: 45,
    targetYear: 2025
  })
}));

// Mock the pages since they depend on Firebase
vi.mock('./pages/ShoppingList', () => ({
  default: () => <div>Shopping List Page</div>
}));

vi.mock('./pages/Menu', () => ({
  default: () => <div>Menu Page</div>
}));

describe('App', () => {
  it('should render ShoppingList on root path', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByText('Shopping List Page')).toBeInTheDocument();
  });

  it('should render Menu on /menu path', () => {
    window.history.pushState({}, '', '/menu');
    render(<App />);

    expect(screen.getByText('Menu Page')).toBeInTheDocument();
  });
});
