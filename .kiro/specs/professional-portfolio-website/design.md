# Design Document: Website Portfolio Profesional

## Overview

Website Portfolio Profesional adalah aplikasi web single-page yang dirancang untuk menampilkan karya, keterampilan, dan informasi profesional. Desain ini mengutamakan arsitektur modular, performa tinggi, aksesibilitas WCAG AA, dan responsivitas di semua ukuran layar.

### Tujuan Desain

- **Modularitas**: Komponen UI terpisah dan dapat digunakan kembali
- **Konsistensi Visual**: Design system terpusat menggunakan design tokens
- **Performa**: Loading cepat dengan lazy loading dan optimasi aset
- **Aksesibilitas**: Memenuhi standar WCAG AA untuk semua pengguna
- **Responsivitas**: Pengalaman optimal di mobile, tablet, dan desktop
- **Maintainability**: Kode bersih dengan linting, testing, dan dokumentasi

### Teknologi Utama

- **Frontend Framework**: React dengan TypeScript
- **Styling**: Tailwind CSS untuk design system dan utility-first styling
- **Build Tool**: Vite untuk development dan production builds
- **Testing**: Vitest untuk unit tests, Fast-Check untuk property-based testing
- **Linting**: ESLint untuk JavaScript/TypeScript, Stylelint untuk CSS
- **Image Optimization**: Native lazy loading dengan IntersectionObserver API fallback

### Justifikasi Pemilihan Teknologi

**React + TypeScript**:
- Component-based architecture mendukung modularitas (Req 1)
- TypeScript memberikan type safety untuk parser dan data models (Req 9)
- Ecosystem mature dengan tooling lengkap untuk linting dan testing (Req 10)

**Tailwind CSS**:
- Design tokens bawaan (colors, spacing, typography) memenuhi Req 2
- Utility-first approach mendukung responsive design (Req 5)
- Purge CSS built-in membantu mencapai target file size <50KB (Req 8)

**Vite**:
- Build speed cepat mendukung development workflow
- Built-in code splitting dan tree shaking untuk optimasi bundle size (Req 8)
- Native ES modules support

**Vitest + Fast-Check**:
- Vitest terintegrasi dengan Vite untuk testing seamless
- Fast-Check mendukung property-based testing untuk round-trip properties (Req 9)
- Coverage reporting untuk memenuhi target 70% (Req 10)

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser Runtime                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   App.tsx    │──│  Router      │──│  ErrorBoundary   │  │
│  └──────┬───────┘  └──────────────┘  └──────────────────┘  │
│         │                                                     │
│    ┌────┴─────────────────────────────┐                     │
│    │        Layout Components          │                     │
│    ├───────────────────────────────────┤                     │
│    │  • Navbar.tsx                     │                     │
│    │  • Footer.tsx                     │                     │
│    └────┬──────────────────────────────┘                     │
│         │                                                     │
│    ┌────┴─────────────────────────────┐                     │
│    │      Content Components           │                     │
│    ├───────────────────────────────────┤                     │
│    │  • HeroSection.tsx                │                     │
│    │  • AboutSection.tsx               │                     │
│    │  • ProjectsSection.tsx            │                     │
│    │  • SkillsSection.tsx              │                     │
│    │  • ContactSection.tsx             │                     │
│    └────┬──────────────────────────────┘                     │
│         │                                                     │
│    ┌────┴─────────────────────────────┐                     │
│    │       UI Components               │                     │
│    ├───────────────────────────────────┤                     │
│    │  • ProjectCard.tsx                │                     │
│    │  • LazyImage.tsx                  │                     │
│    │  • SkipLink.tsx                   │                     │
│    │  • ProjectModal.tsx               │                     │
│    └────┬──────────────────────────────┘                     │
│         │                                                     │
│    ┌────┴─────────────────────────────┐                     │
│    │      Business Logic               │                     │
│    ├───────────────────────────────────┤                     │
│    │  • projectParser.ts               │                     │
│    │  • projectFormatter.ts            │                     │
│    │  • projectValidator.ts            │                     │
│    └────┬──────────────────────────────┘                     │
│         │                                                     │
│    ┌────┴─────────────────────────────┐                     │
│    │         Data Layer                │                     │
│    ├───────────────────────────────────┤                     │
│    │  • projects.json                  │                     │
│    │  • config.ts                      │                     │
│    └───────────────────────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SkipLink.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── ui/
│   │       ├── ProjectCard.tsx
│   │       ├── LazyImage.tsx
│   │       └── ProjectModal.tsx
│   ├── lib/
│   │   ├── parser/
│   │   │   ├── projectParser.ts
│   │   │   ├── projectFormatter.ts
│   │   │   └── projectValidator.ts
│   │   └── utils/
│   │       ├── imageOptimization.ts
│   │       └── accessibility.ts
│   ├── types/
│   │   └── project.ts
│   ├── data/
│   │   └── projects.json
│   ├── styles/
│   │   └── globals.css
│   ├── config/
│   │   └── config.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── images/
│       └── projects/
├── tests/
│   ├── unit/
│   │   └── components/
│   ├── integration/
│   └── properties/
│       └── projectParser.property.test.ts
├── tailwind.config.js
├── vite.config.ts
├── .eslintrc.json
├── .stylelintrc.json
└── package.json
```

### Separation of Concerns

**Presentation Layer** (`components/`):
- Layout components: struktur halaman (Navbar, Footer)
- Section components: konten halaman (Hero, About, Projects, Skills, Contact)
- UI components: reusable widgets (ProjectCard, LazyImage, Modal)
- Pure presentational, menerima props dan menampilkan UI

**Business Logic Layer** (`lib/`):
- Parser: membaca dan mem-parse file konfigurasi proyek
- Formatter: memformat objek Project menjadi file konfigurasi
- Validator: validasi struktur data proyek
- Utils: helper functions untuk optimasi dan aksesibilitas

**Data Layer** (`data/`, `types/`):
- Type definitions: interface Project dan tipe terkait
- Data files: projects.json berisi konfigurasi proyek
- Configuration: environment variables dan config

## Components and Interfaces

### Core Type Definitions

```typescript
// src/types/project.ts

