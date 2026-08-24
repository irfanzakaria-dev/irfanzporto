/**
 * Property-based tests for ProjectParser and ProjectFormatter
 * Property 10: Parser Error Handling for Missing Fields (Req 9.3)
 * Property 11: Serialization Round-Trip Preservation (Req 9.7)
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { ProjectParser } from '../../src/lib/parser/projectParser';
import { ProjectFormatter } from '../../src/lib/parser/projectFormatter';
import { Project } from '../../src/types/project';

describe('Property-Based Tests for Project Parser & Formatter', () => {
  const parser = new ProjectParser();
  const formatter = new ProjectFormatter();

  // Arbitrary generator for valid Project objects
  const validProjectArbitrary: fc.Arbitrary<Project> = fc.record({
    id: fc.uuid(),
    title: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
    description: fc.string({ minLength: 1, maxLength: 500 }).filter((s) => s.trim().length > 0),
    technologies: fc.array(
      fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
      { minLength: 1, maxLength: 20 }
    ),
    imageUrl: fc.constantFrom(
      'https://picsum.photos/800/600',
      'https://example.com/project.jpg',
      '/images/project.jpg',
      './images/project.png'
    ),
    isFeatured: fc.boolean(),
    demoUrl: fc.option(fc.constantFrom('https://demo.example.com', 'https://app.example.com'), { nil: undefined }),
    repoUrl: fc.option(fc.constantFrom('https://github.com/example/repo', 'https://gitlab.com/example/repo'), { nil: undefined }),
  });

  /**
   * Property 10: Parser Error Handling for Missing Fields
   * Validates: Requirements 9.3
   */
  describe('Property 10: Parser Error Handling for Missing Fields', () => {
    const requiredKeys: (keyof Project)[] = [
      'id',
      'title',
      'description',
      'technologies',
      'imageUrl',
      'isFeatured',
    ];

    it('should reject objects missing any required field with descriptive error mentioning the field', () => {
      fc.assert(
        fc.property(
          validProjectArbitrary,
          fc.constantFrom(...requiredKeys),
          (project, keyToRemove) => {
            const incompleteProject: Record<string, any> = { ...project };
            delete incompleteProject[keyToRemove];

            const result = parser.validate(incompleteProject);

            // Validation must fail
            expect(result.success).toBe(false);
            // Error message must mention the missing field
            expect(result.error?.toLowerCase()).toContain(keyToRemove.toLowerCase());
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 11: Serialization Round-Trip Preservation
   * Validates: Requirements 9.7
   */
  describe('Property 11: Serialization Round-Trip Preservation', () => {
    it('should preserve all project fields after format and parse round-trip', () => {
      fc.assert(
        fc.property(fc.array(validProjectArbitrary, { minLength: 1, maxLength: 10 }), (projects) => {
          // Format projects into JSON string
          const formatted = formatter.format(projects);

          // Parse back to JSON
          const parsed = JSON.parse(formatted);

          // Array validation
          expect(Array.isArray(parsed)).toBe(true);
          expect(parsed.length).toBe(projects.length);

          // Validate each project with parser.validate
          for (let i = 0; i < parsed.length; i++) {
            const validationResult = parser.validate(parsed[i]);
            expect(validationResult.success).toBe(true);
            expect(validationResult.data).toEqual(projects[i]);
          }
        }),
        { numRuns: 100 }
      );
    });
  });
});
