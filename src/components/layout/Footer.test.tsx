import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { ContactInfo } from '../../types/components';

describe('Footer Component', () => {
  const mockContactInfo: ContactInfo = {
    email: 'test@example.com',
    phone: '+62 812-3456-7890',
    social: [
      {
        platform: 'GitHub',
        url: 'https://github.com/testuser',
        icon: 'fab fa-github',
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/testuser',
        icon: 'fab fa-linkedin',
      },
    ],
  };

  describe('Rendering', () => {
    it('should render footer with semantic <footer> tag', () => {
      render(<Footer contact={mockContactInfo} />);
      const footer = screen.getByRole('contentinfo');
      expect(footer.tagName).toBe('FOOTER');
    });

    it('should have ARIA label for footer', () => {
      render(<Footer contact={mockContactInfo} />);
      const footer = screen.getByLabelText('Site footer');
      expect(footer).toBeInTheDocument();
    });

    it('should display copyright text with current year', () => {
      render(<Footer contact={mockContactInfo} />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} All rights reserved.`)).toBeInTheDocument();
    });

    it('should display custom copyright text when provided', () => {
      const customCopyright = '© 2024 Custom Copyright Text';
      render(<Footer contact={mockContactInfo} copyright={customCopyright} />);
      expect(screen.getByText(customCopyright)).toBeInTheDocument();
    });

    it('should apply custom className when provided', () => {
      const customClass = 'custom-footer-class';
      render(<Footer contact={mockContactInfo} className={customClass} />);
      const footer = screen.getByRole('contentinfo');
      expect(footer.className).toContain(customClass);
    });
  });

  describe('Contact Information', () => {
    it('should display email with mailto link', () => {
      render(<Footer contact={mockContactInfo} />);
      const emailLink = screen.getByLabelText(`Send email to ${mockContactInfo.email}`);
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', `mailto:${mockContactInfo.email}`);
      expect(screen.getByText(mockContactInfo.email!)).toBeInTheDocument();
    });

    it('should display phone with tel link', () => {
      render(<Footer contact={mockContactInfo} />);
      const phoneLink = screen.getByLabelText(`Call ${mockContactInfo.phone}`);
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute('href', `tel:${mockContactInfo.phone}`);
      expect(screen.getByText(mockContactInfo.phone!)).toBeInTheDocument();
    });

    it('should not render email section when email is not provided', () => {
      const contactWithoutEmail: ContactInfo = { phone: '+62 812-3456-7890' };
      render(<Footer contact={contactWithoutEmail} />);
      expect(screen.queryByText(/Send email to/)).not.toBeInTheDocument();
    });

    it('should not render phone section when phone is not provided', () => {
      const contactWithoutPhone: ContactInfo = { email: 'test@example.com' };
      render(<Footer contact={contactWithoutPhone} />);
      expect(screen.queryByText(/Call/)).not.toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    it('should render all social media links', () => {
      render(<Footer contact={mockContactInfo} />);
      expect(screen.getByLabelText('Visit GitHub profile')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit LinkedIn profile')).toBeInTheDocument();
    });

    it('should have proper ARIA labels for each social link', () => {
      render(<Footer contact={mockContactInfo} />);
      mockContactInfo.social?.forEach((social) => {
        const link = screen.getByLabelText(`Visit ${social.platform} profile`);
        expect(link).toBeInTheDocument();
      });
    });

    it('should open social links in new tab with security attributes', () => {
      render(<Footer contact={mockContactInfo} />);
      const githubLink = screen.getByLabelText('Visit GitHub profile');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render correct social media icons', () => {
      render(<Footer contact={mockContactInfo} />);
      const socialLinks = screen.getByLabelText('Social media links');
      expect(socialLinks).toBeInTheDocument();
      expect(socialLinks.querySelectorAll('li')).toHaveLength(2);
    });

    it('should not render social section when no social links provided', () => {
      const contactWithoutSocial: ContactInfo = {
        email: 'test@example.com',
        phone: '+62 812-3456-7890',
      };
      render(<Footer contact={contactWithoutSocial} />);
      expect(screen.queryByLabelText('Social media links')).not.toBeInTheDocument();
    });

    it('should not render social section when social array is empty', () => {
      const contactWithEmptySocial: ContactInfo = {
        email: 'test@example.com',
        social: [],
      };
      render(<Footer contact={contactWithEmptySocial} />);
      expect(screen.queryByLabelText('Social media links')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper focus styles on contact links', () => {
      render(<Footer contact={mockContactInfo} />);
      const emailLink = screen.getByLabelText(`Send email to ${mockContactInfo.email}`);
      expect(emailLink.className).toContain('focus:outline-none');
      expect(emailLink.className).toContain('focus:ring-2');
      expect(emailLink.className).toContain('focus:ring-primary-500');
    });

    it('should have proper focus styles on social links', () => {
      render(<Footer contact={mockContactInfo} />);
      const githubLink = screen.getByLabelText('Visit GitHub profile');
      expect(githubLink.className).toContain('focus:outline-none');
      expect(githubLink.className).toContain('focus:ring-2');
      expect(githubLink.className).toContain('focus:ring-primary-500');
    });

    it('should have keyboard-accessible elements', () => {
      render(<Footer contact={mockContactInfo} />);
      const emailLink = screen.getByLabelText(`Send email to ${mockContactInfo.email}`);
      const phoneLink = screen.getByLabelText(`Call ${mockContactInfo.phone}`);
      
      // Links should be focusable (no negative tabIndex)
      expect(emailLink).not.toHaveAttribute('tabIndex', '-1');
      expect(phoneLink).not.toHaveAttribute('tabIndex', '-1');
    });

    it('should have SVG icons with aria-hidden attribute', () => {
      const { container } = render(<Footer contact={mockContactInfo} />);
      const svgIcons = container.querySelectorAll('svg[aria-hidden="true"]');
      // Email icon, phone icon, and social icons
      expect(svgIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimal contact info', () => {
      const minimalContact: ContactInfo = {};
      render(<Footer contact={minimalContact} />);
      
      // Should still render footer with copyright
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} All rights reserved.`)).toBeInTheDocument();
    });

    it('should handle all social platforms correctly', () => {
      const allPlatforms: ContactInfo = {
        social: [
          { platform: 'GitHub', url: 'https://github.com/test', icon: 'fab fa-github' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/in/test', icon: 'fab fa-linkedin' },
          { platform: 'Twitter', url: 'https://twitter.com/test', icon: 'fab fa-twitter' },
          { platform: 'X', url: 'https://x.com/test', icon: 'fab fa-x-twitter' },
          { platform: 'Instagram', url: 'https://instagram.com/test', icon: 'fab fa-instagram' },
          { platform: 'Unknown', url: 'https://example.com', icon: 'fab fa-unknown' },
        ],
      };
      render(<Footer contact={allPlatforms} />);
      
      expect(screen.getByLabelText('Visit GitHub profile')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit LinkedIn profile')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit Twitter profile')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit X profile')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit Instagram profile')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit Unknown profile')).toBeInTheDocument();
    });

    it('should handle very long email addresses', () => {
      const longEmailContact: ContactInfo = {
        email: 'verylongemailaddress.with.multiple.dots@subdomain.example.com',
      };
      render(<Footer contact={longEmailContact} />);
      expect(screen.getByText(longEmailContact.email!)).toBeInTheDocument();
    });

    it('should handle international phone numbers', () => {
      const intlPhoneContact: ContactInfo = {
        phone: '+1 (555) 123-4567',
      };
      render(<Footer contact={intlPhoneContact} />);
      expect(screen.getByText(intlPhoneContact.phone!)).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('should have proper responsive classes', () => {
      const { container } = render(<Footer contact={mockContactInfo} />);
      const footer = container.querySelector('footer');
      expect(footer?.className).toContain('py-12');
      expect(footer?.className).toContain('px-4');
      expect(footer?.className).toContain('sm:px-6');
      expect(footer?.className).toContain('lg:px-8');
    });

    it('should have proper grid layout for content', () => {
      const { container } = render(<Footer contact={mockContactInfo} />);
      const contentDiv = container.querySelector('.flex.flex-col.md\\:flex-row');
      expect(contentDiv).toBeInTheDocument();
    });

    it('should have visual decorative elements', () => {
      const { container } = render(<Footer contact={mockContactInfo} />);
      // Check for the subtle top glow
      const glow = container.querySelector('.absolute.top-0');
      expect(glow).toBeInTheDocument();
    });
  });

  describe('Requirements Validation', () => {
    it('should satisfy Requirement 1.3 - Component modularity', () => {
      // Footer is a separate component in its own file
      expect(Footer).toBeDefined();
      expect(typeof Footer).toBe('function');
    });

    it('should satisfy Requirement 3.4 - Semantic <footer> tag', () => {
      render(<Footer contact={mockContactInfo} />);
      const footer = screen.getByRole('contentinfo');
      expect(footer.tagName).toBe('FOOTER');
    });

    it('should satisfy Requirement 6.5 - Keyboard accessibility (Tab navigation)', () => {
      render(<Footer contact={mockContactInfo} />);
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        // Links should not have negative tabIndex (default is 0, which is tabbable)
        expect(link).not.toHaveAttribute('tabIndex', '-1');
      });
    });

    it('should satisfy Requirement 6.6 - Keyboard operability (Enter key)', () => {
      // Links are standard <a> elements which are natively keyboard operable
      render(<Footer contact={mockContactInfo} />);
      const emailLink = screen.getByLabelText(`Send email to ${mockContactInfo.email}`);
      expect(emailLink.tagName).toBe('A');
    });

    it('should satisfy Requirement 6.11 - ARIA labels for interactive elements', () => {
      render(<Footer contact={mockContactInfo} />);
      
      // Check email link has ARIA label
      expect(screen.getByLabelText(`Send email to ${mockContactInfo.email}`)).toBeInTheDocument();
      
      // Check phone link has ARIA label
      expect(screen.getByLabelText(`Call ${mockContactInfo.phone}`)).toBeInTheDocument();
      
      // Check social links have ARIA labels
      mockContactInfo.social?.forEach((social) => {
        expect(screen.getByLabelText(`Visit ${social.platform} profile`)).toBeInTheDocument();
      });
    });
  });
});