/**
 * Represents a single project in the portfolio
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  
  /** Display title of the project */
  title: string;
  
  /** Detailed description (max 500 characters) */
  description: string;
  
  /** List of technologies used in the project */
  technologies: string[];
  
  /** URL to the project's primary image */
  imageUrl: string;
  
  /** Optional additional images */
  additionalImages?: string[];
  
  /** Optional live demo URL */
  demoUrl?: string;
  
  /** Optional repository URL */
  repoUrl?: string;
}

/**
 * Configuration for the projects data source
 */
export interface ProjectConfig {
  /** Path to the projects JSON file */
  path: string;
  
  /** Maximum file size in bytes (default: 1MB) */
  maxFileSize: number;
  
  /** Parsing timeout in milliseconds (default: 5000ms) */
  timeout: number;
}

/**
 * Result of parsing operation
 */
export interface ParseResult<T> {
  /** Indicates if parsing was successful */
  success: boolean;
  
  /** Parsed data if successful */
  data?: T;
  
  /** Error message if failed */
  error?: string;
}

/**
 * Error types for project parsing
 */
export enum ParseErrorType {
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_JSON = 'INVALID_JSON',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  TIMEOUT = 'TIMEOUT',
}

/**
 * Structured error for parsing operations
 */
export interface ParseError {
  type: ParseErrorType;
  message: string;
  field?: string;
  location?: string;
}
```

### Component Interfaces

```typescript
// src/components/layout/Navbar.tsx

/**
 * Navigation item configuration
 */
export interface NavItem {
  /** Display label for the nav link */
  label: string;
  
  /** Section ID to scroll to */
  href: string;
  
  /** Optional icon name */
  icon?: string;
}

/**
 * Props for Navbar component
 */
export interface NavbarProps {
  /** List of navigation items */
  items: NavItem[];
  
  /** Optional custom class name */
  className?: string;
  
  /** Logo URL or text */
  logo?: string;
}

// src/components/ui/ProjectCard.tsx

/**
 * Props for ProjectCard component
 */
export interface ProjectCardProps {
  /** Project data to display */
  project: Project;
  
  /** Callback when card is clicked */
  onClick: (project: Project) => void;
  
  /** Optional custom class name */
  className?: string;
  
  /** Whether to enable lazy loading for images */
  lazyLoad?: boolean;
}

// src/components/ui/LazyImage.tsx

/**
 * Props for LazyImage component
 */
export interface LazyImageProps {
  /** Image source URL */
  src: string;
  
  /** Alt text for accessibility */
  alt: string;
  
  /** Optional placeholder image URL */
  placeholder?: string;
  
  /** Intersection observer threshold in pixels */
  threshold?: number;
  
  /** Optional custom class name */
  className?: string;
  
  /** Callback when image loads successfully */
  onLoad?: () => void;
  
  /** Callback when image fails to load */
  onError?: () => void;
}

// src/components/layout/Footer.tsx

/**
 * Contact information for footer
 */
export interface ContactInfo {
  /** Email address */
  email?: string;
  
  /** Phone number */
  phone?: string;
  
  /** Social media links */
  social?: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

/**
 * Props for Footer component
 */
export interface FooterProps {
  /** Contact information to display */
  contact: ContactInfo;
  
  /** Optional copyright text */
  copyright?: string;
  
  /** Optional custom class name */
  className?: string;
}
```

### Parser and Formatter Interfaces

```typescript
// src/lib/parser/projectParser.ts

/**
 * Parses project configuration file into Project objects
 */
export interface ProjectParser {
  /**
   * Parse a JSON file containing project data
   * 
   * @param filePath - Path to the projects JSON file
   * @param config - Optional parsing configuration
   * @returns ParseResult containing projects array or error
   * 
   * @throws {ParseError} When file not found, too large, or invalid format
   */
  parse(filePath: string, config?: Partial<ProjectConfig>): Promise<ParseResult<Project[]>>;
  
