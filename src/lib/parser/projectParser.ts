/**
 * Project parser implementation
 * Feature: professional-portfolio-website
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5
 */

import { Project, ProjectConfig, ParseResult, ParseErrorType } from '../../types/project';
import { ProjectParserError } from './projectParserError';

/**
 * Parser for project configuration files
 */
export class ProjectParser {
  private defaultConfig: ProjectConfig = {
    path: './data/projects.json',
    maxFileSize: 1024 * 1024, // 1MB
    timeout: 5000, // 5 seconds
  };

  /**
   * Parse project configuration file
   * @param filePath - Path to projects JSON file
   * @param config - Optional configuration overrides
   * @returns ParseResult containing projects array or error
   */
  public async parse(
    filePath: string,
    config?: Partial<ProjectConfig>
  ): Promise<ParseResult<Project[]>> {
    const finalConfig: ProjectConfig = {
      ...this.defaultConfig,
      ...config,
      path: filePath,
    };

    try {
      // Read file with timeout
      const content = await this.readFileWithTimeout(filePath, finalConfig.timeout);

      // Check file size
      if (content.length > finalConfig.maxFileSize) {
        throw new ProjectParserError(
          ParseErrorType.FILE_TOO_LARGE,
          `Ukuran file melebihi batas maksimal ${finalConfig.maxFileSize / (1024 * 1024)} MB`
        );
      }

      // Parse JSON
      let parsed: unknown;
      try {
        parsed = JSON.parse(content);
      } catch (e) {
        throw new ProjectParserError(
          ParseErrorType.INVALID_JSON,
          `Format JSON tidak valid: ${(e as Error).message}`
        );
      }

      // Validate array structure
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
            undefined,
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
          error: error.getFormattedMessage(),
        };
      }

      // Handle file not found
      if (error && typeof error === 'object' && 'code' in error && (error as { code: unknown }).code === 'ENOENT') {
        return {
          success: false,
          error: `File tidak ditemukan: ${filePath}`,
        };
      }


      // Handle timeout
      if ((error as Error).message === 'TIMEOUT') {
        return {
          success: false,
          error: `Parsing timeout setelah ${finalConfig.timeout / 1000} detik`,
        };
      }

      // Unexpected errors
      return {
        success: false,
        error: `Unexpected error: ${(error as Error).message}`,
      };
    }
  }

  /**
   * Validate a single project object
   * @param project - Object to validate as Project
   * @returns ParseResult with validated project or error
   */
  public validate(project: unknown): ParseResult<Project> {
    if (!project || typeof project !== 'object') {
      return {
        success: false,
        error: 'Project harus berupa objek',
      };
    }

    const obj = project as Record<string, unknown>;

    // Check required fields
    const requiredFields: Array<keyof Project> = [
      'id',
      'title',
      'description',
      'technologies',
      'imageUrl',
      'isFeatured',
    ];

    for (const field of requiredFields) {
      if (!(field in obj) || obj[field] === undefined || obj[field] === null) {
        return {
          success: false,
          error: `Field required '${field}' tidak ditemukan`,
        };
      }
    }

    // Validate field types and constraints
    if (typeof obj.id !== 'string' || obj.id.length === 0) {
      return {
        success: false,
        error: 'Field id harus berupa string non-empty',
      };
    }

    if (typeof obj.title !== 'string' || obj.title.length === 0 || obj.title.length > 100) {
      return {
        success: false,
        error: 'Field title harus berupa string dengan panjang 1-100 karakter',
      };
    }

    if (
      typeof obj.description !== 'string' ||
      obj.description.length === 0 ||
      obj.description.length > 500
    ) {
      return {
        success: false,
        error: 'Field description harus berupa string dengan panjang 1-500 karakter',
      };
    }

    if (!Array.isArray(obj.technologies) || obj.technologies.length === 0) {
      return {
        success: false,
        error: 'Field technologies harus berupa array non-empty',
      };
    }

    if (obj.technologies.length > 20) {
      return {
        success: false,
        error: 'Field technologies tidak boleh lebih dari 20 items',
      };
    }

    for (const tech of obj.technologies) {
      if (typeof tech !== 'string' || tech.length === 0 || tech.length > 50) {
        return {
          success: false,
          error: 'Setiap technology harus berupa string dengan panjang 1-50 karakter',
        };
      }
    }

    if (typeof obj.imageUrl !== 'string' || !this.isValidUrl(obj.imageUrl)) {
      return {
        success: false,
        error: 'Field imageUrl harus berupa URL yang valid',
      };
    }

    if (typeof obj.isFeatured !== 'boolean') {
      return {
        success: false,
        error: 'Field isFeatured harus berupa boolean',
      };
    }

    // Validate optional fields
    if (obj.demoUrl !== undefined && (typeof obj.demoUrl !== 'string' || !this.isValidUrl(obj.demoUrl))) {
      return {
        success: false,
        error: 'Field demoUrl harus berupa URL yang valid',
      };
    }

    if (obj.repoUrl !== undefined && (typeof obj.repoUrl !== 'string' || !this.isValidUrl(obj.repoUrl))) {
      return {
        success: false,
        error: 'Field repoUrl harus berupa URL yang valid',
      };
    }

    return {
      success: true,
      data: obj as unknown as Project,
    };
  }

  /**
   * Check if a string is a valid URL (absolute or relative)
   * @param url - URL string to validate
   * @returns true if valid URL
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      // Relative URLs are also acceptable
      return url.startsWith('/') || url.startsWith('./') || url.startsWith('../');
    }
  }

  /**
   * Read file with timeout
   * @param filePath - Path to file
   * @param timeout - Timeout in milliseconds
   * @returns Promise resolving to file content
   */
  private async readFileWithTimeout(filePath: string, timeout: number): Promise<string> {
    return Promise.race([
      this.readFile(filePath),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT')), timeout)
      ),
    ]);
  }

  /**
   * Read file content
   * @param filePath - Path to file
   * @returns Promise resolving to file content
   */
  private async readFile(filePath: string): Promise<string> {
    // Browser environment - use fetch
    if (typeof window !== 'undefined') {
      const response = await fetch(filePath);
      if (!response.ok) {
        const error = Object.assign(new Error(`Failed to fetch: ${response.statusText}`), { code: 'ENOENT' });
        throw error;
      }
      return response.text();
    }


    // Node.js environment - use fs
    const fs = await import('fs/promises');
    return fs.readFile(filePath, 'utf-8');
  }
}