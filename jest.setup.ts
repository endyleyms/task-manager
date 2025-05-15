import '@testing-library/jest-dom';

if (typeof (globalThis as any).structuredClone === 'undefined') {
  (globalThis as any).structuredClone = (val: unknown) =>
    JSON.parse(JSON.stringify(val));
}

(globalThis as any).matchMedia =
  (globalThis as any).matchMedia ||
  ((query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
