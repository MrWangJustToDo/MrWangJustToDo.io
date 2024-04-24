module.exports = {
  root: true,
  env: {
    "jest/globals": true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  settings: {
    jest: {
      version: require("jest/package.json").version,
    },
  },
  plugins: ["node", "jest"],
  extends: [require.resolve("project-tool/baseLint"), "plugin:jest/recommended", "plugin:jest/style"],
};
