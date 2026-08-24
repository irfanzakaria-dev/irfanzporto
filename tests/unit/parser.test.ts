/**
 * Comprehensive Unit tests for ProjectParser, ProjectFormatter, ProjectParserError and loadPlaceholder
 * Feature: professional-portfolio-website
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 11.7
 */

import { describe, it, expect, vi } from 'vitest';

import { ProjectParser } from '../../src/lib/parser/projectParser';
import { ProjectFormatter } from '../../src/lib/parser/projectFormatter';
import { ProjectParserError } from '../../src/lib/parser/projectParserError';
import { ParseErrorType, Project } from '../../src/types/project';
import { loadPlaceholderData } from '../../src/lib/utils/loadPlaceholder';

describe('ProjectParserError', () => {
  it('should create error with correct properties', () => {
    const error = new ProjectParserError(
      ParseErrorType.MISSING_REQUIRED_FIELD,
      'Field missing',
      'title',
      'projects[0]'
    );

    expect(error.name).toBe('ProjectParserError');
    expect(error.type).toBe(ParseErrorType.MISSING_REQUIRED_FIELD);
    expect(error.message).toBe('Field missing');
    expect(error.field).toBe('title');
    expect(error.location).toBe('projects[0]');
  });

  it('should format message correctly with all fields', () => {
    const error = new ProjectParserError(
      ParseErrorType.MISSING_REQUIRED_FIELD,
      'Required field is missing',
      'title',
      'projects[0]'
    );

    const formatted = error.getFormattedMessage();
    expect(formatted).toBe('[MISSING_REQUIRED_FIELD] Required field is missing (field: title) at projects[0]');
  });

  it('should format message correctly without optional fields', () => {
    const error = new ProjectParserError(
      ParseErrorType.FILE_NOT_FOUND,
      'File does not exist'
    );

    const formatted = error.getFormattedMessage();
    expect(formatted).toBe('[FILE_NOT_FOUND] File does not exist');
  });

  it('should format message correctly with only field', () => {
    const error = new ProjectParserError(
      ParseErrorType.MISSING_REQUIRED_FIELD,
      'Missing field',
      'id'
    );

    const formatted = error.getFormattedMessage();
    expect(formatted).toBe('[MISSING_REQUIRED_FIELD] Missing field (field: id)');
  });

  it('should format message correctly with only location', () => {
    const error = new ProjectParserError(
      ParseErrorType.INVALID_JSON,
      'Bad JSON',
      undefined,
      'line 1'
    );

    const formatted = error.getFormattedMessage();
    expect(formatted).toBe('[INVALID_JSON] Bad JSON at line 1');
  });
});

