// frontend/src/setupTests.ts

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Add this to provide TextEncoder/TextDecoder to the test environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
