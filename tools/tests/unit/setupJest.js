// Mock fetch() within jest tests. Very useful to test different responses.
global.fetch = require('jest-fetch-mock');

// Mock matchMedia to prevent polyfill errors with enquire.js.
window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }));
