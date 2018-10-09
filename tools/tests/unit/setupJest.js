import '@babel/polyfill';

// Mock fetch() within jest tests. Very useful to test different responses.
global.fetch = require('jest-fetch-mock');
