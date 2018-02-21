const path = require('path');
const webpack = require('webpack');
const ip = require('ip');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.config.js');


if ( ! process.env.WEBPACK_PORT) {
  console.error('ERROR: Missing environment variable. Make sure to load the .env file before running this command.');
  process.exit(1);
}


const WEBPACK_PORT = process.env.WEBPACK_PORT;


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: Object.keys(webpackBaseConfig.entry).reduce((result, k) => {
    result[k] = [
      ...webpackBaseConfig.entry[k],
    ];
    return result;
  }, {}),
  output: Object.assign({}, webpackBaseConfig.output, {
  }),
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [`The app is running at http://${ip.address()}:${WEBPACK_PORT}`],
      },
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: WEBPACK_PORT,
    publicPath: '/',
    inline: true,
    hot: true,
    stats: false,
    quiet: true,
    noInfo: true,
    clientLogLevel: 'none',
    overlay: true,
    historyApiFallback: true,
  },
});
