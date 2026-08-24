/**
 * Unit tests for ProjectModal component
 * Requirements: 6.5, 6.6, 6.8, 7.6, 7.7, 7.8, 7.9, 7.10
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectModal from '../../../src/components/ui/ProjectModal';
import { Project } from '../../../src/types/project';

describe('ProjectModal Component', () => {
  const sampleProject: Project = {
    id: 'proj-modal-1',
    title: 'Cloud Dashboard App',
    description: 'A cloud infrastructure monitoring dashboard built with React and D3.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'D3.js'],
    imageUrl: 'https://picsum.photos/800/450',
    isFeatured: true,
    additionalImages: [
      'https://picsum.photos/400/225?1',
      'https://picsum.photos/400/225?2',
    ],
    demoUrl: 'https://demo.clouddash.com',
    repoUrl: 'https://github.com/user/clouddash',
  };

  it('should render nothing when isOpen is false', () => {
    const { container } = render(
      <ProjectModal project={sampleProject} isOpen={false} onClose={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing when project is null', () => {
    const { container } = render(
      <ProjectModal project={null} isOpen={true} onClose={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render dialog with role="dialog", aria-modal="true", and aria-labelledby', () => {
    render(<ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(screen.getByRole('heading', { level: 2, name: 'Cloud Dashboard App' })).toBeInTheDocument();
  });

  it('should display description, technologies, demoUrl, and repoUrl', () => {
    render(<ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />);

    expect(
      screen.getByText('A cloud infrastructure monitoring dashboard built with React and D3.')
    ).toBeInTheDocument();

    for (const tech of sampleProject.technologies) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }

    const demoLink = screen.getByRole('link', { name: /view live demo for cloud dashboard app/i });
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute('href', 'https://demo.clouddash.com');

    const repoLink = screen.getByRole('link', { name: /view source code for cloud dashboard app/i });
    expect(repoLink).toBeInTheDocument();
    expect(repoLink).toHaveAttribute('href', 'https://github.com/user/clouddash');
  });

  it('should call onClose when clicking close button', () => {
    const onClose = vi.fn();
    render(<ProjectModal project={sampleProject} isOpen={true} onClose={onClose} />);

    const closeBtn = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when pressing Escape key', () => {
    const onClose = vi.fn();
    render(<ProjectModal project={sampleProject} isOpen={true} onClose={onClose} />);

    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should switch active image when clicking thumbnail buttons in gallery', () => {
    render(<ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />);

    const thumbnailBtn = screen.getByRole('button', { name: /view thumbnail 2/i });
    expect(thumbnailBtn).toBeInTheDocument();
    fireEvent.click(thumbnailBtn);

    const activeImage = screen.getByAltText(/screenshot 2 of cloud dashboard app/i);
    expect(activeImage).toBeInTheDocument();
  });
});
