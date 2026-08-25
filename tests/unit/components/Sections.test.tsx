/**
 * Unit and integration tests for Section components:
 * HeroSection, AboutSection, ProjectsSection, SkillsSection, ContactSection
 * Requirements: 3.3, 6.9, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.14, 7.15, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7
 */

import { describe, it, expect } from 'vitest';

import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import HeroSection from '../../../src/components/sections/HeroSection';
import AboutSection from '../../../src/components/sections/AboutSection';
import ServicesSection from '../../../src/components/sections/ServicesSection';
import ProjectsSection from '../../../src/components/sections/ProjectsSection';
import SkillsSection from '../../../src/components/sections/SkillsSection';
import ContactSection from '../../../src/components/sections/ContactSection';

describe('HeroSection Component', () => {
  it('should render a single h1 heading with the user name from placeholder data', async () => {
    await act(async () => {
      render(<HeroSection />);
    });

    await waitFor(() => {
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent(/IRFAN ZAKARIA/i);
    });
  });

  it('should render tagline and navigation CTA buttons', async () => {
    await act(async () => {
      render(<HeroSection />);
    });

    await waitFor(() => {
      expect(screen.getAllByText(/Junior Full Stack Developer/i)[0]).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: /view my work/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get in touch/i })).toBeInTheDocument();
  });
});

describe('AboutSection Component', () => {
  it('should render an h2 heading and about description', async () => {
    await act(async () => {
      render(<AboutSection />);
    });

    await waitFor(() => {
      const h2 = screen.getByRole('heading', { level: 2, name: /about me/i });
      expect(h2).toBeInTheDocument();
      expect(screen.getAllByText(/Teknik Informatika/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Junior Full Stack Developer/i).length).toBeGreaterThan(0);
    });
  });
});

describe('ServicesSection Component', () => {
  it('should render services heading and 3 key solution cards', () => {
    render(<ServicesSection />);

    expect(screen.getByRole('heading', { level: 2, name: /services & solutions/i })).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Web Development')).toBeInTheDocument();
    expect(screen.getByText('Backend & RESTful API Architecture')).toBeInTheDocument();
    expect(screen.getByText('UI/UX Engineering & Web Optimization')).toBeInTheDocument();
  });
});

describe('SkillsSection Component', () => {
  it('should render skills heading and skills list from placeholder data', async () => {
    await act(async () => {
      render(<SkillsSection />);
    });

    await waitFor(() => {
      const h2 = screen.getByRole('heading', { level: 2, name: /skills & technologies/i });
      expect(h2).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });
});

describe('ContactSection Component', () => {
  it('should render contact heading, email, phone, and direct message form', async () => {
    await act(async () => {
      render(<ContactSection />);
    });

    await waitFor(() => {
      const h2 = screen.getByRole('heading', { level: 2, name: /let's work together/i });
      expect(h2).toBeInTheDocument();

      const emailLink = screen.getByRole('link', { name: /send email to irfanzakariyah@gmail.com/i });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:irfanzakariyah@gmail.com');

      const phoneLink = screen.getByRole('link', { name: /call \+62 858-5637-0945/i });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute('href', 'tel:+62 858-5637-0945');
    });

    // Check message form fields
    expect(screen.getByLabelText(/nama lengkap/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/alamat email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ceritakan proyek \/ pesan anda/i)).toBeInTheDocument();
  });

  it('should handle form submission feedback', async () => {
    await act(async () => {
      render(<ContactSection />);
    });

    const nameInput = screen.getByLabelText(/nama lengkap/i);
    const emailInput = screen.getByLabelText(/alamat email/i);
    const messageInput = screen.getByLabelText(/ceritakan proyek \/ pesan anda/i);
    const submitBtn = screen.getByRole('button', { name: /kirim pesan/i });

    fireEvent.change(nameInput, { target: { value: 'Budi Santoso' } });
    fireEvent.change(emailInput, { target: { value: 'budi@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Saya ingin membuat website company profile.' } });

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText(/pesan anda telah diterima/i)).toBeInTheDocument();
    });
  });
});

describe('ProjectsSection Component', () => {
  it('should render featured projects and upcoming projects sections', async () => {
    await act(async () => {
      render(<ProjectsSection />);
    });

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /featured projects/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /upcoming projects/i })).toBeInTheDocument();
    });

    // Should display featured project from mock
    expect(screen.getByText('Sample Project')).toBeInTheDocument();

    // Should display minimum 3 upcoming project cards
    const upcomingCards = screen.getAllByRole('button', { name: /upcoming project – coming soon/i });
    expect(upcomingCards.length).toBeGreaterThanOrEqual(3);
  });

  it('should open modal when clicking a featured project card', async () => {
    await act(async () => {
      render(<ProjectsSection />);
    });

    await waitFor(() => {
      expect(screen.getByText('Sample Project')).toBeInTheDocument();
    });

    const projectCard = screen.getByRole('button', { name: /view details for sample project/i });
    fireEvent.click(projectCard);

    // Modal should be opened
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Sample Project' })).toBeInTheDocument();
  });

  it('should show toast when clicking an upcoming project card', async () => {
    await act(async () => {
      render(<ProjectsSection />);
    });

    const upcomingCards = screen.getAllByRole('button', { name: /upcoming project – coming soon/i });
    fireEvent.click(upcomingCards[0]);

    expect(screen.getByText(/coming soon! stay tuned for updates/i)).toBeInTheDocument();
  });
});
