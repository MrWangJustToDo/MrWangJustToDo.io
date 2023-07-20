import RefreshWebpackPlugin from "@my-react/react-refresh-tools/RefreshWebpackPlugin";
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url);

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
  webpack: (config, { buildId: _build, dev, isServer, defaultLoaders, nextRuntime: _nextRuntime, webpack }) => {
    const originalEntry = config.entry;

    config.entry = async () => {
      const entries = await originalEntry();

      if (entries["main.js"] && !entries["main.js"].includes(require.resolve("@my-react/react-refresh-tools/runtime"))) {
        entries["main.js"].unshift(require.resolve("@my-react/react-refresh-tools/runtime"));
      }

      return entries;
    };

    if (dev) {
      config.plugins.push(new RefreshWebpackPlugin());
    }

    // Disable package exports field resolution in webpack. It can lead
    // to dual package hazards where packages are imported twice: One
    // commonjs version and one ESM version. This breaks hooks which have
    // to rely on a singleton by design (nothing we can do about that).
    // See #25 and https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_dual_package_hazard
    // for more information.
    const webpackVersion = webpack.version;
    if (isServer && +webpackVersion.split(".")[0] >= 5) {
      config.resolve.exportsFields = [];
    }

    if (!defaultLoaders) {
      throw new Error("This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade");
    }

    // Move Preact into the framework chunk instead of duplicating in routes:
    const splitChunks = config.optimization && config.optimization.splitChunks;
    if (splitChunks && splitChunks.cacheGroups) {
      const cacheGroups = splitChunks.cacheGroups;
      const test = /[\\/]node_modules[\\/](@my-react|@my-react\/react-dom)[\\/]/;
      if (cacheGroups.framework) {
        cacheGroups["@my-react"] = Object.assign({}, cacheGroups.framework, {
          test,
        });
        // if you want to merge the 2 small commons+framework chunks:
        // cacheGroups.commons.name = 'framework';
      }
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        __SERVER__: isServer,
        __CLIENT__: !isServer,
        __DEV__: process.env.NODE_ENV !== "production",
      }),
    );

    const aliases = config.resolve.alias || (config.resolve.alias = {});
    aliases.react = "@my-react/react";
    aliases["react-dom$"] = "@my-react/react-dom";

    // Important: return the modified config
    return config;
  },
};

// TODO not work for worker loader
// export default withNext(nextConfig);

export default nextConfig;
