const path = require('path');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  /* sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }, */
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin({
        async: false
      }));
    }
    return config;
  }
};