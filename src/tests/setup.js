import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock de IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe(element) {
    // Simular que el elemento es visible inmediatamente
    this.callback([{ isIntersecting: true, target: element }]);
  }

  unobserve() {}
  disconnect() {}
};

// Mock de scrollTo
window.scrollTo = vi.fn();

// Mock de matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
