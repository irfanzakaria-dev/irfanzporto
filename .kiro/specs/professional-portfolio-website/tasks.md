# Implementation Plan: Professional Portfolio Website

## Overview

Implementasi website portfolio profesional menggunakan React + TypeScript dengan Tailwind CSS untuk design system. Fokus pada arsitektur modular, performa tinggi, aksesibilitas WCAG AA, dan property-based testing untuk correctness properties.

**Tech Stack:**
- React 18 + TypeScript
- Tailwind CSS untuk design tokens
- Vite untuk build tool
- Vitest + Fast-Check untuk testing
- ESLint + Stylelint untuk code quality

## Tasks

- [x] 1. Setup project dan konfigurasi tooling
  - Initialize Vite project dengan React + TypeScript template
  - Install dependencies: React, TypeScript, Tailwind CSS, Vitest, Fast-Check, ESLint, Stylelint
  - Configure Tailwind dengan design tokens (6 colors, 5 fonts, 8 spacing)
  - Setup ESLint dengan rules untuk React, TypeScript, dan jsx-a11y
  - Setup Stylelint dengan Tailwind config
  - Configure Vitest dengan jsdom environment dan coverage
  - Create directory structure sesuai design (components/, lib/, types/, data/, styles/, config/)
  - _Requirements: 10.1, 10.2, 10.5, 10.6, 10.9_

- [x] 2. Implement design system dan global styles
  - [x] 2.1 Configure Tailwind design tokens
    - Define 6 color categories dalam tailwind.config.js (primary, secondary, neutral, success, warning, error)
    - Define 5 font sizes dengan line heights
    - Define 8 spacing values
    - Create globals.css dengan base styles
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 2.2 Create design system documentation
    - Document semua design tokens dengan nama, nilai, dan contoh penggunaan
    - Create storybook atau dokumentasi untuk color palette
    - _Requirements: 2.4_

- [x] 3. Create type definitions dan data models
  - [x] 3.1 Define core types
    - Create src/types/project.ts dengan interface Project
    - Add `isFeatured: boolean` field to Project interface
    - Define ProjectConfig, ParseResult, ParseErrorType, ParseError interfaces
    - Add JSDoc comments untuk semua exported types
    - _Requirements: 9.1, 9.2, 10.6_

  - [x] 3.2 Create component prop types
    - Define NavbarProps, NavItem interfaces
    - Define FeaturedProjectCardProps interface
    - Define UpcomingProjectCardProps interface
    - Define LazyImageProps interfaces
    - Define FooterProps, ContactInfo interfaces
    - Add JSDoc comments untuk semua prop types
    - _Requirements: 1.2, 1.3, 10.6_

- [x] 4. Implement Project Parser dengan error handling
  - [x] 4.1 Create ProjectParserError class
    - Implement custom error class dengan type, message, field, location properties
    - _Requirements: 9.2, 9.3_

  - [x] 4.2 Implement ProjectParser.parse method
    - Check file existence dan return error jika tidak ditemukan
    - Check file size dan return error jika > 1MB
    - Read file dengan timeout 5 detik
    - Parse JSON dan handle invalid JSON error
    - Validate array structure
    - Loop through projects dan validate each one
    - Return ParseResult dengan success/error
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [x] 4.3 Implement ProjectParser.validate method
    - Validate object structure dan required fields
    - Check id, title, description, technologies, imageUrl presence
    - Validate field types dan constraints
    - Return descriptive error dengan field name jika validation fails
    - _Requirements: 9.3_

  - [ ]* 4.4 Write property test for parser error handling (Property 10)
    - **Property 10: Parser Error Handling for Missing Fields**
    - **Validates: Requirements 9.3**
    - Use Fast-Check untuk generate incomplete project objects
    - Test semua kombinasi missing required fields
    - Verify error message contains field name
    - Run 100 iterations minimum
    - _Requirements: 9.3_

