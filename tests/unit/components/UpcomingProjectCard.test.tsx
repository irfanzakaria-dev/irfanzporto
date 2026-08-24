/**
 * Unit tests for UpcomingProjectCard component
 * Requirements: 1.3, 3.6, 6.5, 6.6, 6.7, 7.9, 7.15
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UpcomingProjectCard from '../../../src/components/ui/UpcomingProjectCard';

describe('UpcomingProjectCard Component', () => {
  it('should render Coming Soon placeholder and title', () => {
    render(<UpcomingProjectCard />);

    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.getByText('Upcoming Project')).toBeInTheDocument();
  });

  it('should render semantic article with accessible button and aria-label', () => {
    render(<UpcomingProjectCard />);

    const button = screen.getByRole('button', { name: /upcoming project – coming soon/i });
    expect(button).toBeInTheDocument();
    expect(button.closest('article')).toBeInTheDocument();
  });


  it('should trigger onClick when clicked', () => {
    const onClick = vi.fn();
    render(<UpcomingProjectCard onClick={onClick} />);

    const card = screen.getByRole('button', { name: /upcoming project – coming soon/i });
    fireEvent.click(card);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should trigger onClick on Enter and Space keypresses', () => {
    const onClick = vi.fn();
    render(<UpcomingProjectCard onClick={onClick} />);

    const card = screen.getByRole('button', { name: /upcoming project – coming soon/i });

    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(card, { key: 'Tab' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
