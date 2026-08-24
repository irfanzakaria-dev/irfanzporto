# Professional Portfolio Website

A modern, accessible, and performant portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Design system with Tailwind CSS
- ♿ WCAG AA accessibility compliance
- 📱 Responsive design for all devices
- ⚡ Optimized performance with lazy loading
- 🧪 Comprehensive testing with Vitest and Fast-Check
- 🔍 Linting with ESLint and Stylelint

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testing

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run property-based tests only
npm run test:properties
```

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Type Checking

```bash
npm run type-check
```

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── layout/      # Layout components (Navbar, Footer)
│   │   ├── sections/    # Page sections (Hero, About, Projects, etc.)
│   │   └── ui/          # Reusable UI components
│   ├── lib/
│   │   ├── parser/      # Project data parser
│   │   └── utils/       # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── data/            # Static data files
│   ├── styles/          # Global styles
│   └── config/          # App configuration
├── tests/
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
│   └── properties/      # Property-based tests
└── public/              # Static assets
```

## Design Tokens

The project uses a centralized design system with Tailwind CSS:

- **Colors**: 6 categories (primary, secondary, neutral, success, warning, error, background)
- **Typography**: 5 font sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl)
- **Spacing**: 8 values (0, 1, 2, 3, 4, 6, 8, 12, 16, 20, 24)

## Requirements

See `.kiro/specs/professional-portfolio-website/requirements.md` for detailed requirements.

## License

Private project