- [x] 5. Implement Project Formatter
  - [x] 5.1 Implement ProjectFormatter.format method
    - Convert Project array menjadi JSON string
    - Support prettify option untuk readable output
    - Add JSDoc comments
    - _Requirements: 9.6_

  - [x] 5.2 Implement ProjectFormatter.writeToFile method
    - Write formatted JSON ke file path
    - Handle file write errors
    - Return success boolean
    - _Requirements: 9.6_

  - [ ]* 5.3 Write property test for round-trip serialization (Property 11)
    - **Property 11: Serialization Round-Trip Preservation**
    - **Validates: Requirements 9.7**
    - Use Fast-Check untuk generate valid Project arrays
    - Test parse(format(parse(file))) === original
    - Verify all required fields preserved
    - Run 100 iterations minimum
    - _Requirements: 9.7_

- [x] 6. Checkpoint - Ensure parser/formatter tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement LazyImage component dengan IntersectionObserver
  - [x] 7.1 Create LazyImage component
    - Implement placeholder dengan loading state
    - Setup IntersectionObserver dengan 200px threshold
    - Handle image load success dan error
    - Show loading spinner during load
    - Show error placeholder jika load fails setelah 10 detik
    - Maintain dimensions untuk prevent layout shift
    - Add aria-label untuk loading dan error states
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 4.7, 4.8_

  - [ ]* 7.2 Write unit tests for LazyImage
    - Test placeholder display
    - Test IntersectionObserver callback
    - Test loading state
    - Test error state setelah timeout
    - Test success state
    - _Requirements: 4.1, 4.2, 4.7_

  - [ ]* 7.3 Write property test for lazy loading threshold (Property 1)
    - **Property 1: Lazy Loading Threshold Behavior**
    - **Validates: Requirements 4.1, 4.2**
    - Mock IntersectionObserver dengan random image positions
    - Test images > 200px tidak dimuat
    - Test images <= 200px dimuat
    - Run 100 iterations minimum
    - _Requirements: 4.1, 4.2_

  - [ ]* 7.4 Write property test for placeholder dimensions (Property 2)
    - **Property 2: Placeholder Dimensions Preservation**
    - **Validates: Requirements 4.5**
    - Generate random image dimensions
    - Verify placeholder has identical dimensions
    - Run 100 iterations minimum
    - _Requirements: 4.5_

  - [ ]* 7.5 Write property test for CLS (Property 3)
    - **Property 3: Layout Stability with Lazy Loading**
    - **Validates: Requirements 4.8**
    - Test CLS < 0.1 throughout loading
    - Run 100 iterations minimum
    - _Requirements: 4.8_

- [x] 8. Implement Navbar component dengan responsive menu
  - [x] 8.1 Create Navbar component
    - Implement desktop horizontal menu
    - Implement mobile hamburger menu
    - Handle window resize untuk toggle menu mode
    - Implement smooth scroll ke sections
    - Add keyboard navigation support (Tab, Enter)
    - Add focus indicators dengan 3:1 contrast
    - Use semantic `<nav>` tag
    - Add ARIA labels untuk menu buttons
    - _Requirements: 1.1, 3.5, 5.4, 6.5, 6.6, 6.7, 6.11_

  - [x] 8.2 Write unit tests for Navbar
    - Test desktop menu rendering pada wide viewport
    - Test mobile menu rendering pada narrow viewport
    - Test hamburger menu toggle
    - Test smooth scroll behavior
    - Test keyboard navigation
    - _Requirements: 1.1, 5.4_

- [x] 9. Implement SkipLink component untuk aksesibilitas
  - Create SkipLink component yang fokusable dengan keyboard
  - Link ke #main content
  - Hidden by default, visible on focus
  - _Requirements: 6.10_

- [x] 10. Implement Footer component
  - [x] 10.1 Create Footer component
    - Display contact information (email, phone)
    - Display social media links dengan icons
    - Add copyright text dengan current year
    - Use semantic `<footer>` tag
    - Add ARIA labels untuk social links
    - Ensure keyboard accessibility
    - _Requirements: 1.3, 3.4, 6.5, 6.6, 6.11_

  - [x] 10.2 Write unit tests for Footer
    - Test contact info rendering
    - Test social links rendering
    - Test copyright text
    - Test missing contact info handling
    - _Requirements: 1.3_

