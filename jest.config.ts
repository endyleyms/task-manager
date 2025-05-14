export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
};
