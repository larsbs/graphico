const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.config.js');


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'source-map',
  output: Object.assign({}, webpackBaseConfig.output, {
    filename: 'js/[name]-[chunkhash].js',
    sourceMapFilename: 'maps/[file].map',
  }),
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      mangle: false,
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name]-[chunkhash].css',
      allChunks: true,
      ignoreOrder: true,
    }),
  ],
  module: Object.assign({}, webpackBaseConfig.module, {
    rules: [
      ...webpackBaseConfig.module.rules
        .filter((r) => r.test.toString() !== '/\\.less$/')
        .filter((r) => r.test.toString() !== '/\\.css$/'),
      {
        ...webpackBaseConfig.module.rules.find((r) => r.test.toString() === '/\\.less$/'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: webpackBaseConfig.module.rules.find((r) => r.test.toString() === '/\\.less$/').use.slice(1)
        }),
      },
      {
        ...webpackBaseConfig.module.rules.find((r) => r.test.toString() === '/\\.css$/'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: webpackBaseConfig.module.rules.find((r) => r.test.toString() === '/\\.css$/').use.slice(1)
        }),
      },
    ],
  }),
});