- [x] 11. Checkpoint - Ensure layout components tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Implement FeaturedProjectCard and UpcomingProjectCard components
  - [x] 12.1 Create FeaturedProjectCard component
    - Display project image dengan LazyImage
    - Display title, description, technologies
    - Handle click event untuk open modal dengan project details
    - Handle keyboard events (Enter, Space)
    - Use semantic `<article>` tag
    - Add focus indicators
    - Add hover effects
    - Add ARIA label untuk card interaction
    - _Requirements: 1.2, 3.6, 6.5, 6.6, 6.7, 7.8, 7.10_

  - [x] 12.2 Create UpcomingProjectCard component
    - Display "Coming Soon" placeholder image
    - Display "Upcoming Project" title
    - Handle click event untuk show "Coming Soon" message only (no modal)
    - Handle keyboard events (Enter, Space)
    - Use semantic `<article>` tag
    - Add focus indicators
    - Add hover effects
    - Add ARIA label untuk card interaction
    - _Requirements: 1.3, 3.6, 6.5, 6.6, 6.7, 7.9, 7.15_

  - [ ]* 12.3 Write unit tests for FeaturedProjectCard
    - Test rendering dengan valid project data
    - Test click handler opens modal
    - Test keyboard interaction (Enter, Space)
    - Test hover state
    - _Requirements: 1.2, 7.8_

  - [ ]* 12.4 Write unit tests for UpcomingProjectCard
    - Test rendering dengan "Coming Soon" placeholder
    - Test click handler shows message only
    - Test keyboard interaction (Enter, Space)
    - Test hover state
    - _Requirements: 1.3, 7.9_

- [x] 13. Implement ProjectModal component
  - Create modal dialog untuk project details
  - Display title, description, technologies, images
  - Display demo dan repo links jika tersedia
  - Handle close dengan ESC key dan close button
  - Trap focus inside modal saat open
  - Return focus ke trigger element saat close
  - Add ARIA role="dialog" dan aria-modal="true"
  - _Requirements: 6.5, 6.6, 6.8, 7.6, 7.7, 7.8, 7.9, 7.10_

- [x] 14. Implement HeroSection component
  - Load placeholder data dari ./data/placeholder.json
  - Display nama placeholder dan tagline placeholder
  - Use semantic `<section>` dengan heading
  - Use single `<h1>` untuk nama
  - _Requirements: 3.3, 6.9, 7.1, 11.2, 11.3, 11.7_

- [x] 15. Implement AboutSection component
  - Load placeholder data dari ./data/placeholder.json
  - Display deskripsi placeholder maksimal 500 karakter
  - Use semantic `<section>` dengan heading `<h2>`
  - _Requirements: 3.3, 6.9, 7.2, 11.4, 11.7_

- [x] 16. Implement ProjectsSection component
  - [x] 16.1 Create ProjectsSection component
    - Load projects dari environment variable PROJECT_CONFIG_PATH atau default "./data/projects.json"
    - Use ProjectParser untuk parse projects
    - Display error message jika parsing fails
    - Split projects into Featured Projects (isFeatured=true) dan Upcoming Projects (isFeatured=false)
    - Render sub-section "Featured Projects" dengan grid of FeaturedProjectCard components
    - Render sub-section "Upcoming Projects" dengan grid of UpcomingProjectCard components
    - Display "Belum ada featured project" jika no featured projects available
    - Ensure minimum 3 Upcoming_Project_Card slots are displayed
    - Use semantic `<section>` dengan heading `<h2>` untuk main section
    - Use semantic `<section>` dengan heading `<h3>` untuk each sub-section
    - Implement responsive grid (1 column mobile, 2 tablet, 3+ desktop)
    - _Requirements: 3.3, 5.1, 5.2, 5.3, 6.9, 7.3, 7.4, 7.5, 7.14, 7.15, 9.8_

  - [ ]* 16.2 Write integration test for ProjectsSection
    - Test loading dari default path
    - Test loading dari environment variable
    - Test parser error handling
    - Test splitting into Featured and Upcoming
    - Test empty featured projects state
    - Test minimum 3 upcoming project slots
    - _Requirements: 7.14, 7.15, 9.8_

