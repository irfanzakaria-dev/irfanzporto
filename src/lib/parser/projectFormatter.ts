/**
 * Project formatter implementation
 * Feature: professional-portfolio-website
 * Requirements: 9.6
 */

import { Project } from '../../types/project';

/**
 * Formatter for project objects to JSON configuration files
 */
export class ProjectFormatter {
  /**
   * Format projects array into JSON string
   * @param projects - Array of Project objects to format
   * @param prettify - Whether to prettify JSON output (default: true)
   * @returns JSON string representation
   */
  public format(projects: Project[], prettify: boolean = true): string {
    if (!Array.isArray(projects)) {
      throw new Error('Projects must be an array');
    }

    const indent = prettify ? 2 : 0;
    return JSON.stringify(projects, null, indent);
  }

  /**
   * Write projects to a file
   * @param projects - Array of Project objects to write
   * @param filePath - Destination file path
   * @returns Promise resolving to success boolean
   */
  public async writeToFile(projects: Project[], filePath: string): Promise<boolean> {
    try {
      const content = this.format(projects, true);

      // Browser environment - not supported
      if (typeof window !== 'undefined') {
        throw new Error('writeToFile is not supported in browser environment');
      }

      // Node.js environment - use fs
      const fs = await import('fs/promises');
      await fs.writeFile(filePath, content, 'utf-8');

      return true;
    } catch (error) {
      console.error('Failed to write file:', error);
      return false;
    }
  }
}