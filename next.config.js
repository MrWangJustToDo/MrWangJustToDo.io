const isProd = process.env.NODE_ENV === "production";

// https://www.swyx.io/how-to-add-monaco-editor-to-a-next-js-app-ha3  not work
const config = {
  reactStrictMode: true,
  // Use the prefix in production and not development.
  assetPrefix: isProd ? "/MrWangJustToDo.io/" : "",
  basePath: isProd ? "/MrWangJustToDo.io" : "",
};

module.exports = config;
