module.exports = {
  collectCoverage: true,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '!**/node_modules/**',
    'client/src/**/*.{js,jsx,ts,tsx}',
    '!**/testData.jsx',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  modulePathIgnorePatterns: ['data', 'node_modules'],
};