- [x] 17. Implement SkillsSection component
  - Load placeholder skills dari ./data/placeholder.json
  - Display list of technologies
  - Use semantic `<section>` dengan heading `<h2>`
  - _Requirements: 3.3, 6.9, 7.6, 11.5, 11.7_

- [x] 18. Implement ContactSection component
  - Load placeholder contact info dari ./data/placeholder.json
  - Display email, phone, dan/atau social media links
  - Use semantic `<section>` dengan heading `<h2>`
  - Add ARIA labels untuk contact links
  - _Requirements: 3.3, 6.9, 6.11, 7.7, 11.6, 11.7_

- [x] 19. Checkpoint - Ensure section components tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 20. Implement responsive layout dan breakpoints
  - [ ] 20.1 Configure responsive breakpoints
    - Setup Tailwind breakpoints (mobile: 320-767px, tablet: 768-1023px, desktop: 1024px+)
    - Implement single column layout untuk mobile
    - Implement 2 column layout untuk tablet
    - Implement 3+ column layout untuk desktop
    - Test orientation change response < 300ms
    - Ensure no horizontal scroll pada 320px
    - Use responsive units (rem, em, %) untuk all sizing
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 5.6, 5.7_

  - [ ]* 20.2 Write property test for touch target size (Property 4)
    - **Property 4: Touch Target Minimum Size**
    - **Validates: Requirements 5.8**
    - Test all interactive elements pada mobile viewport
    - Verify minimum 44x44px clickable area
    - Run 100 iterations minimum
    - _Requirements: 5.8_

- [ ] 21. Implement responsive image loading
  - [ ] 21.1 Configure responsive image versions
    - Setup srcset untuk mobile (max 800px), tablet (max 1200px), desktop (max 1920px)
    - Implement image version selection based on viewport width
    - _Requirements: 8.7, 8.8, 8.9_

  - [ ]* 21.2 Write property test for image version selection (Property 9)
    - **Property 9: Responsive Image Version Selection**
    - **Validates: Requirements 8.7, 8.8, 8.9**
    - Test image loading untuk random viewport widths
    - Verify correct image version selected
    - Run 100 iterations minimum
    - _Requirements: 8.7, 8.8, 8.9_

- [ ] 22. Implement accessibility compliance
  - [ ] 22.1 Ensure WCAG AA color contrast
    - Audit all text colors untuk 4.5:1 contrast (regular text)
    - Audit all text colors untuk 3:1 contrast (large text)
    - Fix any contrast issues dalam Tailwind config
    - _Requirements: 6.1, 6.2_

  - [ ] 22.2 Add alt text untuk all images
    - Add descriptive alt text untuk content images
    - Add empty alt="" untuk decorative images
    - _Requirements: 6.3, 6.4_

  - [ ] 22.3 Ensure keyboard accessibility
    - Test Tab navigation ke all interactive elements
    - Test Enter/Space activation untuk buttons dan links
    - Verify focus indicators visible dengan 3:1 contrast
    - Ensure no focus traps
    - _Requirements: 6.5, 6.6, 6.7, 6.8_

  - [ ] 22.4 Add ARIA labels untuk unlabeled elements
    - Add aria-label untuk icon-only buttons
    - Add aria-label untuk navigation regions
    - Add aria-labelledby untuk complex widgets
    - _Requirements: 6.11_

  - [ ] 22.5 Verify heading hierarchy
    - Ensure single h1 per page
    - Ensure no skipped heading levels
    - _Requirements: 6.9_

  - [ ]* 22.6 Write property test for text contrast (Property 5)
    - **Property 5: Text Contrast Ratios**
    - **Validates: Requirements 6.1, 6.2**
    - Generate random text/background color combinations
    - Calculate contrast ratio
    - Verify WCAG AA compliance based on font size
    - Run 100 iterations minimum
    - _Requirements: 6.1, 6.2_

  - [ ]* 22.7 Write property test for image alt text (Property 6)
    - **Property 6: Image Alt Text Appropriateness**
    - **Validates: Requirements 6.3, 6.4**
    - Test content images have non-empty alt
    - Test decorative images have empty alt
    - Run 100 iterations minimum
    - _Requirements: 6.3, 6.4_

  - [ ]* 22.8 Write property test for keyboard accessibility (Property 7)
    - **Property 7: Interactive Elements Keyboard Accessibility**
    - **Validates: Requirements 6.5, 6.6, 6.7**
    - Test all interactive elements reachable via Tab
    - Test Enter/Space activation
    - Test focus indicator contrast >= 3:1
    - Run 100 iterations minimum
    - _Requirements: 6.5, 6.6, 6.7_

  - [ ]* 22.9 Write property test for ARIA labels (Property 8)
    - **Property 8: ARIA Labels for Unlabeled Interactive Elements**
    - **Validates: Requirements 6.11**
    - Test unlabeled interactive elements have aria-label
    - Run 100 iterations minimum
    - _Requirements: 6.11_

  - [ ]* 22.10 Run automated accessibility tests
    - Install jest-axe
    - Write test untuk detect WCAG violations
    - Test heading hierarchy
    - Test skip link presence
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.9, 6.10, 6.11_

