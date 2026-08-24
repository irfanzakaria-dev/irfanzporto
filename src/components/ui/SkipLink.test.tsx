import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkipLink from './SkipLink';

/**
 * Unit tests for SkipLink component
 * Feature: professional-portfolio-website
 * Requirements: 6.10
 */
describe('SkipLink Component', () => {
  it('should render with default text', () => {
    render(<SkipLink targetId="main" />);
    const link = screen.getByText('Skip to main content');
    expect(link).toBeInTheDocument();
  });

  it('should render with custom text', () => {
    render(<SkipLink targetId="main" text="Skip to content" />);
    const link = screen.getByText('Skip to content');
    expect(link).toBeInTheDocument();
  });

  it('should have correct href attribute pointing to target', () => {
    render(<SkipLink targetId="main-content" />);
    const link = screen.getByText('Skip to main content');
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('should be keyboard accessible', () => {
    render(<SkipLink targetId="main" />);
    const link = screen.getByText('Skip to main content');
    
    // Verify it's an anchor tag (natively keyboard accessible)
    expect(link.tagName).toBe('A');
  });

  it('should be hidden by default using sr-only class', () => {
    render(<SkipLink targetId="main" />);
    const link = screen.getByText('Skip to main content');
    
    // Check for sr-only class (Tailwind's screen reader only class)
    expect(link.className).toContain('sr-only');
  });

  it('should become visible on focus', () => {
    render(<SkipLink targetId="main" />);
    const link = screen.getByText('Skip to main content');
    
    // Check for focus:not-sr-only class (becomes visible on focus)
    expect(link.className).toContain('focus:not-sr-only');
  });

  it('should have proper focus styling for accessibility', () => {
    render(<SkipLink targetId="main" />);
    const link = screen.getByText('Skip to main content');
    
    // Verify focus styling classes exist
    expect(link.className).toContain('focus:bg-primary-600');
    expect(link.className).toContain('focus:text-white');
    expect(link.className).toContain('focus:ring-2');
    expect(link.className).toContain('focus:ring-white');
  });

  it('should have fixed positioning when focused', () => {
    render(<SkipLink targetId="main" />);
    const link = screen.getByText('Skip to main content');
    
    // Verify positioning classes for visibility when focused
    expect(link.className).toContain('focus:fixed');
    expect(link.className).toContain('focus:top-4');
    expect(link.className).toContain('focus:left-4');
    expect(link.className).toContain('focus:z-[9999]');
  });

  it('should have proper padding and styling for focus state', () => {
    render(<SkipLink targetId="main" />);
    const link = screen.getByText('Skip to main content');
    
    // Verify visual styling classes
    expect(link.className).toContain('focus:px-4');
    expect(link.className).toContain('focus:py-2');
    expect(link.className).toContain('focus:rounded-lg');
    expect(link.className).toContain('focus:shadow-lg');
  });

  it('should handle different target IDs', () => {
    const { rerender } = render(<SkipLink targetId="section1" />);
    let link = screen.getByText('Skip to main content');
    expect(link).toHaveAttribute('href', '#section1');

    rerender(<SkipLink targetId="section2" />);
    link = screen.getByText('Skip to main content');
    expect(link).toHaveAttribute('href', '#section2');
  });

  it('should not have tabindex attribute (relies on native anchor behavior)', () => {
    render(<SkipLink targetId="main" />);
    const link = screen.getByText('Skip to main content');
    
    // Native anchor tags are keyboard accessible without explicit tabindex
    expect(link).not.toHaveAttribute('tabindex');
  });
});
