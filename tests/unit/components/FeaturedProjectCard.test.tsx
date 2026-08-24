/**
 * Unit tests for FeaturedProjectCard component
 * Requirements: 1.2, 3.6, 6.5, 6.6, 6.7, 7.8, 7.10
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FeaturedProjectCard from '../../../src/components/ui/FeaturedProjectCard';
import { Project } from '../../../src/types/project';

describe('FeaturedProjectCard Component', () => {
  const sampleProject: Project = {
    id: 'proj-1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce web application with cart and checkout.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    imageUrl: 'https://picsum.photos/800/450',
    isFeatured: true,
    demoUrl: 'https://demo.ecommerce.com',
    repoUrl: 'https://github.com/user/ecommerce',
  };

  it('should render project title, description, and technologies', () => {
    const onClick = vi.fn();
    render(<FeaturedProjectCard project={sampleProject} onClick={onClick} />);

    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
    expect(
      screen.getByText('A full-stack e-commerce web application with cart and checkout.')
    ).toBeInTheDocument();

    for (const tech of sampleProject.technologies) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it('should render as a semantic article with accessible button and proper aria-label', () => {
    const onClick = vi.fn();
    render(<FeaturedProjectCard project={sampleProject} onClick={onClick} />);

    const button = screen.getByRole('button', { name: /view details for e-commerce platform/i });
    expect(button).toBeInTheDocument();
    expect(button.closest('article')).toBeInTheDocument();
  });


  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    render(<FeaturedProjectCard project={sampleProject} onClick={onClick} />);

    const card = screen.getByRole('button', { name: /view details for e-commerce platform/i });
    fireEvent.click(card);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(sampleProject);
  });

  it('should trigger onClick on Enter and Space keyboard events', () => {
    const onClick = vi.fn();
    render(<FeaturedProjectCard project={sampleProject} onClick={onClick} />);

    const card = screen.getByRole('button', { name: /view details for e-commerce platform/i });

    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);

    // Other keys should not trigger onClick
    fireEvent.keyDown(card, { key: 'ArrowDown' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should show count badge when more than 5 technologies', () => {
    const projectWithManyTech: Project = {
      ...sampleProject,
      technologies: ['Tech1', 'Tech2', 'Tech3', 'Tech4', 'Tech5', 'Tech6', 'Tech7'],
    };

    render(<FeaturedProjectCard project={projectWithManyTech} onClick={vi.fn()} />);

    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});
