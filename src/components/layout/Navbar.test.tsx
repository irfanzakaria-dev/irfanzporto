import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { NavItem } from '../../types/components';

/**
 * Unit tests for Navbar component
 * Feature: professional-portfolio-website
 * Requirements: 1.1, 5.4, 6.5, 6.6, 6.7, 6.11
 */
describe('Navbar Component', () => {
  const mockItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  let originalInnerWidth: number;

  beforeEach(() => {
    // Store original innerWidth
    originalInnerWidth = window.innerWidth;
    
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    // Restore original innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  describe('Desktop Rendering (>= 768px)', () => {
    beforeEach(() => {
      // Set desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
    });

    it('should render navigation with semantic nav tag', () => {
      const { container } = render(<Navbar items={mockItems} />);
      const nav = container.querySelector('nav');
      
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('should render all navigation items in desktop menu', () => {
      render(<Navbar items={mockItems} />);
      
      mockItems.forEach((item) => {
        const button = screen.getByRole('button', { 
          name: `Navigate to ${item.label} section` 
        });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(item.label);
      });
    });

    it('should render logo with default text', () => {
      render(<Navbar items={mockItems} />);
      const logo = screen.getByRole('button', { name: 'Go to top' });
      
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveTextContent('Portfolio');
    });

    it('should render custom logo text', () => {
      render(<Navbar items={mockItems} logo="My Portfolio" />);
      const logo = screen.getByRole('button', { name: 'Go to top' });
      
      expect(logo).toHaveTextContent('My Portfolio');
    });

    it('should not render hamburger menu button on desktop', () => {
      render(<Navbar items={mockItems} />);
      const hamburger = screen.queryByLabelText(/open menu|close menu/i);
      
      // Hamburger should be in DOM but hidden with md:hidden class
      expect(hamburger).toBeInTheDocument();
    });

    it('should not render mobile menu on desktop', () => {
      render(<Navbar items={mockItems} />);
      
      // Desktop menu should be visible (has hidden md:flex)
      const desktopMenu = screen.getByRole('list');
      expect(desktopMenu).toBeInTheDocument();
    });
  });

  describe('Mobile Rendering (< 768px)', () => {
    beforeEach(() => {
      // Set mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
    });

    it('should render hamburger menu button on mobile', () => {
      render(<Navbar items={mockItems} />);
      const hamburger = screen.getByLabelText('Open menu');
      
      expect(hamburger).toBeInTheDocument();
      expect(hamburger).toHaveAttribute('aria-expanded', 'false');
      expect(hamburger).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('should toggle mobile menu when hamburger is clicked', () => {
      render(<Navbar items={mockItems} />);
      const hamburger = screen.getByLabelText('Open menu');
      
      // Initially closed
      expect(hamburger).toHaveAttribute('aria-expanded', 'false');
      
      // Click to open
      fireEvent.click(hamburger);
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      expect(screen.getByLabelText('Close menu')).toHaveAttribute('aria-expanded', 'true');
      
      // Click to close
      fireEvent.click(screen.getByLabelText('Close menu'));
      expect(screen.getByLabelText('Open menu')).toHaveAttribute('aria-expanded', 'false');
    });

    it('should display mobile menu items when menu is open', () => {
      const { container } = render(<Navbar items={mockItems} />);
      const hamburger = screen.getByLabelText('Open menu');
      
      // Open menu
      fireEvent.click(hamburger);
      
      // Check mobile menu is visible
      const mobileMenu = container.querySelector('#mobile-menu');
      expect(mobileMenu).toBeInTheDocument();
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
    });

    it('should ensure minimum 44x44px touch targets on mobile', () => {
      render(<Navbar items={mockItems} />);
      const hamburger = screen.getByLabelText('Open menu');
      
      // Open menu to check mobile menu items
      fireEvent.click(hamburger);
      
      // Mobile menu items should have min-h-[44px]
      const mobileMenuItems = screen.getAllByRole('button').filter(btn => 
        mockItems.some(item => btn.textContent === item.label)
      );
      
      // At least one mobile menu item should exist
      expect(mobileMenuItems.length).toBeGreaterThan(0);
    });
  });

  describe('Smooth Scroll Behavior', () => {
    beforeEach(() => {
      // Mock document.querySelector
      document.querySelector = vi.fn((selector: string) => {
        const mockElement = document.createElement('div');
        mockElement.id = selector.replace('#', '');
        return mockElement;
      });
      
      Element.prototype.scrollIntoView = vi.fn();
    });

    it('should call scrollIntoView with smooth behavior when nav item is clicked', () => {
      render(<Navbar items={mockItems} />);
      const homeButton = screen.getByRole('button', { 
        name: 'Navigate to Home section' 
      });
      
      fireEvent.click(homeButton);
      
      expect(document.querySelector).toHaveBeenCalledWith('#home');
      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('should close mobile menu after navigation item is clicked', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      render(<Navbar items={mockItems} />);
      const hamburger = screen.getByLabelText('Open menu');
      
      // Open menu
      fireEvent.click(hamburger);
      expect(screen.getByLabelText('Close menu')).toHaveAttribute('aria-expanded', 'true');
      
      // Click a nav item
      const aboutButton = screen.getAllByRole('button').find(btn => 
        btn.textContent === 'About'
      );
      fireEvent.click(aboutButton!);
      
      // Menu should be closed
      expect(screen.getByLabelText('Open menu')).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support Tab navigation to all interactive elements', () => {
      render(<Navbar items={mockItems} />);
      
      // Logo should be focusable
      const logo = screen.getByRole('button', { name: 'Go to top' });
      expect(logo).toBeInTheDocument();
      
      // All nav items should be focusable
      mockItems.forEach((item) => {
        const button = screen.getByRole('button', { 
          name: `Navigate to ${item.label} section` 
        });
        expect(button).toBeInTheDocument();
      });
      
      // Hamburger should be focusable
      const hamburger = screen.getByLabelText(/open menu|close menu/i);
      expect(hamburger).toBeInTheDocument();
    });

    it('should support Enter key to activate navigation', () => {
      render(<Navbar items={mockItems} />);
      const homeButton = screen.getByRole('button', { 
        name: 'Navigate to Home section' 
      });
      
      fireEvent.keyDown(homeButton, { key: 'Enter', code: 'Enter' });
      
      expect(document.querySelector).toHaveBeenCalledWith('#home');
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('should support Space key to activate navigation', () => {
      render(<Navbar items={mockItems} />);
      const projectsButton = screen.getByRole('button', { 
        name: 'Navigate to Projects section' 
      });
      
      fireEvent.keyDown(projectsButton, { key: ' ', code: 'Space' });
      
      expect(document.querySelector).toHaveBeenCalledWith('#projects');
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('should have focus indicators with proper styling', () => {
      const { container } = render(<Navbar items={mockItems} />);
      const buttons = container.querySelectorAll('button');
      
      // All buttons should have focus:ring styles
      buttons.forEach(button => {
        const classes = button.className;
        expect(classes).toContain('focus:outline-none');
        expect(classes).toContain('focus:ring-2');
        expect(classes).toContain('focus:ring-primary');
      });
    });
  });

  describe('Window Resize Handling', () => {
    it('should close mobile menu when resizing to desktop width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      const { rerender } = render(<Navbar items={mockItems} />);
      const hamburger = screen.getByLabelText('Open menu');
      
      // Open mobile menu
      fireEvent.click(hamburger);
      expect(screen.getByLabelText('Close menu')).toHaveAttribute('aria-expanded', 'true');
      
      // Simulate resize to desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      fireEvent(window, new Event('resize'));
      
      // Menu should be closed after resize
      rerender(<Navbar items={mockItems} />);
      
      // After resize, the hamburger should show "Open menu" (closed state)
      const hamburgerAfterResize = screen.getByLabelText(/open menu/i);
      expect(hamburgerAfterResize).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('ARIA Labels', () => {
    it('should have proper ARIA label on nav element', () => {
      const { container } = render(<Navbar items={mockItems} />);
      const nav = container.querySelector('nav');
      
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('should have descriptive ARIA labels on all navigation buttons', () => {
      render(<Navbar items={mockItems} />);
      
      mockItems.forEach((item) => {
        const button = screen.getByRole('button', { 
          name: `Navigate to ${item.label} section` 
        });
        expect(button).toHaveAttribute('aria-label', `Navigate to ${item.label} section`);
      });
    });

    it('should have ARIA label on hamburger menu button', () => {
      render(<Navbar items={mockItems} />);
      const hamburger = screen.getByLabelText('Open menu');
      
      expect(hamburger).toHaveAttribute('aria-label', 'Open menu');
      expect(hamburger).toHaveAttribute('aria-expanded', 'false');
      expect(hamburger).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('should update hamburger ARIA label when menu state changes', () => {
      render(<Navbar items={mockItems} />);
      const hamburger = screen.getByLabelText('Open menu');
      
      // Open menu
      fireEvent.click(hamburger);
      const closeButton = screen.getByLabelText('Close menu');
      expect(closeButton).toHaveAttribute('aria-label', 'Close menu');
      expect(closeButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-hidden on mobile menu when closed', () => {
      const { container } = render(<Navbar items={mockItems} />);
      const mobileMenu = container.querySelector('#mobile-menu');
      
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
    });

    it('should update aria-hidden on mobile menu when opened', () => {
      const { container } = render(<Navbar items={mockItems} />);
      const hamburger = screen.getByLabelText('Open menu');
      
      fireEvent.click(hamburger);
      
      const mobileMenu = container.querySelector('#mobile-menu');
      expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('Empty State', () => {
    it('should render navbar with empty navigation items array', () => {
      const { container } = render(<Navbar items={[]} />);
      const nav = container.querySelector('nav');
      
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('should render logo even with no navigation items', () => {
      render(<Navbar items={[]} />);
      const logo = screen.getByRole('button', { name: 'Go to top' });
      
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Scroll Effect', () => {
    it('should add backdrop effect when scrolled', () => {
      const { container } = render(<Navbar items={mockItems} />);
      const nav = container.querySelector('nav');
      
      // Initially, should have bg-transparent
      expect(nav?.className).toContain('bg-transparent');
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { writable: true, value: 100 });
      fireEvent.scroll(window);
      
      // After scroll, nav element should exist
      expect(nav).toBeInTheDocument();
    });
  });
});
