// jest.config.js
 module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mocks CSS imports
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};