  /**
   * Validate a single project object
   * 
   * @param project - Project object to validate
   * @returns ParseResult indicating validation success or error
   */
  validate(project: unknown): ParseResult<Project>;
}

// src/lib/parser/projectFormatter.ts

/**
 * Formats Project objects into configuration file
 */
export interface ProjectFormatter {
  /**
   * Format projects array into JSON string
   * 
   * @param projects - Array of Project objects to format
   * @param prettify - Whether to prettify JSON output (default: true)
   * @returns JSON string representation
   */
  format(projects: Project[], prettify?: boolean): string;
  
  /**
   * Write projects to a file
   * 
   * @param projects - Array of Project objects to write
   * @param filePath - Destination file path
   * @returns Promise resolving to success boolean
   */
  writeToFile(projects: Project[], filePath: string): Promise<boolean>;
}
```

### Component Implementations

#### Navbar Component

```typescript
// src/components/layout/Navbar.tsx

import React, { useState, useEffect } from 'react';

export const Navbar: React.FC<NavbarProps> = ({ items, logo, className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className={`fixed top-0 w-full bg-white shadow-md z-50 ${className}`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary">
            {logo || 'Portfolio'}
          </div>

          {/* Desktop Menu */}
          {!isMobile && (
            <ul className="flex space-x-8">
              {items.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-neutral-700 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-3 py-2"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-neutral-800 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-full bg-neutral-800 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-full bg-neutral-800 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <ul className="pb-4 space-y-2">
            {items.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};
```

#### ProjectCard Component

```typescript
// src/components/ui/ProjectCard.tsx

import React from 'react';
import { LazyImage } from './LazyImage';
import type { ProjectCardProps } from '../../types/project';

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onClick, 
  className = '',
  lazyLoad = true 
}) => {
  const handleClick = () => {
    onClick(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(project);
    }
  };

  return (
    <article 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 focus-within:ring-2 focus-within:ring-primary cursor-pointer ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      <div className="aspect-video overflow-hidden bg-neutral-100">
        <LazyImage
          src={project.imageUrl}
          alt={`Screenshot of ${project.title} project`}
          className="w-full h-full object-cover"
          threshold={200}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          {project.title}
        </h3>
        
        <p className="text-neutral-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
```

#### LazyImage Component

```typescript
// src/components/ui/LazyImage.tsx

import React, { useState, useEffect, useRef } from 'react';
import type { LazyImageProps } from '../../types/project';

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
  threshold = 200,
  className = '',
  onLoad,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage();
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: `${threshold}px`,
        }
      );

      observer.observe(img);

      return () => {
        observer.disconnect();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      // Fallback: load immediately if IntersectionObserver not supported
      loadImage();
    }
  }, [src, threshold]);

  const loadImage = () => {
    setIsLoading(true);
    setHasError(false);

    // Set timeout for loading
    timeoutRef.current = setTimeout(() => {
      setHasError(true);
      setIsLoading(false);
      onError?.();
    }, 10000);

    const imageLoader = new Image();
    imageLoader.src = src;
    
    imageLoader.onload = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setImageSrc(src);
      setIsLoading(false);
      onLoad?.();
    };

    imageLoader.onerror = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setHasError(true);
      setIsLoading(false);
      onError?.();
    };
  };

  return (
    <div className={`relative ${className}`}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoading ? 'opacity-50' : 'opacity-100'
        }`}
        loading="lazy"
      />
      
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-neutral-100"
          aria-label="Loading image"
        >
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-500"
          aria-label="Failed to load image"
        >
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Image failed to load</p>
          </div>
        </div>
      )}
    </div>
  );
};
```

#### Footer Component

```typescript
// src/components/layout/Footer.tsx

import React from 'react';
import type { FooterProps } from '../../types/project';

export const Footer: React.FC<FooterProps> = ({ 
  contact, 
  copyright,
  className = '' 
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`bg-neutral-900 text-neutral-100 py-12 ${className}`}
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            
            {contact.email && (
              <p className="mb-2">
                <a 
                  href={`mailto:${contact.email}`}
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
                  aria-label={`Send email to ${contact.email}`}
                >
                  {contact.email}
                </a>
              </p>
            )}
            
            {contact.phone && (
              <p className="mb-2">
                <a 
                  href={`tel:${contact.phone}`}
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
                  aria-label={`Call ${contact.phone}`}
                >
                  {contact.phone}
                </a>
              </p>
            )}
          </div>

          {/* Social Media Links */}
          {contact.social && contact.social.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Follow Me</h2>
              <div className="flex space-x-4">
                {contact.social.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-neutral-800 rounded-full hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`Visit ${social.platform} profile`}
                  >
                    <span className="sr-only">{social.platform}</span>
                    <i className={social.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-400">
          <p>{copyright || `© ${currentYear} All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
};
```

## Data Models

### Project Data Model

```typescript
// src/types/project.ts

/**
 * Core project entity representing a portfolio item
 */
