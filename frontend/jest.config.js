// jest.config.js
export const preset = 'ts-jest';
export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/setupTests.ts'];
export const moduleNameMapper = {
  '^/LS_image.png$': '<rootDir>/__mocks__/fileMock.js',
  '^/DFSI_Logo.png$': '<rootDir>/__mocks__/fileMock.js',

  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

  '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',

  '^@components/(.*)$': '<rootDir>/src/components/$1',
  '^@pages/(.*)$': '<rootDir>/src/pages/$1',
};
export const transform = {
  '^.+\\.tsx?$': [
    'ts-jest',
    {
      tsconfig: 'tsconfig.app.json',
    },
  ],
};
