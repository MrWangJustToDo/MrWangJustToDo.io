module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: { __DEV__: true },
  modulePathIgnorePatterns: ["dist"],
  testMatch: ["<rootDir>/packages/**/*.spec.[jt]s?(x)", "<rootDir>/app/**/*.spec.[jt]s?(x)"],
  moduleNameMapper: {
    "^@blog/(.*)$": ["<rootDir>/app/src", "<rootDir>/packages/$1/src"],
    "^lodash-es$": "lodash",
  },
};
