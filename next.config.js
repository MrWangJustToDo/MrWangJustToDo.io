const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  reactStrictMode: true,
  // Use the prefix in production and not development.
  assetPrefix: isProd ? '/MrWangJustToDo.io/' : '',
}
