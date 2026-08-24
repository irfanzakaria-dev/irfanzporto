/**
 * Component prop type definitions
 * Feature: professional-portfolio-website
 */

import { Project } from './project';

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

/**
 * Props for FeaturedProjectCard component (existing college projects)
 */
export interface FeaturedProjectCardProps {
  /** Featured project data to display */
  project: Project;
  
  /** Callback when card is clicked to open modal with details */
  onClick: (project: Project) => void;
  
  /** Optional custom class name */
  className?: string;
  
  /** Whether to enable lazy loading for images */
  lazyLoad?: boolean;
}

/**
 * Props for UpcomingProjectCard component (coming-soon slots)
 */
export interface UpcomingProjectCardProps {
  /** Optional custom class name */
  className?: string;
  
  /** Callback when card is clicked to show "Coming Soon" message */
  onClick?: () => void;
}

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
  
  /** Intersection observer threshold in pixels (default: 200) */
  threshold?: number;
  
  /** Optional custom class name */
  className?: string;
  
  /** Callback when image loads successfully */
  onLoad?: () => void;
  
  /** Callback when image fails to load */
  onError?: () => void;
}

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
    /** Platform name (e.g., 'GitHub', 'LinkedIn') */
    platform: string;
    
    /** URL to profile */
    url: string;
    
    /** Icon class name */
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

/**
 * Props for ProjectModal component
 */
export interface ProjectModalProps {
  /** Project to display in modal */
  project: Project | null;
  
  /** Whether modal is open */
  isOpen: boolean;
  
  /** Callback to close modal */
  onClose: () => void;
}

/**
 * Props for SkipLink component
 */
export interface SkipLinkProps {
  /** Target element ID to skip to */
  targetId: string;
  
  /** Optional link text (default: 'Skip to main content') */
  text?: string;
}