export interface Project {
  id: string;              // UUID v4 format
  title: string;           // 1-100 characters
  description: string;     // 1-500 characters
  technologies: string[];  // 1-20 items, each 1-50 characters
  imageUrl: string;        // Valid URL format
  additionalImages?: string[];
  demoUrl?: string;        // Valid URL format
  repoUrl?: string;        // Valid URL format
}
```

### JSON Schema for projects.json

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["id", "title", "description", "technologies", "imageUrl"],
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
      },
      "title": {
        "type": "string",
        "minLength": 1,
        "maxLength": 100
      },
      "description": {
        "type": "string",
        "minLength": 1,
        "maxLength": 500
      },
      "technologies": {
        "type": "array",
        "minItems": 1,
        "maxItems": 20,
        "items": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50
        }
      },
      "imageUrl": {
        "type": "string",
        "format": "uri"
      },
      "additionalImages": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uri"
        }
      },
      "demoUrl": {
        "type": "string",
        "format": "uri"
      },
      "repoUrl": {
        "type": "string",
        "format": "uri"
      }
    }
  }
}
```

### Example projects.json

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.",
    "technologies": ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
    "imageUrl": "/images/projects/ecommerce-main.jpg",
    "additionalImages": [
      "/images/projects/ecommerce-dashboard.jpg",
      "/images/projects/ecommerce-checkout.jpg"
    ],
    "demoUrl": "https://demo.ecommerce.example.com",
    "repoUrl": "https://github.com/username/ecommerce-platform"
  },
  {
    "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "title": "Task Management App",
    "description": "Collaborative task management application with real-time updates and team features.",
    "technologies": ["Vue.js", "Firebase", "Tailwind CSS"],
    "imageUrl": "/images/projects/taskmanager.jpg",
    "demoUrl": "https://tasks.example.com"
  }
]
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Lazy Loading Threshold Behavior

*For any* image positioned outside the viewport with a distance greater than 200px from the viewport edge, the image loading SHALL be deferred until the user scrolls to within 200px of the viewport edge.

**Validates: Requirements 4.1, 4.2**

### Property 2: Placeholder Dimensions Preservation

*For any* image being lazy loaded, the placeholder displayed during loading SHALL have identical width and height dimensions to the target image to prevent layout shift.

**Validates: Requirements 4.5**

### Property 3: Layout Stability with Lazy Loading

*For any* image with lazy loading enabled, the Cumulative Layout Shift (CLS) SHALL remain below 0.1 throughout the entire loading process.

**Validates: Requirements 4.8**

### Property 4: Touch Target Minimum Size

*For any* interactive element (button, link, form input) rendered on a viewport with width ≤767px (mobile), the element's clickable area SHALL be at least 44x44 pixels.

**Validates: Requirements 5.8**

### Property 5: Text Contrast Ratios

*For any* text element, the contrast ratio between text color and background color SHALL be at least 4.5:1 for text smaller than 18pt (or 14pt bold), and at least 3:1 for text 18pt or larger (or 14pt bold or larger), conforming to WCAG AA standards.

**Validates: Requirements 6.1, 6.2**

### Property 6: Image Alt Text Appropriateness

*For any* image in the portfolio website, if the image is content-bearing (conveys information or function), the `alt` attribute SHALL contain a non-empty descriptive text; if the image is purely decorative, the `alt` attribute SHALL be an empty string (`alt=""`).

**Validates: Requirements 6.3, 6.4**

### Property 7: Interactive Elements Keyboard Accessibility

*For any* interactive element (link, button, form input, custom interactive widget), the element SHALL be:
1. Reachable via Tab key navigation
2. Operable via keyboard (Enter to activate, Arrow keys for menu navigation where applicable)
3. Display a visible focus indicator with at least 3:1 contrast ratio against background when focused

**Validates: Requirements 6.5, 6.6, 6.7**

### Property 8: ARIA Labels for Unlabeled Interactive Elements

*For any* interactive element that does not have visible text label, the element SHALL have an appropriate ARIA label (via `aria-label` or `aria-labelledby`) that describes its function for screen reader users.

**Validates: Requirements 6.11**

### Property 9: Responsive Image Version Selection

*For any* viewport width within a given range (320-767px for mobile, 768-1023px for tablet, 1024px+ for desktop), the Portfolio Website SHALL load the appropriate image version:
- Mobile (320-767px): images with maximum width 800px
- Tablet (768-1023px): images with maximum width 1200px
- Desktop (1024px+): images with maximum width 1920px

**Validates: Requirements 8.7, 8.8, 8.9**

### Property 10: Parser Error Handling for Missing Fields

*For any* project configuration object with one or more missing required fields (id, title, description, technologies, imageUrl), the Project Parser SHALL return a descriptive error message specifying which field is missing and the location in the file.

**Validates: Requirements 9.3**

### Property 11: Serialization Round-Trip Preservation

*For any* valid Project object with all required fields (id, title, description, technologies, imageUrl), the operation parse(format(parse(configFile))) SHALL produce a Project object with identical values for all required fields as the original parsed object. This round-trip property ensures data integrity through serialization and deserialization cycles.

**Validates: Requirements 9.7**

**Note:** This is the most critical property for the parser/formatter system, as it guarantees that no data is lost or corrupted during serialization operations.