- [ ] 23. Checkpoint - Ensure accessibility tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 24. Implement App component dan routing
  - [x] 24.1 Create App.tsx
    - Import all section components
    - Setup ErrorBoundary untuk React errors
    - Use semantic `<header>`, `<main>`, `<footer>` structure
    - Add SkipLink at top
    - Render Navbar, all sections, Footer
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 6.10_

  - [x] 24.2 Write integration test for App
    - Test all sections render
    - Test semantic HTML structure
    - Test ErrorBoundary handling
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 25. Create sample data files
  - [x] 25.1 Create data/projects.json
    - Create minimal 2 sample featured projects dengan isFeatured: true
    - Create minimal 3 upcoming project slots dengan isFeatured: false
    - Include all required fields (id, title, description, technologies, imageUrl, isFeatured)
    - Include optional fields untuk featured projects (demoUrl, repoUrl, additionalImages)
    - _Requirements: 7.15, 9.1, 9.2, 9.8_

  - [x] 25.2 Create data/placeholder.json
    - Create professional placeholder name
    - Create professional placeholder tagline
    - Create professional placeholder about description (300-500 chars)
    - Create list of 5+ placeholder skills/technologies
    - Create placeholder contact info (email, phone, social links)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [x] 25.3 Create placeholder data utility
    - Create src/lib/loadPlaceholder.ts
    - Implement loadPlaceholderData() function
    - Handle file not found errors
    - Add JSDoc comments
    - _Requirements: 11.7_

- [ ] 26. Optimize bundle size dan performance
  - [ ] 26.1 Configure Vite build optimization
    - Enable code splitting untuk route-based chunks
    - Configure Tailwind purge untuk remove unused styles
    - Enable minification dan compression
    - _Requirements: 8.5, 8.6_

  - [ ] 26.2 Verify bundle sizes
    - Build production bundle
    - Check CSS bundle < 50KB after gzip
    - Check JS bundle < 100KB after gzip
    - _Requirements: 8.5, 8.6_

  - [ ]* 26.3 Write performance integration tests
    - Install Playwright
    - Setup 3G network simulation (400kbps, 400ms latency, 0% packet loss)
    - Test FCP < 2s on 3G
    - Test LCP < 2.5s on 3G
    - Test TBT < 300ms on 3G
    - Test CLS < 0.1 on 3G
    - Test page load timeout < 30s
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.10_

- [ ] 27. Setup code quality validation
  - [ ] 27.1 Configure linting rules
    - ESLint rules already configured in task 1
    - Verify kebab-case untuk files, camelCase untuk functions/variables
    - Ensure JSDoc comments untuk all exported functions
    - _Requirements: 10.1, 10.2, 10.5, 10.6_

  - [ ] 27.2 Setup coverage thresholds
    - Configure Vitest coverage untuk 70% minimum
    - Target utility functions dan helpers dalam lib/
    - Configure coverage reports (text, json, html)
    - _Requirements: 10.7, 10.8_

  - [ ] 27.3 Create lint npm scripts
    - Add "lint" script yang runs ESLint dan Stylelint dengan JSON output
    - Add "lint:fix" script untuk auto-fix
    - Ensure linter exits dengan non-zero code on errors
    - _Requirements: 10.3, 10.4, 10.9_

  - [ ]* 27.4 Run lint dan verify compliance
    - Run npm run lint
    - Fix all linting errors
    - Verify no remaining errors
    - _Requirements: 10.3, 10.4, 10.9_

  - [ ]* 27.5 Run coverage dan verify 70% threshold
    - Run npm run test:coverage
    - Verify >= 70% line coverage untuk lib/ functions
    - _Requirements: 10.7, 10.8_

