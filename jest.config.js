module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: { __DEV__: true },
  modulePathIgnorePatterns: ["dist"],
  testMatch: ["<rootDir>/packages/**/*.spec.[jt]s?(x)", "<rootDir>/ui/**/*.spec.[jt]s?(x)"],
  moduleNameMapper: {
    "^@nft-ui/(.*)$": ["<rootDir>/ui/src", "<rootDir>/packages/$1/src"],
    "^lodash-es$": "lodash",
  },
};
