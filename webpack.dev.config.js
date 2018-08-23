const path = require('path');
const webpack = require('webpack');
const ip = require('ip');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

const webpackBaseConfig = require('./webpack.base.config.js');


if ( ! process.env.WEBPACK_PORT) {
  console.error('ERROR: Missing WEBPACK_PORT environment variable');
  process.exit(1);
}


const WEBPACK_PORT = process.env.WEBPACK_PORT;


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [`The app is running at http://${ip.address()}:${WEBPACK_PORT}`],
      },
    }),
  ],
});


module.exports.serve = {
  host: '0.0.0.0',
  port: WEBPACK_PORT,
  logLevel: 'error',
  devMiddleware: {
    stats: 'errors-only',
    logLevel: 'silent',
  },
  hotClient: {
    logLevel: 'error',
  },
  on: {
    'compiler-warning': (stats, compiler) => {},
  },
  add: (app, middleware, options) => {
    app.use(convert(history({})));  // enable history-api-fallback
  },
};
