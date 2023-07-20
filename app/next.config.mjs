import withNext from '@my-react/react-refresh-tools/withNext';

const isProd = process.env.NODE_ENV === "production";

// https://www.swyx.io/how-to-add-monaco-editor-to-a-next-js-app-ha3  not work

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  // Use the prefix in production and not development.
  assetPrefix: isProd ? "/MrWangJustToDo.io/" : undefined,
  basePath: isProd ? "/MrWangJustToDo.io" : undefined,
  // i18n router, not work for export
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  // custom webpack config
  webpack: (config, { buildId: _build, dev: _dev, isServer, defaultLoaders: _defaultLoaders, nextRuntime: _nextRuntime, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __SERVER__: isServer,
        __CLIENT__: !isServer,
        __DEV__: process.env.NODE_ENV !== "production",
      }),
    );
    // Important: return the modified config
    return config;
  },
};

export default withNext(nextConfig);