## Error Handling

### Error Categories

**1. Parser Errors** (Requirement 9):
- `FILE_NOT_FOUND`: Configuration file doesn't exist at specified path
- `FILE_TOO_LARGE`: Configuration file exceeds 1MB limit
- `INVALID_JSON`: File content is not valid JSON
- `MISSING_REQUIRED_FIELD`: One or more required fields are absent
- `TIMEOUT`: Parsing operation exceeds 5 second timeout

**2. Image Loading Errors** (Requirement 4):
- `IMAGE_LOAD_TIMEOUT`: Image fails to load within 10 seconds
- `IMAGE_LOAD_FAILURE`: Image URL is invalid or resource unavailable
- Error UI: Display placeholder with error icon and "Image failed to load" message

**3. Network Errors** (Requirement 8):
- `PAGE_LOAD_TIMEOUT`: Page fails to load within 30 seconds
- Error UI: Display user-friendly timeout message with retry option

### Error Handling Implementation

```typescript
// src/lib/parser/projectParser.ts

export class ProjectParserError extends Error {
  constructor(
    public type: ParseErrorType,
    message: string,
    public field?: string,
    public location?: string
  ) {
    super(message);
    this.name = 'ProjectParserError';
  }
}

export class ProjectParser implements IProjectParser {
  async parse(
    filePath: string, 
    config?: Partial<ProjectConfig>
  ): Promise<ParseResult<Project[]>> {
    const finalConfig: ProjectConfig = {
      path: filePath,
      maxFileSize: config?.maxFileSize ?? 1024 * 1024, // 1MB
      timeout: config?.timeout ?? 5000, // 5 seconds
    };

    try {
      // Check file existence
      const fileExists = await this.checkFileExists(filePath);
      if (!fileExists) {
        throw new ProjectParserError(
          ParseErrorType.FILE_NOT_FOUND,
          `File tidak ditemukan: ${filePath}`
        );
      }

      // Check file size
      const fileSize = await this.getFileSize(filePath);
      if (fileSize > finalConfig.maxFileSize) {
        throw new ProjectParserError(
          ParseErrorType.FILE_TOO_LARGE,
          `Ukuran file melebihi batas maksimal ${finalConfig.maxFileSize / (1024 * 1024)} MB`
        );
      }

      // Read and parse with timeout
      const content = await this.readFileWithTimeout(filePath, finalConfig.timeout);
      
      let parsed: unknown;
      try {
        parsed = JSON.parse(content);
      } catch (e) {
        throw new ProjectParserError(
          ParseErrorType.INVALID_JSON,
          `Format JSON tidak valid: ${e.message}`
        );
      }

      // Validate structure
      if (!Array.isArray(parsed)) {
        throw new ProjectParserError(
          ParseErrorType.INVALID_JSON,
          'File konfigurasi harus berisi array dari objek Project'
        );
      }

      // Validate each project
      const projects: Project[] = [];
      for (let i = 0; i < parsed.length; i++) {
        const result = this.validate(parsed[i]);
        if (!result.success) {
          throw new ProjectParserError(
            ParseErrorType.MISSING_REQUIRED_FIELD,
            `Project pada index ${i}: ${result.error}`,
            result.error?.field,
            `projects[${i}]`
          );
        }
        projects.push(result.data!);
      }

      return {
        success: true,
        data: projects,
      };

    } catch (error) {
      if (error instanceof ProjectParserError) {
        return {
          success: false,
          error: error.message,
        };
      }
      
      // Handle timeout
      if (error.name === 'TimeoutError') {
        return {
          success: false,
          error: `Parsing timeout setelah ${finalConfig.timeout / 1000} detik`,
        };
      }

      // Unexpected errors
      return {
        success: false,
        error: `Unexpected error: ${error.message}`,
      };
    }
  }

  validate(project: unknown): ParseResult<Project> {
    if (!project || typeof project !== 'object') {
      return {
        success: false,
        error: 'Project harus berupa objek',
      };
    }

    const obj = project as Record<string, unknown>;
    
    // Check required fields
    const requiredFields: (keyof Project)[] = [
      'id', 'title', 'description', 'technologies', 'imageUrl'
    ];
    
    for (const field of requiredFields) {
      if (!(field in obj) || obj[field] === undefined || obj[field] === null) {
        return {
          success: false,
          error: `Field required '${field}' tidak ditemukan`,
        };
      }
    }

    // Validate field types
    if (typeof obj.id !== 'string' || obj.id.length === 0) {
      return { success: false, error: 'Field id harus berupa string non-empty' };
    }

    if (typeof obj.title !== 'string' || obj.title.length === 0 || obj.title.length > 100) {
      return { success: false, error: 'Field title harus berupa string dengan panjang 1-100 karakter' };
    }

    if (typeof obj.description !== 'string' || obj.description.length === 0 || obj.description.length > 500) {
      return { success: false, error: 'Field description harus berupa string dengan panjang 1-500 karakter' };
    }

    if (!Array.isArray(obj.technologies) || obj.technologies.length === 0) {
      return { success: false, error: 'Field technologies harus berupa array non-empty' };
    }

    if (typeof obj.imageUrl !== 'string' || !this.isValidUrl(obj.imageUrl)) {
      return { success: false, error: 'Field imageUrl harus berupa URL yang valid' };
    }

    return {
      success: true,
      data: obj as Project,
    };
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      // Relative URLs are also acceptable
      return url.startsWith('/') || url.startsWith('./');
    }
  }

  private async readFileWithTimeout(filePath: string, timeout: number): Promise<string> {
    return Promise.race([
      this.readFile(filePath),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('TimeoutError')), timeout)
      ),
    ]);
  }

  private async checkFileExists(filePath: string): Promise<boolean> {
    // Implementation depends on environment (Node.js vs Browser)
    // For browser, this would use fetch
    // For Node.js, this would use fs.access
    return true; // Placeholder
  }

  private async getFileSize(filePath: string): Promise<number> {
    // Implementation depends on environment
    return 0; // Placeholder
  }

  private async readFile(filePath: string): Promise<string> {
    // Implementation depends on environment
    return ''; // Placeholder
  }
}
```

