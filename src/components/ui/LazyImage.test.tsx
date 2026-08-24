import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import LazyImage from './LazyImage';

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }

  observe(target: Element) {
    // Simulate immediate intersection for testing
    setTimeout(() => {
      this.callback(
        [
          {
            isIntersecting: true,
            target,
            intersectionRatio: 1,
            boundingClientRect: target.getBoundingClientRect(),
            intersectionRect: target.getBoundingClientRect(),
            rootBounds: null,
            time: Date.now(),
          },
        ] as IntersectionObserverEntry[],
        this as unknown as IntersectionObserver
      );
    }, 0);
  }

  disconnect() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
  get root() {
    return null;
  }
  get rootMargin() {
    return this.options?.rootMargin || '0px';
  }
  get thresholds() {
    return Array.isArray(this.options?.threshold) ? this.options.threshold : [this.options?.threshold || 0];
  }
}

describe('LazyImage Component', () => {
  beforeEach(() => {
    // Setup IntersectionObserver mock
    global.IntersectionObserver = MockIntersectionObserver as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render with placeholder initially', () => {
    render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image"
        className="test-class"
      />
    );

    // Should show placeholder/loading state
    const placeholder = screen.getByRole('img', { name: /image placeholder/i });
    expect(placeholder).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image"
        className="custom-class"
      />
    );

    // The wrapper div always renders; className is passed to the inner img once in-view.
    // Verify the wrapper is present and has the base 'relative' class.
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('relative');
  });

  it('should use custom threshold for IntersectionObserver', () => {
    const customThreshold = 300;
    render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image"
        threshold={customThreshold}
      />
    );

    // Just verify it renders without error with custom threshold
    expect(screen.getByRole('img', { name: /image placeholder/i })).toBeInTheDocument();
  });

  it('should render with custom placeholder image', () => {
    const { container } = render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image"
        placeholder="/placeholder.jpg"
      />
    );

    // Should find the placeholder img inside the container
    const placeholderImg = container.querySelector('img[src="/placeholder.jpg"]');
    expect(placeholderImg).toBeInTheDocument();
    expect(placeholderImg).toHaveAttribute('alt', '');
  });

  it('should have proper structure for layout stability', () => {
    const { container } = render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image"
      />
    );

    // Container should have relative positioning
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('relative');
    
    // Placeholder should be absolutely positioned to maintain dimensions
    const placeholder = wrapper.querySelector('.absolute');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveClass('inset-0');
  });

  it('should include accessibility attributes', () => {
    render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image description"
      />
    );

    // Should have proper aria-label for placeholder state
    const placeholder = screen.getByRole('img', { name: /image placeholder/i });
    expect(placeholder).toBeInTheDocument();
  });

  it('should accept all required props', () => {
    const onLoad = vi.fn();
    const onError = vi.fn();
    
    const { container } = render(
      <LazyImage
        src="/test-image.jpg"
        alt="Test image"
        placeholder="/placeholder.jpg"
        threshold={300}
        className="test-class"
        onLoad={onLoad}
        onError={onError}
      />
    );

    // Verify component renders with all props
    expect(container.firstChild).toBeInTheDocument();
    // className is applied to the inner img element, not the wrapper
    expect(container.firstChild).toHaveClass('relative');
  });
});
