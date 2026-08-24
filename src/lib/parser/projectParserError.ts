/**
 * Custom error class for project parsing operations
 * Feature: professional-portfolio-website
 * Requirements: 9.2, 9.3
 */

import { ParseErrorType } from '../../types/project';

/**
 * Custom error class for parsing operations with structured error information
 */
export class ProjectParserError extends Error {
  /**
   * Creates a new ProjectParserError
   * @param type - The type of parsing error
   * @param message - Human-readable error message
   * @param field - Optional field name that caused the error
   * @param location - Optional location in file where error occurred
   */
  constructor(
    public type: ParseErrorType,
    message: string,
    public field?: string,
    public location?: string
  ) {
    super(message);
    this.name = 'ProjectParserError';
    
    // Maintains proper stack trace for where error was thrown (V8 only)
    if ('captureStackTrace' in Error && typeof (Error as { captureStackTrace?: (err: Error, fn: unknown) => void }).captureStackTrace === 'function') {
      (Error as { captureStackTrace: (err: Error, fn: unknown) => void }).captureStackTrace(this, ProjectParserError);
    }

  }

  /**
   * Returns a formatted error message with all available context
   * @returns Formatted error message
   */
  public getFormattedMessage(): string {
    let msg = `[${this.type}] ${this.message}`;
    
    if (this.field) {
      msg += ` (field: ${this.field})`;
    }
    
    if (this.location) {
      msg += ` at ${this.location}`;
    }
    
    return msg;
  }
}