describe('ProjectParser', () => {
  const parser = new ProjectParser();

  describe('validate', () => {
    const validProject: Project = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Portfolio Website',
      description: 'A professional portfolio website built with modern web technologies.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      imageUrl: '/images/projects/portfolio.jpg',
      isFeatured: true,
      demoUrl: 'https://demo.example.com',
      repoUrl: 'https://github.com/example/portfolio',
    };

    it('should validate a complete valid project object', () => {
      const result = parser.validate(validProject);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validProject);
      expect(result.error).toBeUndefined();
    });

    it('should fail when input is null, undefined, or not an object', () => {
      expect(parser.validate(null).success).toBe(false);
      expect(parser.validate(undefined).success).toBe(false);
      expect(parser.validate('string').success).toBe(false);
      expect(parser.validate(123).success).toBe(false);
    });

    it('should fail when required fields are missing', () => {
      const requiredFields: (keyof Project)[] = [
        'id',
        'title',
        'description',
        'technologies',
        'imageUrl',
        'isFeatured',
      ];

      for (const field of requiredFields) {
        const copy = { ...validProject };
        delete (copy as any)[field];
        const result = parser.validate(copy);
        expect(result.success).toBe(false);
        expect(result.error).toContain(field);
      }
    });

    it('should fail when id is empty or not string', () => {
      expect(parser.validate({ ...validProject, id: '' }).success).toBe(false);
      expect(parser.validate({ ...validProject, id: 123 }).success).toBe(false);
    });

    it('should fail when title is empty or exceeds 100 characters', () => {
      expect(parser.validate({ ...validProject, title: '' }).success).toBe(false);
      expect(parser.validate({ ...validProject, title: 'A'.repeat(101) }).success).toBe(false);
      expect(parser.validate({ ...validProject, title: 123 }).success).toBe(false);
    });

    it('should fail when description is empty or exceeds 500 characters', () => {
      expect(parser.validate({ ...validProject, description: '' }).success).toBe(false);
      expect(parser.validate({ ...validProject, description: 'A'.repeat(501) }).success).toBe(false);
      expect(parser.validate({ ...validProject, description: 123 }).success).toBe(false);
    });

    it('should fail when technologies is not an array or is empty', () => {
      expect(parser.validate({ ...validProject, technologies: [] }).success).toBe(false);
      expect(parser.validate({ ...validProject, technologies: 'React' }).success).toBe(false);
    });

    it('should fail when technologies exceeds 20 items', () => {
      const tooManyTechs = Array.from({ length: 21 }, (_, i) => `Tech ${i}`);
      expect(parser.validate({ ...validProject, technologies: tooManyTechs }).success).toBe(false);
    });

    it('should fail when any technology item is invalid string', () => {
      expect(parser.validate({ ...validProject, technologies: [''] }).success).toBe(false);
      expect(parser.validate({ ...validProject, technologies: ['A'.repeat(51)] }).success).toBe(false);
      expect(parser.validate({ ...validProject, technologies: [123] }).success).toBe(false);
    });

    it('should validate imageUrl (relative and absolute)', () => {
      expect(parser.validate({ ...validProject, imageUrl: 'https://example.com/img.png' }).success).toBe(true);
      expect(parser.validate({ ...validProject, imageUrl: '/images/img.png' }).success).toBe(true);
      expect(parser.validate({ ...validProject, imageUrl: './images/img.png' }).success).toBe(true);
      expect(parser.validate({ ...validProject, imageUrl: '../images/img.png' }).success).toBe(true);
      expect(parser.validate({ ...validProject, imageUrl: 'not an url' }).success).toBe(false);
      expect(parser.validate({ ...validProject, imageUrl: 123 }).success).toBe(false);
    });

    it('should validate isFeatured boolean', () => {
      expect(parser.validate({ ...validProject, isFeatured: true }).success).toBe(true);
      expect(parser.validate({ ...validProject, isFeatured: false }).success).toBe(true);
      expect(parser.validate({ ...validProject, isFeatured: 'true' }).success).toBe(false);
      expect(parser.validate({ ...validProject, isFeatured: null }).success).toBe(false);
    });

    it('should validate optional demoUrl and repoUrl', () => {
      expect(parser.validate({ ...validProject, demoUrl: 'https://demo.com' }).success).toBe(true);
      expect(parser.validate({ ...validProject, demoUrl: 'invalid url' }).success).toBe(false);
      expect(parser.validate({ ...validProject, repoUrl: 'https://github.com' }).success).toBe(true);
      expect(parser.validate({ ...validProject, repoUrl: 'invalid url' }).success).toBe(false);
    });
  });

  describe('parse', () => {
    it('should parse valid projects json successfully in browser environment', async () => {
      const validJson = JSON.stringify([
        {
          id: '1',
          title: 'Project 1',
          description: 'Desc 1',
          technologies: ['React'],
          imageUrl: '/img.jpg',
          isFeatured: true,
        },
      ]);

      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(validJson),
      });

      const result = await parser.parse('/data/projects.json');
      expect(result.success).toBe(true);
      expect(result.data?.length).toBe(1);
      expect(result.data?.[0].title).toBe('Project 1');

      global.fetch = originalFetch;
    });

    it('should return error when file size exceeds limit', async () => {
      const largeContent = 'a'.repeat(2 * 1024 * 1024); // 2MB
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(largeContent),
      });

      const result = await parser.parse('/data/projects.json');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Ukuran file melebihi batas');

      global.fetch = originalFetch;
    });

    it('should return error when JSON is invalid', async () => {
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{ not valid json'),
      });

      const result = await parser.parse('/data/projects.json');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Format JSON tidak valid');

      global.fetch = originalFetch;
    });

    it('should return error when JSON is not an array', async () => {
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ not: 'an array' })),
      });

      const result = await parser.parse('/data/projects.json');
      expect(result.success).toBe(false);
      expect(result.error).toContain('array');

      global.fetch = originalFetch;
    });

    it('should return error when array item is invalid project', async () => {
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify([{ id: '1' }])),
      });

      const result = await parser.parse('/data/projects.json');
      expect(result.success).toBe(false);
      expect(result.error).toContain('projects[0]');

      global.fetch = originalFetch;
    });

    it('should return error when fetch fails with 404', async () => {
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      });

      const result = await parser.parse('/data/notfound.json');
      expect(result.success).toBe(false);
      expect(result.error).toContain('File tidak ditemukan');

      global.fetch = originalFetch;
    });

    it('should handle timeout when reading takes longer than config.timeout', async () => {
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 200))
      );

      const result = await parser.parse('/data/projects.json', { timeout: 50 });
      expect(result.success).toBe(false);
      expect(result.error).toContain('timeout');

      global.fetch = originalFetch;
    });
  });
});