### Error Display Strategy

**User-Facing Errors**:
- Use toast notifications for non-critical errors (image load failures)
- Use error boundaries for critical React errors
- Display inline error messages for form validation
- Provide actionable error messages with suggested fixes

**Developer-Facing Errors**:
- Include detailed stack traces in development mode
- Log errors to console with context
- Include error codes for easy debugging
- Provide clear error messages in linter output

## Testing Strategy

### Testing Approach Overview

Aplikasi ini menggunakan **dual testing approach** yang menggabungkan:
1. **Unit tests**: Untuk scenario spesifik, edge cases, dan kondisi error
2. **Property-based tests**: Untuk properti universal yang harus berlaku di semua input
3. **Integration tests**: Untuk pengujian infrastruktur dan interaksi eksternal

### Property-Based Testing Configuration

**Library**: Fast-Check (JavaScript/TypeScript property-based testing library)

**Configuration**:
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
    },
  },
});
```

**Property Test Requirements**:
- Minimum **100 iterations** per property test (due to randomization)
- Each property test MUST reference its design document property
- Tag format: `// Feature: professional-portfolio-website, Property {number}: {property_text}`

### Test Categories

#### 1. Property-Based Tests

**File**: `tests/properties/projectParser.property.test.ts`

```typescript
import fc from 'fast-check';
import { describe, it, expect } from 'vitest';
import { ProjectParser } from '../../src/lib/parser/projectParser';
import { ProjectFormatter } from '../../src/lib/parser/projectFormatter';

// Feature: professional-portfolio-website, Property 11: Serialization Round-Trip Preservation
describe('Property 11: Serialization Round-Trip', () => {
  it('should preserve all required fields through parse-format-parse cycle', async () => {
    // Generator for valid Project objects
    const projectArbitrary = fc.record({
      id: fc.uuid(),
      title: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 500 }),
      technologies: fc.array(fc.string({ minLength: 1, maxLength: 50 }), { 
        minLength: 1, 
        maxLength: 20 
      }),
      imageUrl: fc.webUrl(),
      additionalImages: fc.option(fc.array(fc.webUrl()), { nil: undefined }),
      demoUrl: fc.option(fc.webUrl(), { nil: undefined }),
      repoUrl: fc.option(fc.webUrl(), { nil: undefined }),
    });

    await fc.assert(
      fc.asyncProperty(fc.array(projectArbitrary, { minLength: 1, maxLength: 10 }), async (projects) => {
        const parser = new ProjectParser();
        const formatter = new ProjectFormatter();

        // Format projects to JSON string
        const formatted = formatter.format(projects);

        // Write to temp file
        const tempPath = `/tmp/test-${Date.now()}.json`;
        await formatter.writeToFile(projects, tempPath);

        // Parse back
        const parseResult = await parser.parse(tempPath);

        // Verify success
        expect(parseResult.success).toBe(true);
        expect(parseResult.data).toBeDefined();

        // Verify all required fields are preserved
        const parsedProjects = parseResult.data!;
        expect(parsedProjects.length).toBe(projects.length);

        for (let i = 0; i < projects.length; i++) {
          const original = projects[i];
          const parsed = parsedProjects[i];

          expect(parsed.id).toBe(original.id);
          expect(parsed.title).toBe(original.title);
          expect(parsed.description).toBe(original.description);
          expect(parsed.technologies).toEqual(original.technologies);
          expect(parsed.imageUrl).toBe(original.imageUrl);
        }
      }),
      { numRuns: 100 } // Minimum 100 iterations
    );
  });
});

// Feature: professional-portfolio-website, Property 10: Parser Error Handling for Missing Fields
describe('Property 10: Parser Missing Field Errors', () => {
  it('should return descriptive error for any missing required field', async () => {
    const requiredFields = ['id', 'title', 'description', 'technologies', 'imageUrl'];
    
    // Generator for project with one random missing field
    const incompleteProjectArbitrary = fc.record({
      id: fc.uuid(),
      title: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 500 }),
      technologies: fc.array(fc.string({ minLength: 1, maxLength: 50 }), { 
        minLength: 1, 
        maxLength: 20 
      }),
      imageUrl: fc.webUrl(),
    }).chain(project => {
      return fc.constantFrom(...requiredFields).map(fieldToRemove => {
        const incomplete = { ...project };
        delete incomplete[fieldToRemove as keyof typeof incomplete];
        return { project: incomplete, missingField: fieldToRemove };
      });
    });

    await fc.assert(
      fc.asyncProperty(incompleteProjectArbitrary, async ({ project, missingField }) => {
        const parser = new ProjectParser();
        const result = parser.validate(project);

        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
        expect(result.error).toContain(missingField);
      }),
      { numRuns: 100 }
    );
  });
});
```