- [ ] 28. Setup CI/CD pipeline
  - [ ] 28.1 Create GitHub Actions workflow
    - Setup Node.js environment
    - Run npm ci untuk install dependencies
    - Run type-check (tsc --noEmit)
    - Run linter dengan strict mode in CI
    - Run all tests dengan coverage
    - Run build
    - Verify bundle sizes < thresholds
    - _Requirements: 8.5, 8.6, 10.9, 10.10_

  - [ ] 28.2 Configure CI environment
    - Set CI=true environment variable
    - Configure linter untuk treat warnings as errors in CI
    - _Requirements: 10.10_

- [ ] 29. Final integration testing dan polish
  - [ ]* 29.1 Run full test suite
    - Run all unit tests
    - Run all property-based tests (100 iterations each)
    - Run all integration tests
    - Run accessibility tests
    - Verify all tests pass
    - _Requirements: All_

  - [ ]* 29.2 Manual accessibility review
    - Test keyboard navigation throughout site
    - Test with screen reader (NVDA atau JAWS)
    - Verify all interactive elements accessible
    - Verify semantic HTML structure
    - _Requirements: 6.1-6.11_

  - [ ] 29.3 Cross-browser testing
    - Test di Chrome, Firefox, Safari, Edge
    - Test responsive behavior di semua breakpoints
    - Test lazy loading behavior
    - _Requirements: 4.1-4.8, 5.1-5.8_

- [ ] 30. Final checkpoint - Production readiness
  - Ensure all tests pass, ask the user if questions arise.
  - Verify all requirements met
  - Confirm CI/CD pipeline green

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests MUST run minimum 100 iterations due to randomization
- All property tests reference design document properties
- Checkpoints ensure incremental validation throughout implementation
- Focus on modular architecture - each component should be independently testable
- Prioritize accessibility compliance throughout development, not as afterthought
- Performance testing requires Playwright setup for accurate metrics
- Code quality gates (linting, coverage) prevent technical debt accumulation

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "3.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "4.1"] },
    { "id": 3, "tasks": ["4.2", "4.3", "5.1"] },
    { "id": 4, "tasks": ["4.4", "5.2"] },
    { "id": 5, "tasks": ["5.3"] },
    { "id": 6, "tasks": ["7.1", "9"] },
    { "id": 7, "tasks": ["7.2", "7.3", "7.4", "7.5", "8.1", "10.1"] },
    { "id": 8, "tasks": ["8.2", "10.2", "12.1", "12.2"] },
    { "id": 9, "tasks": ["12.3", "12.4", "13", "25.1", "25.2"] },
    { "id": 10, "tasks": ["25.3", "14", "15", "16.1", "17", "18"] },
    { "id": 11, "tasks": ["16.2", "20.1"] },
    { "id": 12, "tasks": ["20.2", "21.1"] },
    { "id": 13, "tasks": ["21.2", "22.1", "22.2", "22.3", "22.4", "22.5"] },
    { "id": 14, "tasks": ["22.6", "22.7", "22.8", "22.9", "22.10", "24.1"] },
    { "id": 15, "tasks": ["24.2", "26.1"] },
    { "id": 16, "tasks": ["26.2", "26.3", "27.1", "27.2", "27.3"] },
    { "id": 17, "tasks": ["27.4", "27.5", "28.1"] },
    { "id": 18, "tasks": ["28.2", "29.1", "29.3"] },
    { "id": 19, "tasks": ["29.2"] }
  ]
}
```