describe('ProjectFormatter', () => {
  const formatter = new ProjectFormatter();

  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'Project Alpha',
      description: 'First test project',
      technologies: ['React', 'TypeScript'],
      imageUrl: '/images/alpha.jpg',
      isFeatured: true,
      demoUrl: 'https://alpha.example.com',
      repoUrl: 'https://github.com/test/alpha',
    },
  ];

  it('should format projects array into JSON string with prettify', () => {
    const formatted = formatter.format(sampleProjects, true);
    expect(formatted).toContain('    "title": "Project Alpha"');
    const parsed = JSON.parse(formatted);
    expect(parsed).toEqual(sampleProjects);
  });

  it('should format projects array into compact JSON string', () => {
    const formatted = formatter.format(sampleProjects, false);
    expect(formatted).not.toContain('\n');
    const parsed = JSON.parse(formatted);
    expect(parsed).toEqual(sampleProjects);
  });

  it('should throw error when input is not an array', () => {
    expect(() => formatter.format(null as any)).toThrow('Projects must be an array');
    expect(() => formatter.format({} as any)).toThrow('Projects must be an array');
  });

  it('should handle writeToFile in browser environment', async () => {
    const originalWindow = global.window;
    (global as any).window = {};

    const result = await formatter.writeToFile(sampleProjects, '/tmp/test.json');
    expect(result).toBe(false);

    global.window = originalWindow;
  });

  it('should handle writeToFile in node environment', async () => {
    const originalWindow = global.window;
    delete (global as any).window;

    const result = await formatter.writeToFile(sampleProjects, './tests/scratch_test.json');
    expect(typeof result).toBe('boolean');

    global.window = originalWindow;
  });

});

describe('loadPlaceholderData', () => {
  it('should load placeholder data in browser environment', async () => {
    const mockData = {
      name: 'Jane Doe',
      tagline: 'Senior Engineer',
      about: 'About Jane Doe',
      skills: ['React', 'TypeScript'],
      contact: {
        email: 'jane@example.com',
        phone: '12345',
        social: [],
      },
    };

    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const data = await loadPlaceholderData();
    expect(data.name).toBe('Jane Doe');
    expect(data.skills).toContain('React');

    global.fetch = originalFetch;
  });

  it('should throw error when fetch fails', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Server Error',
    });

    await expect(loadPlaceholderData()).rejects.toThrow('Could not load placeholder data');

    global.fetch = originalFetch;
  });
});