**File**: `tests/properties/lazyImage.property.test.ts`

```typescript
// Feature: professional-portfolio-website, Property 1: Lazy Loading Threshold Behavior
describe('Property 1: Lazy Loading Threshold', () => {
  it('should defer loading for images beyond 200px threshold', () => {
    // Test implementation using IntersectionObserver mock
    // and random image positions
  });
});

// Feature: professional-portfolio-website, Property 2: Placeholder Dimensions Preservation
describe('Property 2: Placeholder Dimensions', () => {
  it('should maintain exact dimensions during lazy load', async () => {
    const dimensionArbitrary = fc.record({
      width: fc.integer({ min: 100, max: 2000 }),
      height: fc.integer({ min: 100, max: 2000 }),
    });

    await fc.assert(
      fc.asyncProperty(dimensionArbitrary, async ({ width, height }) => {
        // Render LazyImage with specific dimensions
        // Verify placeholder has same dimensions
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: professional-portfolio-website, Property 4: Touch Target Minimum Size
describe('Property 4: Touch Target Size', () => {
  it('should ensure 44x44px minimum for all interactive elements on mobile', () => {
    // Generate random interactive elements
    // Verify minimum size on mobile viewport
  });
});
```

**File**: `tests/properties/accessibility.property.test.ts`

```typescript
// Feature: professional-portfolio-website, Property 5: Text Contrast Ratios
describe('Property 5: Text Contrast', () => {
  it('should meet WCAG AA contrast requirements for all text', async () => {
    const textArbitrary = fc.record({
      fontSize: fc.integer({ min: 10, max: 72 }),
      isBold: fc.boolean(),
      color: fc.hexaString({ minLength: 6, maxLength: 6 }),
      bgColor: fc.hexaString({ minLength: 6, maxLength: 6 }),
    });

    await fc.assert(
      fc.asyncProperty(textArbitrary, async ({ fontSize, isBold, color, bgColor }) => {
        const contrast = calculateContrastRatio(color, bgColor);
        const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);
        const minContrast = isLargeText ? 3 : 4.5;

        expect(contrast).toBeGreaterThanOrEqual(minContrast);
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: professional-portfolio-website, Property 7: Interactive Elements Keyboard Accessibility
describe('Property 7: Keyboard Accessibility', () => {
  it('should make all interactive elements keyboard accessible', () => {
    // Generate random interactive elements
    // Verify Tab navigation, Enter activation, focus indicators
  });
});
```

#### 2. Unit Tests

**Focus**:
- Component rendering with specific props
- Edge cases (empty states, error states)
- User interaction flows
- Utility functions

**Example**: `tests/unit/components/Navbar.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../../../src/components/layout/Navbar';

describe('Navbar Component', () => {
  const mockItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
  ];

  it('should render desktop menu on wide viewport', () => {
    global.innerWidth = 1024;
    render(<Navbar items={mockItems} logo="Portfolio" />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.queryByLabelText('Open menu')).not.toBeInTheDocument();
  });

  it('should render hamburger menu on mobile viewport', () => {
    global.innerWidth = 375;
    render(<Navbar items={mockItems} />);
    
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('should handle empty navigation items', () => {
    render(<Navbar items={[]} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
```

#### 3. Integration Tests

**Focus**:
- Performance metrics (FCP, LCP, CLS, TBT) on simulated 3G
- Network error handling
- End-to-end user flows
- Build output verification (bundle sizes)

**Example**: `tests/integration/performance.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { chromium } from 'playwright';

describe('Performance Metrics on 3G', () => {
  it('should meet FCP < 2s on 3G connection', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Simulate 3G network
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 400); // 400ms latency
    });

    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    
    const fcp = await page.evaluate(() => {
      const entries = performance.getEntriesByName('first-contentful-paint');
      return entries[0]?.startTime || 0;
    });

    expect(fcp).toBeLessThan(2000);
    
    await browser.close();
  });
});
```

#### 4. Accessibility Tests

**File**: `tests/accessibility/wcag.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../../src/App';

expect.extend(toHaveNoViolations);

describe('WCAG Compliance', () => {
  it('should have no automatic accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', () => {
    const { container } = render(<App />);
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    // Should have exactly one h1
    const h1Count = Array.from(headings).filter(h => h.tagName === 'H1').length;
    expect(h1Count).toBe(1);
    
    // Should not skip heading levels
    // This is a simplified check - full implementation would verify hierarchy
  });

  it('should have skip link for keyboard navigation', () => {
    render(<App />);
    const skipLink = screen.getByText(/skip to main content/i);
    
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main');
  });
});
```

