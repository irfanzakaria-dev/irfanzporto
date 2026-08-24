# Design System Documentation

## Overview

This design system defines the visual language and design tokens for the Professional Portfolio Website. All tokens are configured in Tailwind CSS and can be used throughout the application.

## Color Palette

### Primary Colors
Used for main brand elements, buttons, and interactive components.

- **primary-50**: `#f0f9ff` - Lightest shade
- **primary-100**: `#e0f2fe`
- **primary-200**: `#bae6fd`
- **primary-300**: `#7dd3fc`
- **primary-400**: `#38bdf8`
- **primary-500**: `#0ea5e9` - Base color
- **primary-600**: `#0284c7`
- **primary-700**: `#0369a1`
- **primary-800**: `#075985`
- **primary-900**: `#0c4a6e` - Darkest shade

**Usage Example:**
```jsx
<button className="bg-primary-500 hover:bg-primary-600 text-white">
  Click Me
</button>
```

### Secondary Colors
Used for secondary actions and complementary elements.

- **secondary-50**: `#faf5ff`
- **secondary-100**: `#f3e8ff`
- **secondary-200**: `#e9d5ff`
- **secondary-300**: `#d8b4fe`
- **secondary-400**: `#c084fc`
- **secondary-500**: `#a855f7` - Base color
- **secondary-600**: `#9333ea`
- **secondary-700**: `#7e22ce`
- **secondary-800**: `#6b21a8`
- **secondary-900**: `#581c87`

**Usage Example:**
```jsx
<div className="border-secondary-300 bg-secondary-50">
  Secondary content
</div>
```

### Neutral Colors
Used for text, backgrounds, and borders.

- **neutral-50**: `#fafafa` - Lightest
- **neutral-100**: `#f5f5f5`
- **neutral-200**: `#e5e5e5`
- **neutral-300**: `#d4d4d4`
- **neutral-400**: `#a3a3a3`
- **neutral-500**: `#737373`
- **neutral-600**: `#525252`
- **neutral-700**: `#404040`
- **neutral-800**: `#262626`
- **neutral-900**: `#171717` - Darkest

**Usage Example:**
```jsx
<p className="text-neutral-700">Body text</p>
<div className="bg-neutral-100 border border-neutral-300">Card</div>
```

### Semantic Colors

- **success**: `#10b981` - Success states, confirmations
- **warning**: `#f59e0b` - Warnings, cautions
- **error**: `#ef4444` - Errors, destructive actions
- **background**: `#ffffff` - Default page background

**Usage Example:**
```jsx
<div className="bg-success text-white">Success message</div>
<div className="bg-error text-white">Error message</div>
```

## Typography

### Font Sizes

All font sizes include optimized line heights for readability.

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px (0.75rem) | 16px (1rem) | Small labels, captions |
| `text-sm` | 14px (0.875rem) | 20px (1.25rem) | Secondary text, metadata |
| `text-base` | 16px (1rem) | 24px (1.5rem) | Body text (default) |
| `text-lg` | 18px (1.125rem) | 28px (1.75rem) | Emphasis text |
| `text-xl` | 20px (1.25rem) | 28px (1.75rem) | Small headings |
| `text-2xl` | 24px (1.5rem) | 32px (2rem) | H3 headings |
| `text-3xl` | 30px (1.875rem) | 36px (2.25rem) | H2 headings |
| `text-4xl` | 36px (2.25rem) | 40px (2.5rem) | H1 headings, hero text |

**Usage Example:**
```jsx
<h1 className="text-4xl font-bold">Main Heading</h1>
<h2 className="text-3xl font-semibold">Section Heading</h2>
<p className="text-base">Body paragraph text</p>
<span className="text-sm text-neutral-600">Metadata</span>
```

## Spacing

### Spacing Scale

Consistent spacing values for margin, padding, and gaps.

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `0` | 0 | 0px | No spacing |
| `1` | 0.25rem | 4px | Minimal spacing |
| `2` | 0.5rem | 8px | Tight spacing |
| `3` | 0.75rem | 12px | Small spacing |
| `4` | 1rem | 16px | Base spacing |
| `6` | 1.5rem | 24px | Medium spacing |
| `8` | 2rem | 32px | Large spacing |
| `12` | 3rem | 48px | Extra large spacing |
| `16` | 4rem | 64px | Section spacing |
| `20` | 5rem | 80px | Large section spacing |
| `24` | 6rem | 96px | Massive spacing |

**Usage Example:**
```jsx
<div className="p-4 mb-8">Padded container with bottom margin</div>
<section className="py-16 px-4">Section with vertical padding</section>
<div className="space-y-6">Vertical stack with 24px gaps</div>
```

## Accessibility Guidelines

### Color Contrast

All color combinations meet WCAG AA standards:

- **Regular text** (< 18pt): Minimum 4.5:1 contrast ratio
- **Large text** (≥ 18pt or ≥ 14pt bold): Minimum 3:1 contrast ratio

**Approved Combinations:**
- Text: `neutral-900` on `background` (white) ✓
- Text: `neutral-700` on `background` (white) ✓
- Text: `white` on `primary-500` ✓
- Text: `white` on `error` ✓

### Focus Indicators

All interactive elements must have visible focus indicators:
```jsx
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
```

## Responsive Design

### Breakpoints

- **Mobile**: 320px - 767px (default, no prefix)
- **Tablet**: 768px - 1023px (`md:` prefix)
- **Desktop**: 1024px+ (`lg:` prefix)

**Usage Example:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

## Design Tokens Reference

### Quick Reference Table

| Category | Token Name | Value | CSS Variable |
|----------|------------|-------|--------------|
| Color | Primary | `#0ea5e9` | `colors.primary.500` |
| Color | Secondary | `#a855f7` | `colors.secondary.500` |
| Color | Success | `#10b981` | `colors.success` |
| Color | Error | `#ef4444` | `colors.error` |
| Font | Base | 16px | `fontSize.base` |
| Font | Heading | 36px | `fontSize.4xl` |
| Spacing | Base | 1rem | `spacing.4` |
| Spacing | Section | 4rem | `spacing.16` |

## Usage Best Practices

1. **Always use design tokens** instead of hardcoded values
2. **Maintain consistency** across components
3. **Test color contrast** for accessibility compliance
4. **Use semantic colors** appropriately (success for positive actions, error for destructive)
5. **Apply responsive utilities** for mobile-first design
6. **Use spacing scale** for consistent rhythm

## Customization

To modify design tokens, edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* your colors */ },
        // ...
      },
    },
  },
}
```

After changes, all components automatically inherit the new values.

## Support

For questions or suggestions about the design system, please create an issue in the project repository.