export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^styled-system/jsx/factory$': '<rootDir>/src/test/mocks/styled-system-jsx.tsx',
    '^styled-system/jsx$': '<rootDir>/src/test/mocks/styled-system-jsx.tsx',
    '^lucide-react/dynamic$': '<rootDir>/src/test/mocks/lucide-dynamic.tsx',
    '^next/link$': '<rootDir>/src/test/mocks/next-link.tsx',
    '^styled-system/(.*)$': '<rootDir>/styled-system/$1',
  },
};