### Coverage Requirements

**Requirement 10.7**: Minimal 70% line coverage untuk fungsi utility dan helper

**Coverage Configuration**:
```json
{
  "coverage": {
    "lines": 70,
    "functions": 70,
    "branches": 70,
    "statements": 70,
    "include": [
      "src/lib/**/*.ts",
      "src/utils/**/*.ts"
    ],
    "exclude": [
      "src/**/*.test.ts",
      "src/**/*.spec.ts"
    ]
  }
}
```

**CI Integration**:
```bash
# Run tests with coverage
npm run test:coverage

# Fail build if coverage < 70%
if [ $(cat coverage/coverage-summary.json | jq '.total.lines.pct') -lt 70 ]; then
  echo "Coverage below 70%"
  exit 1
fi
```

### Linting Configuration

**ESLint** (`eslintrc.json`):
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "react/prop-types": "off",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-role": "error"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

**Stylelint** (`.stylelintrc.json`):
```json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-tailwindcss"
  ],
  "rules": {
    "color-hex-length": "short",
    "declaration-block-no-duplicate-properties": true,
    "font-family-no-missing-generic-family-keyword": true,
    "no-descending-specificity": null
  }
}
```

### Testing Commands

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:properties": "vitest tests/properties",
    "lint": "eslint src --ext .ts,.tsx --format json --output-file eslint-report.json && stylelint 'src/**/*.css' --formatter json --output-file stylelint-report.json",
    "lint:fix": "eslint src --ext .ts,.tsx --fix && stylelint 'src/**/*.css' --fix",
    "type-check": "tsc --noEmit",
    "ci": "npm run type-check && npm run lint && npm run test:coverage"
  }
}
```

## Implementation Notes

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        background: '#ffffff',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
      },
    },
  },
  plugins: [],
}
```

### Performance Optimization Checklist

- [ ] Enable Vite code splitting for route-based chunks
- [ ] Configure Tailwind CSS purge to remove unused styles
- [ ] Implement responsive images with `<picture>` element and srcset
- [ ] Add preload hints for critical resources
- [ ] Implement service worker for offline capability (optional)
- [ ] Use web fonts with font-display: swap
- [ ] Minimize third-party scripts
- [ ] Enable gzip/brotli compression on server
- [ ] Implement CDN for static assets

### Accessibility Implementation Checklist

- [ ] Semantic HTML5 tags throughout
- [ ] Skip link component at top of page
- [ ] ARIA labels for all icon-only buttons
- [ ] Focus management in modal dialogs
- [ ] Keyboard escape to close modals
- [ ] Screen reader announcements for dynamic content
- [ ] Color contrast testing for all text
- [ ] Touch target size verification on mobile
- [ ] Focus indicators with 3:1 contrast
- [ ] Heading hierarchy validation

### Development Workflow

1. **Setup**: `npm install` to install dependencies
2. **Development**: `npm run dev` to start Vite dev server
3. **Type Checking**: `npm run type-check` to verify TypeScript
4. **Linting**: `npm run lint` to check code quality
5. **Testing**: `npm run test` for unit/property tests
6. **Coverage**: `npm run test:coverage` to verify 70% coverage
7. **Build**: `npm run build` to create production bundle
8. **Preview**: `npm run preview` to test production build

### CI/CD Integration

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build
      
      # Verify bundle sizes
      - name: Check bundle size
        run: |
          CSS_SIZE=$(stat -c%s dist/assets/*.css | awk '{s+=$1} END {print s}')
          JS_SIZE=$(stat -c%s dist/assets/*.js | awk '{s+=$1} END {print s}')
          
          if [ $CSS_SIZE -gt 51200 ]; then
            echo "CSS bundle exceeds 50KB: ${CSS_SIZE} bytes"
            exit 1
          fi
          
          if [ $JS_SIZE -gt 102400 ]; then
            echo "JS bundle exceeds 100KB: ${JS_SIZE} bytes"
            exit 1
          fi
```

---

## Summary

Desain ini menyediakan solusi lengkap untuk Website Portfolio Profesional dengan fokus pada:

1. **Modularitas**: Komponen terpisah dalam struktur direktori yang jelas
2. **Design System**: Tailwind CSS dengan design tokens terpusat
3. **Semantik**: HTML5 tags yang tepat untuk SEO dan aksesibilitas
4. **Performa**: Lazy loading, responsive images, dan bundle optimization
5. **Aksesibilitas**: WCAG AA compliance dengan keyboard navigation dan screen reader support
6. **Testing**: Property-based testing untuk round-trip serialization dan universal properties
7. **Quality**: ESLint, Stylelint, dan 70% code coverage

Implementasi mengikuti clean code engineering principles dengan TypeScript untuk type safety, comprehensive error handling, dan automated testing yang memastikan correctness di semua scenarios.
