/**
 * Core type definitions for professional portfolio website
 * Feature: professional-portfolio-website
 */

/**
 * Represents a single project in the portfolio
 */
export interface Project {
  /** Unique identifier for the project (UUID v4 format) */
  id: string;
  
  /** Display title of the project (1-100 characters) */
  title: string;
  
  /** Detailed description (1-500 characters) */
  description: string;
  
  /** List of technologies used in the project (1-20 items) */
  technologies: string[];
  
  /** URL to the project's primary image */
  imageUrl: string;
  
  /** Whether this is a featured project (existing) or upcoming project (coming soon) */
  isFeatured: boolean;
  
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
 * @template T The type of data being parsed
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
  /** Type of parsing error */
  type: ParseErrorType;
  
  /** Human-readable error message */
  message: string;
  
  /** Field name that caused the error (if applicable) */
  field?: string;
  
  /** Location in file where error occurred (if applicable) */
  location?: string;
}

/**
 * Placeholder data for temporary biodata
 */
export interface PlaceholderData {
  /** Professional placeholder name */
  name: string;
  
  /** Professional placeholder tagline */
  tagline: string;
  
  /** About description (300-500 characters) */
  about: string;
  
  /** List of skills/technologies (minimum 5) */
  skills: string[];
  
  /** Contact information */
  contact: {
    /** Email address */
    email: string;
    
    /** Phone number */
    phone: string;
    
    /** Social media links */
    social: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
  };
}