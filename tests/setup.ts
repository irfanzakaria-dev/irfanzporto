import { afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(private callback: IntersectionObserverCallback) {}

  observe(target: Element) {
    this.callback(
      [
        {
          isIntersecting: true,
          target,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ],
      this
    );
  }

  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Mock placeholder data for tests
const mockPlaceholderData = {
  name: "IRFAN ZAKARIA",
  tagline: "Junior Full Stack Developer | Problem Solver | Continuous Learner",
  about: "Saya adalah mahasiswa S1 Teknik Informatika (Semester 7) di Universitas Yudharta Pasuruan sekaligus Junior Full Stack Developer yang berdedikasi tinggi.",
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Laravel"],
  contact: {
    email: "irfanzakariyah@gmail.com",
    phone: "+62 858-5637-0945",
    social: [
      {
        platform: "GitHub",
        url: "https://github.com/irfanzakaria-dev",
        icon: "fab fa-github"
      }
    ]
  }
};

// Mock projects data for tests
const mockProjectsData = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Sample Project",
    description: "A sample project for testing",
    technologies: ["React", "TypeScript"],
    imageUrl: "https://picsum.photos/800/450",
    isFeatured: true,
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com/example/sample"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Upcoming Project 1",
    description: "Upcoming description",
    technologies: ["Next.js"],
    imageUrl: "https://picsum.photos/800/450",
    isFeatured: false
  }
];

// Setup global fetch mock before all tests
beforeAll(() => {
  global.fetch = vi.fn((url: string | URL | Request) => {
    const urlString = typeof url === 'string' ? url : url instanceof URL ? url.href : url.url;
    
    if (urlString.includes('placeholder.json')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPlaceholderData),
        text: () => Promise.resolve(JSON.stringify(mockPlaceholderData)),
      } as Response);
    }
    
    if (urlString.includes('projects.json')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjectsData),
        text: () => Promise.resolve(JSON.stringify(mockProjectsData)),
      } as Response);
    }
    
    return Promise.resolve({
      ok: false,
      statusText: 'Not Found',
      text: () => Promise.resolve('Not Found'),
    } as Response);
  });
});

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

