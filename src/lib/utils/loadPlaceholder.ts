/**
 * Utility for loading placeholder data
 * Feature: professional-portfolio-website
 * Requirements: 11.7
 */

import { PlaceholderData } from '../../types/project';

/**
 * Load placeholder data from the placeholder.json file
 * @returns Promise resolving to PlaceholderData
 * @throws Error if file cannot be loaded or parsed
 */
export async function loadPlaceholderData(): Promise<PlaceholderData> {
  try {
    // Browser environment – use fetch
    if (typeof window !== 'undefined') {
      const response = await fetch('/data/placeholder.json');
      if (!response.ok) {
        throw new Error(`Failed to load placeholder data: ${response.statusText}`);
      }
      return response.json() as Promise<PlaceholderData>;
    }

    // Node.js environment – dynamic import
    const fs = await import('fs/promises');
    const content = await fs.readFile('./data/placeholder.json', 'utf-8');
    return JSON.parse(content) as PlaceholderData;
  } catch (error) {
    throw new Error(`Could not load placeholder data: ${(error as Error).message}`);
  }
}
