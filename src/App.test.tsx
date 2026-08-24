import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render the main heading with name', async () => {
    await act(async () => {
      render(<App />);
    });
    
    // Wait for async data to load
    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/Hi, I'm IRFAN ZAKARIA/i);
    });
  });

  it('should render the welcome eyebrow message', async () => {
    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      const message = screen.getByText(/welcome to my portfolio/i);
      expect(message).toBeInTheDocument();
    });
  });

  it('should render semantic layout landmarks (header, main, footer, nav)', async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('main')).toBeInTheDocument(); // main
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
      expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument(); // nav
    });
  });
});

